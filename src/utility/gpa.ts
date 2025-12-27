import type { InputResultType } from "../App";
import { gradingSystem } from "./gpvList";
import { GPA_CLASSIFICATION } from "../data/courses";

// COMPLETE LIST of Non-GPA / Continuing Education courses to exclude
const EXCLUDED_COURSES = new Set([
  "FDE3023",
  "LTE34SE",
  "MHZ2250",
  "FDE3020", // Legacy Efil
  "LTE3401", // Legacy English (Non-GPA)
  "LEE3410", // Legacy English (Alternate code)
  "CYE3200", // Legacy Continuing Ed
  "CSE3213", // Legacy Continuing Ed
  "CSE3214", // Legacy Continuing Ed
]);

const PASS_GRADES = new Set(["A+", "A", "A-", "B+", "B", "B-", "C+", "C"]);
// Failures do not count towards "Degree Awarding GPA" (Section 6.8)
const FAIL_GRADES = new Set(["C-", "D+", "D", "E", "F"]);

const TOTAL_DEGREE_CREDITS = 125;

// Guidebook Category Limits
const CATEGORY_LIMITS = {
  I: { name: "Industrial Studies", min: 67, max: 78 },
  S: { name: "Engineering Sciences", min: 0, max: 78 }, // Combined with I
  M: { name: "Management", min: 11, max: 20 },
  J: { name: "General/Humanities", min: 3, max: 6 },
  Z: { name: "Mathematics", min: 12, max: 12 },
  R: { name: "Project", min: 9, max: 13 },
  L: { name: "Language", min: 6, max: 6 },
  E: { name: "English", min: 0, max: 6 }, // Combined with L
  W: { name: "Industrial Training", min: 6, max: 6 },
};

export interface CourseInGPA {
  code: string;
  name: string;
  credit: number;
  grade: string;
  gpv: number;
  weightedPoints: number;
  level: number;
  category: string;
  isCompulsory: boolean;
  attempt: number;
  status: "included" | "excluded" | "failed" | "superseded" | "excess_limit";
  loy: number;
}

export interface GPAResult {
  gpa: number;
  rawGpa: number;
  gpaCredits: number;
  totalCreditsEarned: number;
  coursesIncluded: CourseInGPA[];
  coursesExcluded: CourseInGPA[];
  failedCourses: CourseInGPA[];
  compulsoryFailures: CourseInGPA[];
  optionalFailures: CourseInGPA[];
  currentClass: string;
  totalWeightedPoints: number;
  categoryBreakdown: CategoryBreakdown[];
  warnings: string[];
}

export interface CategoryBreakdown {
  category: string;
  categoryName: string;
  credits: number;
  minRequired: number;
  maxAllowed: number;
  status: "below" | "ok" | "exceeded";
  percentage: number;
}

export const calculateGPA = (results: InputResultType[]): GPAResult => {
  const coursesByCode = new Map<string, InputResultType[]>();

  // Group by course code to handle retakes
  for (const course of results) {
    if (!coursesByCode.has(course.code)) {
      coursesByCode.set(course.code, []);
    }
    coursesByCode.get(course.code)!.push(course);
  }

  const coursesIncluded: CourseInGPA[] = [];
  const coursesExcluded: CourseInGPA[] = [];
  const failedCourses: CourseInGPA[] = [];
  const compulsoryFailures: CourseInGPA[] = [];
  const optionalFailures: CourseInGPA[] = [];
  const warnings: string[] = [];

  for (const [, attempts] of coursesByCode) {
    // Sort attempts: Latest Year (LOY) desc, then Attempt Number desc
    attempts.sort((a, b) => {
      if (a.loy !== b.loy) return b.loy - a.loy;
      return (b.attempt || 1) - (a.attempt || 1);
    });

    let bestPassingAttempt: InputResultType | null = null;
    let latestFailedAttempt: InputResultType | null = null;

    // Find best pass or latest fail
    for (const attempt of attempts) {
      const gradeStr = attempt.grade?.toString().trim();
      if (!gradeStr) continue;

      if (PASS_GRADES.has(gradeStr)) {
        // If multiple passes exist, Guidebook usually counts the best one for GPA
        // (unless capped at C, but here we assume best grade stands for "Current Status")
        if (
          !bestPassingAttempt ||
          (gradingSystem.find((g) => g.grade === gradeStr)?.gpv || 0) >
            (gradingSystem.find((g) => g.grade === bestPassingAttempt?.grade)
              ?.gpv || 0)
        ) {
          bestPassingAttempt = attempt;
        }
      } else if (FAIL_GRADES.has(gradeStr)) {
        if (!latestFailedAttempt) latestFailedAttempt = attempt;
      }
    }

    const courseToProcess =
      bestPassingAttempt || latestFailedAttempt || attempts[0];
    if (!courseToProcess) continue;

    const gradeStr = courseToProcess.grade?.toString().trim();
    const gradeInfo = gradingSystem.find((g) => g.grade === gradeStr);

    // Normalize Compulsory Flag
    const isCompulsory = ["compulsory", "yes", "true"].includes(
      String(courseToProcess.isCompulsory).toLowerCase()
    );

    if (!gradeInfo || !gradeStr || courseToProcess.credit <= 0) continue;

    const courseInfo: CourseInGPA = {
      code: courseToProcess.code,
      name: courseToProcess.name,
      credit: courseToProcess.credit,
      grade: gradeStr,
      gpv: gradeInfo.gpv,
      weightedPoints: courseToProcess.credit * gradeInfo.gpv,
      level: courseToProcess.level,
      category: courseToProcess.category,
      isCompulsory,
      attempt: courseToProcess.attempt || 1,
      status: "included",
      loy: courseToProcess.loy,
    };

    // 1. Handle Excluded/Continuing Ed Courses
    if (EXCLUDED_COURSES.has(courseToProcess.code)) {
      courseInfo.status = "excluded";
      coursesExcluded.push(courseInfo);
      continue;
    }

    // 2. Handle Superseded Attempts (History)
    if (attempts.length > 1) {
      for (const oldAttempt of attempts) {
        if (oldAttempt !== courseToProcess) {
          coursesExcluded.push({
            ...courseInfo,
            grade: oldAttempt.grade?.toString() ?? "",
            status: "superseded",
          });
        }
      }
    }

    // 3. Handle Failures (Excluded from Degree GPA)
    if (FAIL_GRADES.has(gradeStr)) {
      courseInfo.status = "failed";
      failedCourses.push(courseInfo);
      if (isCompulsory) compulsoryFailures.push(courseInfo);
      else optionalFailures.push(courseInfo);
      continue;
    }

    // 4. Handle Invalid Grades
    if (!PASS_GRADES.has(gradeStr)) {
      courseInfo.status = "excluded";
      coursesExcluded.push(courseInfo);
      warnings.push(
        `Course ${courseToProcess.code} has invalid grade ${gradeStr}`
      );
      continue;
    }

    // Add to potential inclusion list (Optimization will filter this later)
    coursesIncluded.push(courseInfo);
  }

  // === CRITICAL: Optimize for Category Limits (Guidebook 6.8.2) ===
  const optimizedIncludedCourses = optimizeCoursesForLimits(
    coursesIncluded,
    warnings
  );

  // Calculate Totals
  let totalWeightedGPV = 0;
  let totalGPACredits = 0;
  const categoryCredits: Record<string, number> = {};

  for (const course of optimizedIncludedCourses) {
    if (course.status === "included") {
      totalWeightedGPV += course.weightedPoints;
      totalGPACredits += course.credit;

      const cat = normalizeCategory(course.category);
      categoryCredits[cat] = (categoryCredits[cat] || 0) + course.credit;
    } else if (course.status === "excess_limit") {
      coursesExcluded.push(course);
    }
  }

  const finalIncluded = optimizedIncludedCourses.filter(
    (c) => c.status === "included"
  );
  const gpa = totalGPACredits > 0 ? totalWeightedGPV / totalGPACredits : 0;
  const totalCreditsEarned = totalGPACredits;
  const currentClass = getCurrentClass(gpa, totalCreditsEarned);

  const categoryBreakdown = analyzeCategoryRequirements(
    categoryCredits,
    totalCreditsEarned
  );

  return {
    gpa: Number.parseFloat(gpa.toFixed(2)),
    rawGpa: gpa,
    gpaCredits: totalGPACredits,
    totalCreditsEarned,
    coursesIncluded: finalIncluded.sort(
      (a, b) => b.level - a.level || a.code.localeCompare(b.code)
    ),
    coursesExcluded: coursesExcluded.sort(
      (a, b) => b.level - a.level || a.code.localeCompare(b.code)
    ),
    failedCourses: failedCourses.sort(
      (a, b) => b.level - a.level || a.code.localeCompare(b.code)
    ),
    compulsoryFailures,
    optionalFailures,
    currentClass,
    totalWeightedPoints: totalWeightedGPV,
    categoryBreakdown,
    warnings,
  };
};

// Map Legacy Categories (X, Y) to Current (I, R)
const normalizeCategory = (cat: string): string => {
  if (cat === "X") return "I"; // Legacy Engineering -> Industrial
  if (cat === "Y") return "R"; // Legacy Project -> Project
  return cat;
};

/**
 * Enforces Guidebook Rule 6.8.2:
 * "Excess course credits shall be eliminated by considering Level 3 courses first...
 * Such eliminated courses shall not be in the compulsory course combinations."
 */
const optimizeCoursesForLimits = (
  courses: CourseInGPA[],
  warnings: string[]
): CourseInGPA[] => {
  const result = [...courses];

  // Helper: Count active credits in specific categories
  const countCredits = (cats: string[]) =>
    result
      .filter(
        (c) =>
          c.status === "included" &&
          cats.includes(normalizeCategory(c.category))
      )
      .reduce((sum, c) => sum + c.credit, 0);

  // Helper: Drop excess credits
  const dropExcess = (targetCategories: string[], maxLimit: number) => {
    let currentTotal = countCredits(targetCategories);

    if (currentTotal > maxLimit) {
      // Candidates: Included, in Target Categories, Optional Only
      const candidates = result.filter(
        (c) =>
          c.status === "included" &&
          targetCategories.includes(normalizeCategory(c.category)) &&
          !c.isCompulsory
      );

      // Sort Priority for Dropping:
      // 1. Level: Ascending (Level 3 dropped before Level 4)
      // 2. GPV: Ascending (Lowest Grade dropped first to protect high GPA)
      candidates.sort((a, b) => {
        if (a.level !== b.level) return a.level - b.level;
        return a.gpv - b.gpv;
      });

      for (const candidate of candidates) {
        if (currentTotal <= maxLimit) break;

        candidate.status = "excess_limit";
        currentTotal -= candidate.credit;
      }

      // Add Warning
      if (currentTotal > maxLimit) {
        warnings.push(
          `Category Limit Exceeded: [${targetCategories.join(
            ","
          )}]. Current: ${currentTotal}. Limit: ${maxLimit}. Remaining courses are Compulsory and cannot be dropped.`
        );
      } else {
        warnings.push(
          `Optimized GPA: Dropped excess optional credits in [${targetCategories.join(
            ","
          )}] (starting with Level 3 & lowest grades) to meet limit of ${maxLimit}.`
        );
      }
    }
  };

  // 1. Enforce Combined Industrial Limit (I + S + X <= 78)
  dropExcess(["I", "S"], 78);

  // 2. Enforce Combined Language Limit (L + E <= 6)
  dropExcess(["L", "E"], 6);

  // 3. Enforce Individual Limits
  dropExcess(["M"], 20);
  dropExcess(["J"], 6);
  dropExcess(["Z"], 12);
  dropExcess(["R"], 13);
  dropExcess(["W"], 6);

  return result;
};

const getCurrentClass = (gpa: number, totalCredits: number): string => {
  if (totalCredits < TOTAL_DEGREE_CREDITS) {
    return `In Progress (${totalCredits}/${TOTAL_DEGREE_CREDITS} credits)`;
  }
  if (gpa >= GPA_CLASSIFICATION.FIRST_CLASS) return "First Class";
  if (gpa >= GPA_CLASSIFICATION.SECOND_UPPER)
    return "Second Class (Upper Division)";
  if (gpa >= GPA_CLASSIFICATION.SECOND_LOWER)
    return "Second Class (Lower Division)";
  if (gpa >= GPA_CLASSIFICATION.PASS) return "Pass";
  return "Below Pass (GPA < 2.00)";
};

export const getNextClassInfo = (
  currentGpa: number,
  currentCredits: number
) => {
  const classes = [
    { name: "Pass", gpa: GPA_CLASSIFICATION.PASS },
    {
      name: "Second Class (Lower Division)",
      gpa: GPA_CLASSIFICATION.SECOND_LOWER,
    },
    {
      name: "Second Class (Upper Division)",
      gpa: GPA_CLASSIFICATION.SECOND_UPPER,
    },
    { name: "First Class", gpa: GPA_CLASSIFICATION.FIRST_CLASS },
  ];

  const nextClass = classes.find((c) => c.gpa > currentGpa);

  if (!nextClass) {
    return {
      message:
        "Outstanding! You are currently maintaining a First Class standing.",
      achievable: true,
      requiredAvgGpa: 0,
      reqGrade: "N/A",
      targetClass: "Maintained First Class",
    };
  }

  const remainingCredits = Math.max(0, TOTAL_DEGREE_CREDITS - currentCredits);

  if (remainingCredits === 0) {
    return {
      message: `You have completed the credit requirements. Final GPA: ${currentGpa.toFixed(
        2
      )}.`,
      achievable: false,
      requiredAvgGpa: 0,
      reqGrade: "N/A",
      targetClass: "Final GPA",
    };
  }

  const requiredTotalPoints = nextClass.gpa * TOTAL_DEGREE_CREDITS;
  const currentPoints = currentGpa * currentCredits;
  const neededPoints = requiredTotalPoints - currentPoints;
  const requiredAvgGpa = neededPoints / remainingCredits;

  let reqGrade = "Impossible";
  if (requiredAvgGpa <= 2.0) reqGrade = "C";
  else if (requiredAvgGpa <= 2.3) reqGrade = "C+";
  else if (requiredAvgGpa <= 2.7) reqGrade = "B-";
  else if (requiredAvgGpa <= 3.0) reqGrade = "B";
  else if (requiredAvgGpa <= 3.3) reqGrade = "B+";
  else if (requiredAvgGpa <= 3.7) reqGrade = "A-";
  else if (requiredAvgGpa <= 4.0) reqGrade = "A or A+";

  const isAchievable = requiredAvgGpa <= 4.0;

  return {
    targetClass: nextClass.name,
    targetGpa: nextClass.gpa,
    requiredAvgGpa: Number.parseFloat(requiredAvgGpa.toFixed(2)),
    remainingCredits,
    achievable: isAchievable,
    reqGrade,
    message: isAchievable
      ? `To graduate with a ${
          nextClass.name
        }, you need an average GPA of ${requiredAvgGpa.toFixed(
          2
        )} (${reqGrade}) over your remaining ${remainingCredits} credits.`
      : `Reaching ${nextClass.name} is mathematically difficult (Required GPA > 4.0).`,
  };
};

const analyzeCategoryRequirements = (
  categoryCredits: Record<string, number>,
  totalCredits: number
): CategoryBreakdown[] => {
  console.log(totalCredits);

  return Object.entries(CATEGORY_LIMITS).map(([code, info]) => {
    const credits = categoryCredits[code] || 0;
    let status: "below" | "ok" | "exceeded" = "ok";

    if (credits < info.min) status = "below";
    else if (credits > info.max) status = "exceeded";

    const percentage = info.max > 0 ? (credits / info.max) * 100 : 0;

    return {
      category: code,
      categoryName: info.name,
      credits,
      minRequired: info.min,
      maxAllowed: info.max,
      status,
      percentage: Math.min(percentage, 100),
    };
  });
};

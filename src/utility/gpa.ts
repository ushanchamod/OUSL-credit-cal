import type { InputResultType } from "../App";
import { gradingSystem } from "./gpvList";
import { GPA_CLASSIFICATION } from "../data/courses";

const EXCLUDED_COURSES = new Set(["FDE3023", "LTE34SE", "MHZ2250"]);

const PASS_GRADES = new Set(["A+", "A", "A-", "B+", "B", "B-", "C+", "C"]);
const FAIL_GRADES = new Set(["C-", "D+", "D", "E"]);

const TOTAL_DEGREE_CREDITS = 125;

const CATEGORY_LIMITS = {
  I: { name: "Industrial Studies", min: 67, max: 78 },
  S: { name: "Engineering Sciences", min: 0, max: 78 }, // Combined with I, total I+S max 78
  M: { name: "Management", min: 11, max: 20 },
  J: { name: "General/Humanities", min: 3, max: 6 },
  Z: { name: "Mathematics", min: 12, max: 12 },
  R: { name: "Project", min: 9, max: 13 },
  L: { name: "Language", min: 6, max: 6 },
  E: { name: "English", min: 0, max: 6 }, // Combined with L, total L+E = 6
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
  status: "included" | "excluded" | "failed" | "superseded";
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

  for (const course of results) {
    if (!coursesByCode.has(course.code)) {
      coursesByCode.set(course.code, []);
    }
    coursesByCode.get(course.code)!.push(course);
  }

  let totalWeightedGPV = 0;
  let totalGPACredits = 0;
  let totalCreditsEarned = 0;

  const coursesIncluded: CourseInGPA[] = [];
  const coursesExcluded: CourseInGPA[] = [];
  const failedCourses: CourseInGPA[] = [];
  const compulsoryFailures: CourseInGPA[] = [];
  const optionalFailures: CourseInGPA[] = [];
  const warnings: string[] = [];

  // Track category credits
  const categoryCredits: Record<string, number> = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [, attempts] of coursesByCode) {
    attempts.sort((a, b) => {
      if (a.loy !== b.loy) return b.loy - a.loy;
      return (b.attempt || 1) - (a.attempt || 1);
    });

    let bestPassingAttempt: InputResultType | null = null;
    let latestFailedAttempt: InputResultType | null = null;

    for (const attempt of attempts) {
      const gradeStr = attempt.grade?.toString().trim();

      if (!gradeStr) continue;

      if (PASS_GRADES.has(gradeStr)) {
        bestPassingAttempt = attempt;
        break; // Take the latest passing attempt
      } else if (FAIL_GRADES.has(gradeStr)) {
        if (!latestFailedAttempt) {
          latestFailedAttempt = attempt;
        }
      }
    }

    const courseToProcess =
      bestPassingAttempt || latestFailedAttempt || attempts[0];

    if (!courseToProcess) continue;

    const gradeStr = courseToProcess.grade?.toString().trim();
    const gradeInfo = gradingSystem.find((g) => g.grade === gradeStr);
    const isCompulsory =
      courseToProcess.isCompulsory?.toString().toLowerCase() === "compulsory" ||
      courseToProcess.isCompulsory?.toString().toLowerCase() === "yes" ||
      courseToProcess.isCompulsory?.toString().toLowerCase() === "y";

    // Skip if no valid grade or credit
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

    if (attempts.length > 1) {
      for (const oldAttempt of attempts) {
        if (oldAttempt !== courseToProcess) {
          const oldGrade = oldAttempt.grade?.toString().trim();
          const oldGradeInfo = gradingSystem.find((g) => g.grade === oldGrade);
          if (oldGradeInfo) {
            coursesExcluded.push({
              ...courseInfo,
              grade: oldGrade,
              gpv: oldGradeInfo.gpv,
              weightedPoints: courseToProcess.credit * oldGradeInfo.gpv,
              attempt: oldAttempt.attempt || 1,
              loy: oldAttempt.loy,
              status: "superseded",
            });
          }
        }
      }
    }

    if (EXCLUDED_COURSES.has(courseToProcess.code)) {
      courseInfo.status = "excluded";
      coursesExcluded.push(courseInfo);
      continue;
    }

    if (FAIL_GRADES.has(gradeStr)) {
      courseInfo.status = "failed";
      failedCourses.push(courseInfo);

      if (isCompulsory) {
        compulsoryFailures.push(courseInfo);
      } else {
        optionalFailures.push(courseInfo);
      }
      continue;
    }

    if (!PASS_GRADES.has(gradeStr)) {
      courseInfo.status = "excluded";
      coursesExcluded.push(courseInfo);
      warnings.push(
        `Course ${courseToProcess.code} has invalid grade ${gradeStr}`
      );
      continue;
    }

    // Include in GPA calculation
    totalWeightedGPV += courseInfo.weightedPoints;
    totalGPACredits += courseToProcess.credit;
    totalCreditsEarned += courseToProcess.credit;
    coursesIncluded.push(courseInfo);

    // Track category credits
    categoryCredits[courseToProcess.category] =
      (categoryCredits[courseToProcess.category] || 0) + courseToProcess.credit;
  }

  const { adjustedCredits, adjustedCategoryCredits } = enforceCategoryLimits(
    coursesIncluded,
    categoryCredits,
    totalCreditsEarned
  );

  if (adjustedCredits !== totalCreditsEarned) {
    totalCreditsEarned = adjustedCredits;
    warnings.push(
      `Some courses excluded due to category limits per guidebook Table 1. Total credits adjusted to ${adjustedCredits}.`
    );
  }

  if (totalCreditsEarned > TOTAL_DEGREE_CREDITS) {
    warnings.push(
      `Total credits (${totalCreditsEarned}) exceeds maximum ${TOTAL_DEGREE_CREDITS}. Excess credits excluded per guidebook.`
    );
  }

  const gpa = totalGPACredits > 0 ? totalWeightedGPV / totalGPACredits : 0;
  const currentClass = getCurrentClass(gpa, totalCreditsEarned);

  // Calculate category breakdown
  const categoryBreakdown = analyzeCategoryRequirements(
    adjustedCategoryCredits,
    totalCreditsEarned
  );

  return {
    gpa: Number.parseFloat(gpa.toFixed(2)),
    rawGpa: gpa,
    gpaCredits: totalGPACredits,
    totalCreditsEarned,
    coursesIncluded: coursesIncluded.sort(
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

const enforceCategoryLimits = (
  courses: CourseInGPA[],
  categoryCredits: Record<string, number>,
  totalCredits: number
): {
  adjustedCredits: number;
  adjustedCategoryCredits: Record<string, number>;
} => {
  console.log(courses);

  const adjustedCategoryCredits = { ...categoryCredits };
  let adjustedCredits = totalCredits;

  // Check I+S combined limit (max 78)
  const iCredits = adjustedCategoryCredits.I || 0;
  const sCredits = adjustedCategoryCredits.S || 0;
  if (iCredits + sCredits > 78) {
    const excess = iCredits + sCredits - 78;
    adjustedCredits -= excess;
  }

  // Check L+E combined limit (total 6)
  const lCredits = adjustedCategoryCredits.L || 0;
  const eCredits = adjustedCategoryCredits.E || 0;
  if (lCredits + eCredits > 6) {
    const excess = lCredits + eCredits - 6;
    adjustedCredits -= excess;
  }

  // Check individual category limits
  for (const [category, limits] of Object.entries(CATEGORY_LIMITS)) {
    const credits = adjustedCategoryCredits[category] || 0;
    if (credits > limits.max) {
      const excess = credits - limits.max;
      adjustedCredits -= excess;
      adjustedCategoryCredits[category] = limits.max;
    }
  }

  return { adjustedCredits, adjustedCategoryCredits };
};

const getCurrentClass = (gpa: number, totalCredits: number): string => {
  // Must have minimum 125 credits to graduate
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

interface NextClassInfo {
  message: string;
  achievable: boolean;
  requiredAvgGpa: number;
  reqGrade: string;
  targetClass: string;
  targetGpa?: number;
  remainingCredits?: number;
}

export const getNextClassInfo = (
  currentGpa: number,
  currentCredits: number
): NextClassInfo => {
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
        "Outstanding! You are currently maintaining a First Class standing. Keep up this excellent work!",
      achievable: true,
      requiredAvgGpa: 0,
      reqGrade: "N/A",
      targetClass: "Maintained First Class",
    };
  }

  const remainingCredits = Math.max(0, TOTAL_DEGREE_CREDITS - currentCredits);

  if (remainingCredits === 0) {
    return {
      message: `You have completed the credit requirements. Your final GPA is ${currentGpa.toFixed(
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
        )} (approximately ${reqGrade} grade) over your remaining ${remainingCredits} credits.`
      : `Reaching ${nextClass.name} is mathematically difficult with the credits remaining (Required GPA > 4.0). Focus on solidifying your current standing!`,
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

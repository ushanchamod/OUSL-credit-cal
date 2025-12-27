import { InputResultType } from "../App";
import { gradingSystem } from "./gpvList";

// Courses explicitly excluded from GPA calculation (Guidebook Page 21)
const EXCLUDED_COURSES = new Set(["FDE3023", "LTE34SE", "MHZ2250"]);

// Degree Class Thresholds (Guidebook Page 44)
const CLASSES = [
  { name: "First Class", gpa: 3.7 },
  { name: "Second Class (Upper Division)", gpa: 3.3 },
  { name: "Second Class (Lower Division)", gpa: 3.0 },
  { name: "Pass", gpa: 2.0 },
];

const TOTAL_DEGREE_CREDITS = 125;

export const calculateGPA = (results: InputResultType[]) => {
  let totalWeightedGPV = 0;
  let totalGPACredits = 0;

  results.forEach((course) => {
    // Skip excluded courses
    if (EXCLUDED_COURSES.has(course.code)) return;

    // Match grade to GPV
    const gradeInfo = gradingSystem.find(
      (g) => g.grade === course.grade?.toString().trim()
    );

    if (gradeInfo && course.credit > 0) {
      totalWeightedGPV += course.credit * gradeInfo.gpv;
      totalGPACredits += course.credit;
    }
  });

  const gpa = totalGPACredits > 0 ? totalWeightedGPV / totalGPACredits : 0;

  return {
    gpa: parseFloat(gpa.toFixed(2)),
    rawGpa: gpa, // High precision for calculations
    gpaCredits: totalGPACredits,
  };
};

export const getNextClassInfo = (
  currentGpa: number,
  currentCredits: number
) => {
  const nextClass = [...CLASSES].reverse().find((c) => c.gpa > currentGpa);

  if (!nextClass) {
    return {
      message:
        "🌟 Outstanding! You are currently maintaining a First Class standing. Keep up this excellent work!",
      achievable: true,
      reqGpa: 0,
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
      reqGpa: 0,
      reqGrade: "N/A",
      targetClass: "Final GPA",
    };
  }

  // Formula: (Target_GPA * 125 - Current_GPA * Current_Credits) / Remaining_Credits
  const requiredTotalPoints = nextClass.gpa * TOTAL_DEGREE_CREDITS;
  const currentPoints = currentGpa * currentCredits;
  const neededPoints = requiredTotalPoints - currentPoints;
  const requiredAvgGpa = neededPoints / remainingCredits;

  let reqGrade = "Impossible";
  if (requiredAvgGpa <= 4.0) reqGrade = "A+";
  if (requiredAvgGpa <= 4.0) reqGrade = "A";
  if (requiredAvgGpa <= 3.7) reqGrade = "A-";
  if (requiredAvgGpa <= 3.3) reqGrade = "B+";
  if (requiredAvgGpa <= 3.0) reqGrade = "B";
  if (requiredAvgGpa <= 2.7) reqGrade = "B-";
  if (requiredAvgGpa <= 2.3) reqGrade = "C+";
  if (requiredAvgGpa <= 2.0) reqGrade = "C";

  const isAchievable = requiredAvgGpa <= 4.0;

  return {
    targetClass: nextClass.name,
    targetGpa: nextClass.gpa,
    requiredAvgGpa: parseFloat(requiredAvgGpa.toFixed(2)),
    remainingCredits,
    achievable: isAchievable,
    reqGrade,
    message: isAchievable
      ? `To graduate with a ${
          nextClass.name
        }, you need an average GPA of ${requiredAvgGpa.toFixed(
          2
        )} (${reqGrade}) over your remaining ${remainingCredits} credits.`
      : `Reaching ${nextClass.name} is mathematically difficult with the credits remaining (Required GPA > 4.0). Focus on solidifying your current standing!`,
  };
};

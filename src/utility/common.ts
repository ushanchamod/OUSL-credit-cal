// Application constants
export const APP_NAME = "OUSL Credit Calculator";
export const APP_VERSION = "1.0.0";

// GPA Calculation Constants (from OUSL Guidebook 2025/2026)
export const EXCLUDED_COURSES = ["FDE3023", "LTE34SE", "MHZ2250"] as const;
export const TOTAL_DEGREE_CREDITS = 125;

// Degree Class Thresholds (Guidebook Page 44)
export const DEGREE_CLASSES = [
  { name: "First Class", gpa: 3.7, color: "blue" },
  { name: "Second Class (Upper Division)", gpa: 3.3, color: "green" },
  { name: "Second Class (Lower Division)", gpa: 3.0, color: "yellow" },
  { name: "Pass", gpa: 2.0, color: "gray" },
] as const;

// File validation
export const ACCEPTED_FILE_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Category codes
export const CATEGORY_LABELS: Record<string, string> = {
  X: "Engineering",
  Y: "Projects",
  Z: "Mathematics",
  I: "Industrial",
  M: "Management",
  J: "General",
  W: "Industrial Training",
  L: "Language",
} as const;

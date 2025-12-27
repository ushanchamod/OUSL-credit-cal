export interface CourseInfo {
  code: string;
  name: string;
  level: number;
  credits: number;
  category: string;
  isCompulsory: boolean;
  semester: number;
  prerequisites?: string;
}

// BSE Software Engineering Course Database
export const BSE_COURSES: Record<string, CourseInfo> = {
  // Level 3 - Compulsory courses
  EEI3372: {
    code: "EEI3372",
    name: "Programming in Python",
    level: 3,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 1,
  },
  EEI3366: {
    code: "EEI3366",
    name: "Database Systems",
    level: 3,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 1,
  },
  EEI3346: {
    code: "EEI3346",
    name: "Web Application Development",
    level: 3,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 1,
  },
  EEI3467: {
    code: "EEI3467",
    name: "Software Engineering Concepts and Programming",
    level: 3,
    credits: 4,
    category: "I",
    isCompulsory: true,
    semester: 1,
  },
  LTE34SI: {
    code: "LTE34SI",
    name: "English for Academic Purposes - Intermediate",
    level: 3,
    credits: 4,
    category: "L",
    isCompulsory: true,
    semester: 1,
  },
  EEI3347: {
    code: "EEI3347",
    name: "Web Technology",
    level: 3,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 2,
  },
  EEI3262: {
    code: "EEI3262",
    name: "Introduction to Object-Oriented Programming",
    level: 3,
    credits: 2,
    category: "I",
    isCompulsory: true,
    semester: 2,
  },
  EEI3269: {
    code: "EEI3269",
    name: "Mobile Application Design",
    level: 3,
    credits: 2,
    category: "I",
    isCompulsory: true,
    semester: 2,
  },
  EEL3263: {
    code: "EEL3263",
    name: "Communication Skills",
    level: 3,
    credits: 2,
    category: "L",
    isCompulsory: true,
    semester: 2,
  },
  EEI3273: {
    code: "EEI3273",
    name: "Communication and Computer Technology",
    level: 3,
    credits: 2,
    category: "I",
    isCompulsory: true,
    semester: 2,
  },
  MHZ3356: {
    code: "MHZ3356",
    name: "Mathematics for Computing I",
    level: 3,
    credits: 3,
    category: "Z",
    isCompulsory: true,
    semester: 2,
  },

  // Level 3 - Elective
  EEM3366: {
    code: "EEM3366",
    name: "Introduction to Business Studies",
    level: 3,
    credits: 3,
    category: "M",
    isCompulsory: false,
    semester: 2,
  },

  // Level 4 - Compulsory courses
  EEI4267: {
    code: "EEI4267",
    name: "Requirement Engineering",
    level: 4,
    credits: 2,
    category: "I",
    isCompulsory: true,
    semester: 3,
  },
  EEI4370: {
    code: "EEI4370",
    name: "Computer Security Concepts",
    level: 4,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 3,
  },
  EEI4360: {
    code: "EEI4360",
    name: "Introduction to Artificial Intelligence",
    level: 4,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 3,
  },
  EEI4365: {
    code: "EEI4365",
    name: "Data Structures and Algorithms",
    level: 4,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 3,
  },
  MHZ4359: {
    code: "MHZ4359",
    name: "Mathematics for Computing II",
    level: 4,
    credits: 3,
    category: "Z",
    isCompulsory: true,
    semester: 3,
  },
  AGM4367: {
    code: "AGM4367",
    name: "Economics and Marketing for Engineers",
    level: 4,
    credits: 3,
    category: "M",
    isCompulsory: true,
    semester: 3,
  },
  EEI4361: {
    code: "EEI4361",
    name: "User Experience Engineering",
    level: 4,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 4,
  },
  EEI4362: {
    code: "EEI4362",
    name: "Object Oriented Design",
    level: 4,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 4,
  },
  CVM4402: {
    code: "CVM4402",
    name: "Accounting for Engineers",
    level: 4,
    credits: 4,
    category: "M",
    isCompulsory: true,
    semester: 4,
  },
  MHZ4377: {
    code: "MHZ4377",
    name: "Applied Statistics",
    level: 4,
    credits: 3,
    category: "Z",
    isCompulsory: true,
    semester: 4,
  },
  EER4189: {
    code: "EER4189",
    name: "Software Design in Group",
    level: 4,
    credits: 1,
    category: "R",
    isCompulsory: true,
    semester: 4,
  },

  // Level 4 - Elective courses
  EEI4369: {
    code: "EEI4369",
    name: "Mobile App Development with Android",
    level: 4,
    credits: 3,
    category: "I",
    isCompulsory: false,
    semester: 3,
  },
  EEI4373: {
    code: "EEI4373",
    name: "Data Science",
    level: 4,
    credits: 3,
    category: "I",
    isCompulsory: false,
    semester: 4,
  },
  EER4489: {
    code: "EER4489",
    name: "Higher Diploma Project - Software Engineering",
    level: 4,
    credits: 4,
    category: "R",
    isCompulsory: false,
    semester: 5,
  },

  // Level 5 - Compulsory courses
  EEI5263: {
    code: "EEI5263",
    name: "Computer Organization and Architecture",
    level: 5,
    credits: 2,
    category: "S",
    isCompulsory: true,
    semester: 5,
  },
  EEI5466: {
    code: "EEI5466",
    name: "Advanced Database Systems",
    level: 5,
    credits: 4,
    category: "I",
    isCompulsory: true,
    semester: 5,
  },
  EEI5467: {
    code: "EEI5467",
    name: "Software Testing and Quality Assurance",
    level: 5,
    credits: 4,
    category: "I",
    isCompulsory: true,
    semester: 5,
  },
  EER5289: {
    code: "EER5289",
    name: "Research Methodology and Project Identification",
    level: 5,
    credits: 2,
    category: "R",
    isCompulsory: true,
    semester: 5,
  },
  MHJ5383: {
    code: "MHJ5383",
    name: "Technology, Society and Environment",
    level: 5,
    credits: 3,
    category: "J",
    isCompulsory: true,
    semester: 5,
  },
  LLM5281: {
    code: "LLM5281",
    name: "Basic Laws Relating to Engineering and Technology",
    level: 5,
    credits: 2,
    category: "J",
    isCompulsory: true,
    semester: 5,
  },
  EEI5364: {
    code: "EEI5364",
    name: "Data Communication",
    level: 5,
    credits: 3,
    category: "S",
    isCompulsory: true,
    semester: 6,
  },
  EEW5611: {
    code: "EEW5611",
    name: "Industrial Training - Software",
    level: 5,
    credits: 6,
    category: "W",
    isCompulsory: true,
    semester: 6,
  },
  EEI5265: {
    code: "EEI5265",
    name: "Operating Systems",
    level: 5,
    credits: 2,
    category: "S",
    isCompulsory: true,
    semester: 6,
  },
  MHZ5375: {
    code: "MHZ5375",
    name: "Discrete Mathematics",
    level: 5,
    credits: 3,
    category: "Z",
    isCompulsory: true,
    semester: 6,
  },

  // Level 5 - Elective courses
  EEI5378: {
    code: "EEI5378",
    name: "Neural Networks and Fuzzy Logic Applications",
    level: 5,
    credits: 3,
    category: "I",
    isCompulsory: false,
    semester: 5,
  },
  EEI5376: {
    code: "EEI5376",
    name: "Embedded systems and IOT",
    level: 5,
    credits: 3,
    category: "I",
    isCompulsory: false,
    semester: 6,
  },
  MHJ5282: {
    code: "MHJ5282",
    name: "History of Technology",
    level: 5,
    credits: 2,
    category: "J",
    isCompulsory: false,
    semester: 6,
  },

  // Level 6 - Compulsory courses
  EEI6360: {
    code: "EEI6360",
    name: "Software Project Management",
    level: 6,
    credits: 3,
    category: "M",
    isCompulsory: true,
    semester: 7,
  },
  EEI6373: {
    code: "EEI6373",
    name: "Performance Modelling",
    level: 6,
    credits: 3,
    category: "I",
    isCompulsory: true,
    semester: 7,
  },
  EEI6567: {
    code: "EEI6567",
    name: "Software Architecture and Design",
    level: 6,
    credits: 5,
    category: "I",
    isCompulsory: true,
    semester: 7,
  },
  EER6689: {
    code: "EER6689",
    name: "Final Project - Software Engineering",
    level: 6,
    credits: 6,
    category: "R",
    isCompulsory: true,
    semester: 7,
  },
  EEI6171: {
    code: "EEI6171",
    name: "Emerging Technologies",
    level: 6,
    credits: 1,
    category: "I",
    isCompulsory: true,
    semester: 8,
  },
  EEM6202: {
    code: "EEM6202",
    name: "Professional Practice",
    level: 6,
    credits: 2,
    category: "M",
    isCompulsory: true,
    semester: 8,
  },

  // Level 6 - Elective courses (Minimum 10 credits required)
  EEI6279: {
    code: "EEI6279",
    name: "Natural Language Processing",
    level: 6,
    credits: 2,
    category: "I",
    isCompulsory: false,
    semester: 7,
  },
  EEI6280: {
    code: "EEI6280",
    name: "Creative Design",
    level: 6,
    credits: 2,
    category: "I",
    isCompulsory: false,
    semester: 7,
  },
  EEI6366: {
    code: "EEI6366",
    name: "Big Data Technologies & Distributed Systems",
    level: 6,
    credits: 3,
    category: "I",
    isCompulsory: false,
    semester: 7,
  },
  EEI6363: {
    code: "EEI6363",
    name: "Compiler Construction",
    level: 6,
    credits: 3,
    category: "I",
    isCompulsory: false,
    semester: 7,
  },
  EEI6377: {
    code: "EEI6377",
    name: "Data Mining",
    level: 6,
    credits: 3,
    category: "I",
    isCompulsory: false,
    semester: 8,
  },
  EEI6369: {
    code: "EEI6369",
    name: "Cloud Computing",
    level: 6,
    credits: 3,
    category: "I",
    isCompulsory: false,
    semester: 8,
  },
};

// Continuing Education courses (not counted in GPA)
export const CONTINUING_EDUCATION_COURSES = {
  FDE3023: "Empowering for Independent Learning",
  LTE34SE: "English for Academic Purposes-EAP - Elementary",
  MHZ2250: "Elementary Mathematics for Computing",
};

// Credit requirements by category for BSE Honours Degree
export const CREDIT_REQUIREMENTS = {
  I: { min: 67, max: 78 }, // Industrial
  S: { min: 0, max: 78 }, // Engineering Sciences (combined with I)
  M: { min: 11, max: 20 }, // Management
  J: { min: 3, max: 6 }, // General
  Z: { min: 12, max: 12 }, // Mathematics
  R: { min: 9, max: 13 }, // Project (min 6 at level 6)
  L: { min: 6, max: 6 }, // Language
  E: { min: 0, max: 6 }, // Language (alternative)
  W: { min: 6, max: 6 }, // Industrial Training
};

// GPA Classification thresholds
export const GPA_CLASSIFICATION = {
  FIRST_CLASS: 3.7,
  SECOND_UPPER: 3.3,
  SECOND_LOWER: 3.0,
  PASS: 2.0,
};

// Minimum total credits required
export const TOTAL_CREDITS_REQUIRED = 125;

// Helper function to check if a course is compulsory
export function isCourseCompulsory(courseCode: string): boolean {
  const course = BSE_COURSES[courseCode];
  return course ? course.isCompulsory : false;
}

// Helper function to get course information
export function getCourseInfo(courseCode: string): CourseInfo | null {
  return BSE_COURSES[courseCode] || null;
}

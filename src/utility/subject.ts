type CourseStatus = "compulsory" | "optional";

type CompulsoryOrNot = {
  code: string;
  status: CourseStatus;
};

export const compulsoryOrNot: CompulsoryOrNot[] = [
  // Level 3 - Compulsory courses
  { code: "EEI3372", status: "compulsory" }, // Programming in Python
  { code: "EEI3366", status: "compulsory" }, // Database Systems
  { code: "EEI3346", status: "compulsory" }, // Web Application Development
  { code: "EEI3467", status: "compulsory" }, // Software Engineering Concepts and Programming
  { code: "LTE34SI", status: "compulsory" }, // English for Academic Purposes - Intermediate
  { code: "EEI3347", status: "compulsory" }, // Web Technology
  { code: "EEI3262", status: "compulsory" }, // Introduction to Object-Oriented Programming
  { code: "EEI3269", status: "compulsory" }, // Mobile Application Design
  { code: "EEL3263", status: "compulsory" }, // Communication Skills
  { code: "EEI3273", status: "compulsory" }, // Communication and Computer Technology
  { code: "MHZ3356", status: "compulsory" }, // Mathematics for Computing I

  // Level 3 - Elective courses
  { code: "EEM3366", status: "optional" }, // Introduction to Business Studies

  // Level 4 - Compulsory courses
  { code: "EEI4267", status: "compulsory" }, // Requirement Engineering
  { code: "EEI4370", status: "compulsory" }, // Computer Security Concepts
  { code: "EEI4360", status: "compulsory" }, // Introduction to Artificial Intelligence
  { code: "EEI4365", status: "compulsory" }, // Data Structures and Algorithms
  { code: "MHZ4359", status: "compulsory" }, // Mathematics for Computing II
  { code: "AGM4367", status: "compulsory" }, // Economics and Marketing for Engineers
  { code: "EEI4361", status: "compulsory" }, // User Experience Engineering
  { code: "EEI4362", status: "compulsory" }, // Object Oriented Design
  { code: "CVM4402", status: "compulsory" }, // Accounting for Engineers
  { code: "MHZ4377", status: "compulsory" }, // Applied Statistics
  { code: "EER4189", status: "compulsory" }, // Software Design in Group

  // Level 4 - Elective courses
  { code: "EEI4369", status: "optional" }, // Mobile App Development with Android
  { code: "EEI4373", status: "optional" }, // Data Science
  { code: "EER4489", status: "optional" }, // Higher Diploma Project

  // Level 5 - Compulsory courses
  { code: "EEI5263", status: "compulsory" }, // Computer Organization and Architecture
  { code: "EEI5467", status: "compulsory" }, // Software Testing and Quality Assurance
  { code: "EER5289", status: "compulsory" }, // Research Methodology and Project Identification
  { code: "MHJ5383", status: "compulsory" }, // Technology, Society and Environment
  { code: "LLM5281", status: "compulsory" }, // Basic Laws Relating to Engineering and Technology
  { code: "EEI5364", status: "compulsory" }, // Data Communication
  { code: "EEW5611", status: "compulsory" }, // Industrial Training - Software
  { code: "EEI5265", status: "compulsory" }, // Operating Systems
  { code: "MHZ5375", status: "compulsory" }, // Discrete Mathematics

  // Level 5 - Elective courses
  { code: "EEI5378", status: "optional" }, // Neural Networks and Fuzzy Logic Applications
  { code: "EEI5376", status: "optional" }, // Embedded systems and IOT
  { code: "MHJ5282", status: "optional" }, // History of Technology
  { code: "EEI5466", status: "optional" }, // Advanced Database Systems

  // Level 6 - Compulsory courses
  { code: "EEI6360", status: "compulsory" }, // Software Project Management
  { code: "EEI6373", status: "compulsory" }, // Performance Modelling
  { code: "EEI6567", status: "compulsory" }, // Software Architecture and Design
  { code: "EER6689", status: "compulsory" }, // Final Project - Software Engineering
  { code: "EEI6171", status: "compulsory" }, // Emerging Technologies
  { code: "EEM6202", status: "compulsory" }, // Professional Practice

  // Level 6 - Elective courses (Minimum 10 credits required)
  { code: "EEI6279", status: "optional" }, // Natural Language Processing
  { code: "EEI6280", status: "optional" }, // Creative Design
  { code: "EEI6366", status: "optional" }, // Big Data Technologies & Distributed Systems
  { code: "EEI6363", status: "optional" }, // Compiler Construction
  { code: "EEI6377", status: "optional" }, // Data Mining
  { code: "EEI6369", status: "optional" }, // Cloud Computing

  // Continuing Education courses (not counted in GPA)
  { code: "FDE3023", status: "compulsory" }, // Empowering for Independent Learning (EfIL)
  { code: "LTE34SE", status: "compulsory" }, // English for Academic Purposes - Elementary
  { code: "MHZ2250", status: "optional" }, // Elementary Mathematics for Computing

  // Legacy course codes (for older students)
  { code: "EEX3467", status: "compulsory" },
  { code: "EEI3266", status: "compulsory" },
  { code: "EEX3373", status: "compulsory" },
  { code: "MHZ3459", status: "compulsory" },
  { code: "EEI4346", status: "compulsory" },
  { code: "AGM3263", status: "compulsory" },
  { code: "EEX4465", status: "compulsory" },
  { code: "MHZ4256", status: "compulsory" },
  { code: "EEI4366", status: "compulsory" },
  { code: "EEY4189", status: "compulsory" },
  { code: "EEI5270", status: "compulsory" },
  { code: "EEX5563", status: "compulsory" },
  { code: "EEW5811", status: "compulsory" },
  { code: "CVM5402", status: "compulsory" },
  { code: "EEX5362", status: "compulsory" },
  { code: "MHJ5372", status: "compulsory" },
  { code: "EEY6189", status: "compulsory" },
  { code: "DMM6602", status: "compulsory" },
  { code: "EEX6363", status: "compulsory" },
  { code: "EEY6689", status: "compulsory" },
  { code: "FDE3020", status: "compulsory" },
  { code: "LTE3401", status: "compulsory" },
  { code: "LLJ3265", status: "optional" },
  { code: "MHJ4271", status: "optional" },
  { code: "EEX4373", status: "optional" },
  { code: "EEX5376", status: "optional" },
  { code: "EEI5280", status: "optional" },
  { code: "EEX6340", status: "optional" },
  { code: "EEX6278", status: "optional" },
  { code: "ISI3376", status: "optional" },
  { code: "CSI3361", status: "optional" },
  { code: "EEX5464", status: "optional" },
];

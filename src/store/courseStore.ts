import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BSE_COURSES, type CourseInfo } from "../data/courses";

// Custom course added by user
export interface CustomCourse extends CourseInfo {
  isCustom: boolean;
  addedDate: string;
}

interface CourseStoreState {
  customCourses: Record<string, CustomCourse>;
  selectedDegree: string;
  addCustomCourse: (course: CustomCourse) => void;
  updateCustomCourse: (courseCode: string, course: CustomCourse) => void;
  removeCustomCourse: (courseCode: string) => void;
  getCourse: (courseCode: string) => CourseInfo | CustomCourse | null;
  setDegree: (degree: string) => void;
  clearCustomCourses: () => void;
}

export const useCourseStore = create<CourseStoreState>()(
  persist(
    (set, get) => ({
      customCourses: {},
      selectedDegree: "BSE",

      addCustomCourse: (course) =>
        set((state) => ({
          customCourses: {
            ...state.customCourses,
            [course.code]: {
              ...course,
              isCustom: true,
              addedDate: new Date().toISOString(),
            },
          },
        })),

      updateCustomCourse: (courseCode, course) =>
        set((state) => ({
          customCourses: {
            ...state.customCourses,
            [courseCode]: {
              ...course,
              isCustom: true,
              addedDate:
                state.customCourses[courseCode]?.addedDate ||
                new Date().toISOString(),
            },
          },
        })),

      removeCustomCourse: (courseCode) =>
        set((state) => {
          const newCustomCourses = { ...state.customCourses };
          delete newCustomCourses[courseCode];
          return { customCourses: newCustomCourses };
        }),

      getCourse: (courseCode) => {
        const state = get();
        // Check custom courses first
        if (state.customCourses[courseCode]) {
          return state.customCourses[courseCode];
        }
        // Then check default BSE courses
        return BSE_COURSES[courseCode] || null;
      },

      setDegree: (degree) => set({ selectedDegree: degree }),

      clearCustomCourses: () => set({ customCourses: {} }),
    }),
    {
      name: "ousl-course-storage",
    }
  )
);

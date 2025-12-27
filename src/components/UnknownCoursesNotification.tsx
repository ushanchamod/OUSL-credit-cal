"use client";

import { useState } from "react";
import { AlertCircle, BookOpen } from "lucide-react";
import CourseInputDialog from "./CourseInputDialog";
import { useCourseStore, type CustomCourse } from "../store/courseStore";

interface UnknownCoursesNotificationProps {
  unknownCourses: string[];
  onCourseAdded: () => void;
}

export default function UnknownCoursesNotification({
  unknownCourses,
  onCourseAdded,
}: UnknownCoursesNotificationProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const addCustomCourse = useCourseStore((state) => state.addCustomCourse);

  const handleSave = (course: CustomCourse) => {
    addCustomCourse(course);
    onCourseAdded();
  };

  if (unknownCourses.length === 0) return null;

  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900 mb-2">
              Unknown Courses Detected
            </h3>
            <p className="text-sm text-amber-800 mb-3">
              The following courses are not in our database. Please provide
              their details for accurate GPA calculation:
            </p>
            <div className="flex flex-wrap gap-2">
              {unknownCourses.map((code) => (
                <button
                  key={code}
                  onClick={() => setSelectedCourse(code)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-amber-300 text-amber-900 rounded-md hover:bg-amber-100 transition-colors text-sm font-medium"
                >
                  <BookOpen className="w-4 h-4" />
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedCourse && (
        <CourseInputDialog
          courseCode={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

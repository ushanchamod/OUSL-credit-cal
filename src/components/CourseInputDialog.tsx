import { useState } from "react";
import { X, BookOpen, Hash, Award, Layers, Tag, Save } from "lucide-react";
import type { CustomCourse } from "../store/courseStore";

interface CourseInputDialogProps {
  courseCode: string;
  onClose: () => void;
  onSave: (course: CustomCourse) => void;
  existingCourse?: CustomCourse | null;
}

export default function CourseInputDialog({
  courseCode,
  onClose,
  onSave,
  existingCourse,
}: CourseInputDialogProps) {
  const [courseName, setCourseName] = useState(existingCourse?.name || "");
  const [level, setLevel] = useState(existingCourse?.level.toString() || "3");
  const [credits, setCredits] = useState(
    existingCourse?.credits.toString() || "3"
  );
  const [category, setCategory] = useState(existingCourse?.category || "I");
  const [isCompulsory, setIsCompulsory] = useState(
    existingCourse?.isCompulsory ?? true
  );
  const [semester, setSemester] = useState(
    existingCourse?.semester.toString() || "1"
  );

  const handleSave = () => {
    const course: CustomCourse = {
      code: courseCode,
      name: courseName,
      level: Number.parseInt(level),
      credits: Number.parseInt(credits),
      category,
      isCompulsory,
      semester: Number.parseInt(semester),
      isCustom: true,
      addedDate: new Date().toISOString(),
    };
    onSave(course);
    onClose();
  };

  const isValid = courseName.trim() && level && credits && category;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Course Information Required
              </h2>
              <p className="text-blue-100 mt-1">
                Please provide details for course:{" "}
                <span className="font-mono font-semibold">{courseCode}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              This course is not in our database. Please enter the course
              details from your course handbook or MyOUSL. This information will
              be saved for future use.
            </p>
          </div>

          <div className="space-y-4">
            {/* Course Name */}
            <div>
              <label
                htmlFor="courseName"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                Course Name *
              </label>
              <input
                id="courseName"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g., Introduction to Software Engineering"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Level and Credits Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="level"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Layers className="w-4 h-4 text-blue-600" />
                  Level *
                </label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="3">Level 3</option>
                  <option value="4">Level 4</option>
                  <option value="5">Level 5</option>
                  <option value="6">Level 6</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="credits"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Award className="w-4 h-4 text-blue-600" />
                  Credits *
                </label>
                <select
                  id="credits"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">1 Credit</option>
                  <option value="2">2 Credits</option>
                  <option value="3">3 Credits</option>
                  <option value="4">4 Credits</option>
                  <option value="5">5 Credits</option>
                  <option value="6">6 Credits</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                <Tag className="w-4 h-4 text-blue-600" />
                Category *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="I">I - Industrial/Core</option>
                <option value="S">S - Engineering Sciences</option>
                <option value="M">M - Management</option>
                <option value="J">J - General Studies</option>
                <option value="Z">Z - Mathematics</option>
                <option value="R">R - Research/Project</option>
                <option value="L">L - Language</option>
                <option value="E">E - Language (Alternative)</option>
                <option value="W">W - Industrial Training</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select the category from your course handbook
              </p>
            </div>

            {/* Compulsory Status */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 text-blue-600" />
                Course Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="compulsory"
                    checked={isCompulsory}
                    onChange={() => setIsCompulsory(true)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Compulsory</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="compulsory"
                    checked={!isCompulsory}
                    onChange={() => setIsCompulsory(false)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Optional/Elective
                  </span>
                </label>
              </div>
            </div>

            {/* Semester (Optional) */}
            <div>
              <label
                htmlFor="semester"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                Semester (Optional)
              </label>
              <select
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { GraduationCap, ChevronDown, AlertCircle } from "lucide-react";
import { useCourseStore } from "../store/courseStore";

export default function DegreeSelector() {
  const { selectedDegree, setDegree } = useCourseStore();

  const degrees = [
    { value: "BSE", label: "BSE - Software Engineering" },
    { value: "CUSTOM", label: "Other Degree / Custom" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <label
        htmlFor="degree-select"
        className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
      >
        <GraduationCap className="w-4 h-4 text-blue-600" />
        Degree Program
      </label>
      <div className="relative">
        <select
          id="degree-select"
          value={selectedDegree}
          onChange={(e) => setDegree(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
        >
          {degrees.map((degree) => (
            <option key={degree.value} value={degree.value}>
              {degree.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {selectedDegree === "CUSTOM" && (
        <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          You will need to provide course details manually
        </p>
      )}
    </div>
  );
}

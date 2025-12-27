import { useStore } from "../store/global";
import { calculateGPA, getNextClassInfo } from "../utility/gpa";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  TrendingUp,
  Target,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BookOpen,
  BarChart3,
  Info,
  AlertCircle,
} from "lucide-react";

const GPAPage = () => {
  const result = useStore((state) => state.data);
  const [activeTab, setActiveTab] = useState<
    "overview" | "courses" | "categories"
  >("overview");

  const stats = useMemo(() => {
    if (!result) return null;
    return calculateGPA(result);
  }, [result]);

  const prediction = useMemo(() => {
    if (!stats) return null;
    return getNextClassInfo(stats.rawGpa, stats.gpaCredits);
  }, [stats]);

  if (!stats)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200 max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Data Available
          </h2>
          <p className="text-gray-600 mb-6">
            Please upload your result sheet first to view your GPA analysis.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#D06718] hover:bg-[#b65714] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Upload
          </Link>
        </div>
      </div>
    );

  const {
    gpa,
    gpaCredits,
    coursesIncluded,
    coursesExcluded,
    failedCourses,
    compulsoryFailures,
    optionalFailures,
    currentClass,
    totalWeightedPoints,
    categoryBreakdown,
    warnings,
  } = stats;

  const supersededCourses = coursesExcluded.filter(
    (c) => c.status === "superseded"
  );
  const continuingEdCourses = coursesExcluded.filter(
    (c) => c.status === "excluded"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Advanced GPA Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive analysis of your academic performance with detailed
            course breakdown and future projections.
          </p>
        </div>

        {warnings && warnings.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-2">
                  GPA Calculation Notes
                </h3>
                <ul className="space-y-2">
                  {warnings.map((warning, idx) => (
                    <li
                      key={idx}
                      className="text-blue-800 text-sm flex items-start gap-2"
                    >
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Current GPA Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current GPA Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border-2 border-[#D06718]/20">
            <div className="flex items-center gap-2 text-gray-500 font-medium uppercase text-xs tracking-wider mb-4">
              <Award className="w-4 h-4" />
              Current GPA
            </div>
            <div className="flex items-baseline mb-2">
              <span
                className={`text-6xl font-extrabold ${
                  gpa >= 3.7
                    ? "text-blue-600"
                    : gpa >= 3.3
                    ? "text-green-600"
                    : gpa >= 3.0
                    ? "text-yellow-600"
                    : gpa >= 2.0
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {gpa.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-400 text-xl">/ 4.00</span>
            </div>
            <div className="bg-[#D06718]/10 text-[#D06718] px-3 py-1.5 rounded-full text-sm font-bold inline-block mb-4">
              {currentClass}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Weighted Points</span>
                <span className="font-bold text-gray-900">
                  {totalWeightedPoints.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Courses in GPA</span>
                <span className="font-bold text-gray-900">
                  {coursesIncluded.length}
                </span>
              </div>
            </div>
          </div>

          {/* Credits Progress Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 font-medium uppercase text-xs tracking-wider mb-4">
              <BookOpen className="w-4 h-4" />
              Credits Progress
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">
                    GPA Credits Earned
                  </span>
                  <span className="font-bold text-gray-900">
                    {gpaCredits} / 125
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 bg-[#D06718]"
                    style={{
                      width: `${Math.min((gpaCredits / 125) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-right text-gray-500 mt-1.5">
                  {((gpaCredits / 125) * 100).toFixed(1)}% Complete
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining Credits</span>
                  <span className="font-bold text-gray-900">
                    {125 - gpaCredits}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Alerts Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 font-medium uppercase text-xs tracking-wider mb-4">
              <Info className="w-4 h-4" />
              Status Summary
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">
                    Passed Courses
                  </span>
                </div>
                <span className="text-lg font-bold text-green-700">
                  {coursesIncluded.length}
                </span>
              </div>

              {failedCourses.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-900">
                      Failed Courses
                    </span>
                  </div>
                  <span className="text-lg font-bold text-red-700">
                    {failedCourses.length}
                  </span>
                </div>
              )}

              {coursesExcluded.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">
                      Excluded from GPA
                    </span>
                  </div>
                  <span className="text-lg font-bold text-yellow-700">
                    {coursesExcluded.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Failed Courses Alert */}
        {compulsoryFailures.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 mb-2">
                  Action Required: Compulsory Course Failures
                </h3>
                <p className="text-red-800 mb-4">
                  You have <strong>{compulsoryFailures.length}</strong> failed
                  compulsory course(s). These courses
                  <strong> MUST be retaken and passed</strong> to meet
                  graduation requirements.
                </p>
                <div className="space-y-2">
                  {compulsoryFailures.map((course, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-lg border border-red-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-red-900">
                            {course.code}
                          </span>
                          <span className="text-gray-700 ml-2">
                            {course.name}
                          </span>
                        </div>
                        <span className="bg-red-200 text-red-900 px-3 py-1 rounded-full text-xs font-bold">
                          Grade: {course.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {optionalFailures.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">
                  Optional Course Failures
                </h3>
                <p className="text-yellow-800 mb-4">
                  You have <strong>{optionalFailures.length}</strong> failed
                  optional course(s). If you have met the required credit limit
                  for that category, these courses may be ignored. Otherwise,
                  you should retake or select alternative optional courses.
                </p>
                <div className="space-y-2">
                  {optionalFailures.map((course, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-lg border border-yellow-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-yellow-900">
                            {course.code}
                          </span>
                          <span className="text-gray-700 ml-2">
                            {course.name}
                          </span>
                        </div>
                        <span className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                          Grade: {course.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {supersededCourses.length > 0 && (
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-purple-900 mb-2">
                  Repeated Courses
                </h3>
                <p className="text-purple-800 mb-4">
                  You have <strong>{supersededCourses.length}</strong> course
                  attempt(s) that were superseded by later attempts. Only the{" "}
                  <strong>latest passing grade</strong> is counted in your GPA
                  calculation per OUSL regulations.
                </p>
                <div className="space-y-2">
                  {supersededCourses.map((course, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-lg border border-purple-200"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <span className="font-mono font-bold text-purple-900">
                            {course.code}
                          </span>
                          <span className="text-gray-700 ml-2">
                            {course.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            (Attempt #{course.attempt}, Year {course.loy})
                          </span>
                        </div>
                        <span className="bg-purple-200 text-purple-900 px-3 py-1 rounded-full text-xs font-bold">
                          Old Grade: {course.grade} - Not Used
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prediction Card */}
        {prediction && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 relative overflow-hidden">
            <div
              className={`absolute top-0 left-0 w-2 h-full ${
                prediction.achievable ? "bg-green-500" : "bg-yellow-500"
              }`}
            />

            <div className="pl-4">
              <div className="flex items-center gap-2 mb-3">
                {prediction.achievable ? (
                  <>
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                      Path to Next Classification
                    </h2>
                  </>
                ) : (
                  <>
                    <Target className="w-6 h-6 text-yellow-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                      Maintain Your Standing
                    </h2>
                  </>
                )}
              </div>

              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {prediction.message}
              </p>

              {prediction.achievable &&
                prediction.targetClass &&
                prediction.remainingCredits &&
                prediction.remainingCredits > 0 && (
                  <div className="bg-green-50 rounded-xl p-5 border border-green-200 flex flex-wrap gap-8 items-center">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-green-800 font-bold mb-1.5">
                        Target Classification
                      </p>
                      <p className="text-2xl font-bold text-green-700 mb-1">
                        {prediction.targetClass}
                      </p>
                      <p className="text-xs text-green-600 font-medium">
                        Minimum GPA:{" "}
                        {prediction.targetGpa
                          ? prediction.targetGpa.toFixed(2)
                          : "N/A"}
                      </p>
                    </div>

                    <div className="h-12 w-px bg-green-300 hidden md:block" />

                    <div>
                      <p className="text-xs uppercase tracking-wide text-green-800 font-bold mb-1.5">
                        Required Average
                      </p>
                      <div className="flex items-baseline gap-3">
                        <p className="text-3xl font-bold text-green-700">
                          {prediction.requiredAvgGpa.toFixed(2)}
                        </p>
                        <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
                          Grade: {prediction.reqGrade}
                        </span>
                      </div>
                    </div>

                    <div className="h-12 w-px bg-green-300 hidden lg:block" />

                    <div>
                      <p className="text-xs uppercase tracking-wide text-green-800 font-bold mb-1.5">
                        Remaining Credits
                      </p>
                      <p className="text-3xl font-bold text-green-700">
                        {prediction.remainingCredits}
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === "overview"
                    ? "bg-[#D06718] text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Award className="w-4 h-4 inline-block mr-2" />
                Classification Reference
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("courses")}
                className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === "courses"
                    ? "bg-[#D06718] text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <BookOpen className="w-4 h-4 inline-block mr-2" />
                Courses Breakdown
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("categories")}
                className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === "categories"
                    ? "bg-[#D06718] text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <BarChart3 className="w-4 h-4 inline-block mr-2" />
                Category Analysis
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-5">
                  Degree Classification Reference
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div
                    className={`p-5 rounded-xl border-2 ${
                      gpa >= 3.7
                        ? "bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-400 ring-2 ring-blue-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="font-bold text-blue-900 text-lg mb-1">
                      First Class
                    </div>
                    <div className="text-blue-700 font-semibold">
                      GPA ≥ 3.70
                    </div>
                    {gpa >= 3.7 && (
                      <div className="mt-2 text-xs text-blue-600 font-medium">
                        ✓ Your Current Level
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-5 rounded-xl border-2 ${
                      gpa >= 3.3 && gpa < 3.7
                        ? "bg-gradient-to-br from-green-50 to-green-100/50 border-green-400 ring-2 ring-green-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      Second Upper
                    </div>
                    <div className="text-gray-700 font-semibold">
                      GPA ≥ 3.30
                    </div>
                    {gpa >= 3.3 && gpa < 3.7 && (
                      <div className="mt-2 text-xs text-green-600 font-medium">
                        ✓ Your Current Level
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-5 rounded-xl border-2 ${
                      gpa >= 3.0 && gpa < 3.3
                        ? "bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-400 ring-2 ring-yellow-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      Second Lower
                    </div>
                    <div className="text-gray-700 font-semibold">
                      GPA ≥ 3.00
                    </div>
                    {gpa >= 3.0 && gpa < 3.3 && (
                      <div className="mt-2 text-xs text-yellow-600 font-medium">
                        ✓ Your Current Level
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-5 rounded-xl border-2 ${
                      gpa >= 2.0 && gpa < 3.0
                        ? "bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-400 ring-2 ring-orange-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      Pass
                    </div>
                    <div className="text-gray-700 font-semibold">
                      GPA ≥ 2.00
                    </div>
                    {gpa >= 2.0 && gpa < 3.0 && (
                      <div className="mt-2 text-xs text-orange-600 font-medium">
                        ✓ Your Current Level
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-5">
                  * Calculation based on OUSL Bachelor of Software Engineering
                  Honours Student Guidebook 2025/2026.
                  <br />
                  Excluded courses from GPA: FDE3023 (EfIL), LTE34SE
                  (EAP-Elementary), MHZ2250 (Elementary Math) - as per
                  university regulations.
                </p>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="space-y-6">
                {/* Courses Included in GPA */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Courses Included in GPA Calculation (
                      {coursesIncluded.length})
                    </h3>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Course Code
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Course Name
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
                            Level
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
                            Cat
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
                            Credits
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
                            Grade
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
                            GPV
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
                            Points
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
                            Type
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">
                            Attempt
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {coursesIncluded.map((course, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4 font-mono text-gray-900 font-medium">
                              {course.code}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {course.name}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                                L{course.level}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                                {course.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center font-semibold text-gray-900">
                              {course.credit}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                  course.grade.startsWith("A")
                                    ? "bg-blue-100 text-blue-800"
                                    : course.grade.startsWith("B")
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {course.grade}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center font-semibold text-gray-900">
                              {course.gpv.toFixed(1)}
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-[#D06718]">
                              {course.weightedPoints.toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                  course.isCompulsory
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {course.isCompulsory
                                  ? "Compulsory"
                                  : "Optional"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-xs text-gray-600">
                                {course.attempt > 1
                                  ? `#${course.attempt}`
                                  : "#1"}
                              </span>
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                          <td
                            colSpan={4}
                            className="py-3 px-4 text-right text-gray-900"
                          >
                            Totals:
                          </td>
                          <td className="py-3 px-4 text-center text-gray-900">
                            {gpaCredits}
                          </td>
                          <td
                            colSpan={2}
                            className="py-3 px-4 text-center text-gray-900"
                          >
                            GPA: {gpa.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-center text-[#D06718]">
                            {totalWeightedPoints.toFixed(2)}
                          </td>
                          <td colSpan={2} />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {supersededCourses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-bold text-gray-900">
                        Superseded Course Attempts ({supersededCourses.length})
                      </h3>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-purple-200 bg-purple-50/30">
                      <table className="w-full text-sm">
                        <thead className="bg-purple-50 border-b-2 border-purple-200">
                          <tr>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Course Code
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Course Name
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">
                              Credits
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">
                              Old Grade
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">
                              Attempt
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">
                              Year
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-100">
                          {supersededCourses.map((course, idx) => (
                            <tr
                              key={idx}
                              className="hover:bg-purple-100/50 transition-colors"
                            >
                              <td className="py-3 px-4 font-mono text-gray-900 font-medium">
                                {course.code}
                              </td>
                              <td className="py-3 px-4 text-gray-700">
                                {course.name}
                              </td>
                              <td className="py-3 px-4 text-center font-semibold text-gray-900">
                                {course.credit}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-200 text-purple-900 line-through">
                                  {course.grade}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center text-gray-700">
                                #{course.attempt}
                              </td>
                              <td className="py-3 px-4 text-center text-gray-700">
                                {course.loy}
                              </td>
                              <td className="py-3 px-4 text-xs text-purple-700 font-medium">
                                Replaced by later attempt
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Excluded Courses */}
                {continuingEdCourses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <h3 className="text-lg font-bold text-gray-900">
                        Excluded from GPA (Continuing Education) (
                        {continuingEdCourses.length})
                      </h3>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-yellow-200 bg-yellow-50/30">
                      <table className="w-full text-sm">
                        <thead className="bg-yellow-50 border-b-2 border-yellow-200">
                          <tr>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Course Code
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Course Name
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">
                              Credits
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">
                              Grade
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Note
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow-100">
                          {continuingEdCourses.map((course, idx) => (
                            <tr
                              key={idx}
                              className="hover:bg-yellow-100/50 transition-colors"
                            >
                              <td className="py-3 px-4 font-mono text-gray-900 font-medium">
                                {course.code}
                              </td>
                              <td className="py-3 px-4 text-gray-700">
                                {course.name}
                              </td>
                              <td className="py-3 px-4 text-center font-semibold text-gray-900">
                                {course.credit}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                                  {course.grade}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-gray-600 italic">
                                Not counted in GPA calculation
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Failed Courses */}
                {failedCourses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-bold text-gray-900">
                        Failed Courses ({failedCourses.length})
                      </h3>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-red-200 bg-red-50/30">
                      <table className="w-full text-sm">
                        <thead className="bg-red-50 border-b-2 border-red-200">
                          <tr>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Course Code
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Course Name
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">
                              Credits
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">
                              Grade
                            </th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">
                              Type
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Action Required
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-red-100">
                          {failedCourses.map((course, idx) => (
                            <tr
                              key={idx}
                              className="hover:bg-red-100/50 transition-colors"
                            >
                              <td className="py-3 px-4 font-mono text-gray-900 font-medium">
                                {course.code}
                              </td>
                              <td className="py-3 px-4 text-gray-700">
                                {course.name}
                              </td>
                              <td className="py-3 px-4 text-center font-semibold text-gray-900">
                                {course.credit}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-200 text-red-900">
                                  {course.grade}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                    course.isCompulsory
                                      ? "bg-red-200 text-red-900"
                                      : "bg-yellow-200 text-yellow-900"
                                  }`}
                                >
                                  {course.isCompulsory
                                    ? "Compulsory"
                                    : "Optional"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs">
                                {course.isCompulsory ? (
                                  <span className="text-red-700 font-bold">
                                    Must retake and pass
                                  </span>
                                ) : (
                                  <span className="text-yellow-700 font-medium">
                                    May ignore if credit requirements met
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === "categories" && (
              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-5">
                  Credit Requirements by Category (BSE Honours Degree)
                </h3>
                <div className="space-y-4">
                  {categoryBreakdown.map((cat, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-5 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {cat.categoryName} ({cat.category})
                          </h4>
                          <p className="text-sm text-gray-600">
                            Required: {cat.minRequired} - {cat.maxAllowed}{" "}
                            credits
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {cat.credits}
                          </div>
                          <div className="text-xs text-gray-500">
                            credits earned
                          </div>
                        </div>
                      </div>

                      <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
                        <div
                          className={`h-4 rounded-full transition-all duration-1000 ${
                            cat.status === "below"
                              ? "bg-red-500"
                              : cat.status === "exceeded"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${cat.percentage}%`,
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`font-bold ${
                            cat.status === "below"
                              ? "text-red-700"
                              : cat.status === "exceeded"
                              ? "text-yellow-700"
                              : "text-green-700"
                          }`}
                        >
                          {cat.status === "below"
                            ? `⚠ ${
                                cat.minRequired - cat.credits
                              } more credits needed`
                            : cat.status === "exceeded"
                            ? `⚠ ${
                                cat.credits - cat.maxAllowed
                              } credits over maximum`
                            : "✓ Requirements met"}
                        </span>
                        <span className="text-gray-500">
                          {cat.percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Category I (Industrial) and S
                    (Engineering Sciences) share a combined maximum of 78
                    credits. Ensure you meet the minimum requirements for each
                    category while not exceeding the maximum limits.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPAPage;

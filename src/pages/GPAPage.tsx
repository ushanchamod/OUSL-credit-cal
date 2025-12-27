import { useStore } from "../store/global";
import { calculateGPA, getNextClassInfo } from "../utility/gpa";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const GPAPage = () => {
  const result = useStore((state) => state.data);

  const stats = useMemo(() => {
    if (!result) return null;
    const { gpa, rawGpa, gpaCredits } = calculateGPA(result);
    const prediction = getNextClassInfo(rawGpa, gpaCredits);
    return { gpa, gpaCredits, prediction };
  }, [result]);

  if (!stats)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-700">No Data Found</h2>
          <p className="text-gray-500 mb-4">
            Please upload your result sheet first.
          </p>
          <Link to="/" className="text-blue-600 hover:underline">
            Go to Upload
          </Link>
        </div>
      </div>
    );

  const { gpa, gpaCredits, prediction } = stats;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 mb-4"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Academic Performance Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Detailed breakdown of your GPA and future path.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 md:col-span-1">
          <h2 className="text-gray-500 font-medium uppercase text-xs tracking-wider">
            Current GPA
          </h2>
          <div className="mt-4 flex items-baseline">
            <span
              className={`text-6xl font-extrabold ${
                gpa >= 3.0 ? "text-blue-600" : "text-gray-800"
              }`}
            >
              {gpa}
            </span>
            <span className="ml-2 text-gray-400 text-xl">/ 4.00</span>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Credits Earned (GPA)</span>
                <span className="font-semibold text-gray-900">
                  {gpaCredits} / 125
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.min((gpaCredits / 125) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-right text-gray-400 mt-1">
                {((gpaCredits / 125) * 100).toFixed(1)}% Completed
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 md:col-span-2 relative overflow-hidden flex flex-col justify-center">
          <div
            className={`absolute top-0 left-0 w-2 h-full ${
              prediction.achievable ? "bg-green-500" : "bg-yellow-500"
            }`}
          ></div>

          <div className="pl-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              {prediction.achievable
                ? "🚀 Path to Next Level"
                : "🛡️ Maintain Your Ground"}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {prediction.message}
            </p>

            {prediction.achievable && prediction.targetClass && (
              <div className="bg-green-50 rounded-lg p-5 border border-green-100 flex flex-wrap gap-8 items-center">
                <div>
                  <p className="text-xs uppercase tracking-wide text-green-800 font-semibold mb-1">
                    Target Goal
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {prediction.targetClass}
                  </p>
                  <p className="text-xs text-green-600">
                    Min GPA:{" "}
                    {prediction.targetGpa
                      ? prediction.targetGpa.toFixed(2)
                      : "N/A"}
                  </p>
                </div>

                <div className="h-10 w-px bg-green-200 hidden md:block"></div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-green-800 font-semibold mb-1">
                    Required Average
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-green-700">
                      {prediction.requiredAvgGpa}
                    </p>
                    <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-sm font-bold">
                      Avg Grade: {prediction.reqGrade}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-gray-800 font-semibold mb-4">
          Degree Classification Reference
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="font-bold text-blue-900 text-lg">First Class</div>
            <div className="text-blue-600 font-medium">GPA ≥ 3.70</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="font-bold text-gray-900 text-lg">Second Upper</div>
            <div className="text-gray-600 font-medium">GPA ≥ 3.30</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="font-bold text-gray-900 text-lg">Second Lower</div>
            <div className="text-gray-600 font-medium">GPA ≥ 3.00</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="font-bold text-gray-900 text-lg">Pass</div>
            <div className="text-gray-600 font-medium">GPA ≥ 2.00</div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Calculation rules based on OUSL Bachelor of Software Engineering
          Honours Student Guidebook 2025/2026. Excluded courses: FDE3023,
          LTE34SE, MHZ2250.
        </p>
      </div>
    </div>
  );
};

export default GPAPage;

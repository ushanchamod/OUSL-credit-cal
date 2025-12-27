import type React from "react";

import { useEffect, useState, useMemo } from "react";
import { useStore } from "../../store/global";
import { calStatistics } from "../../utility/dataClean";
import { calculateGPA } from "../../utility/gpa";
import { Link } from "react-router-dom";
import { TrendingUp, BookOpen, Award, AlertCircle } from "lucide-react";

const CreditTable = ({
  title,
  data,
  icon,
  highlight = false,
}: {
  title: string;
  data: { label: string; value: string | number | null }[];
  icon?: React.ReactNode;
  highlight?: boolean;
}) => (
  <div
    className={`flex-1 min-w-[280px] rounded-xl border transition-all ${
      highlight
        ? "border-[#D06718] bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-md"
        : "border-gray-200 bg-white"
    }`}
  >
    <div
      className={`p-4 border-b ${
        highlight ? "border-orange-200" : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3
          className={`text-lg font-bold ${
            highlight ? "text-[#D06718]" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {data.map((row, idx) => (
        <div
          key={idx}
          className={`flex justify-between px-4 py-3 transition-colors ${
            highlight ? "hover:bg-orange-100/50" : "hover:bg-gray-50"
          }`}
        >
          <span className="text-sm text-gray-600 font-medium">{row.label}</span>
          <span className="text-sm text-gray-900 font-bold">
            {row.value ?? "N/A"}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const Result = () => {
  const result = useStore((state) => state.data);
  const [stats, setStats] = useState<{
    totalCredit: number | null;
    passCredit: number | null;
    resitCredit: number | null;
    repeatCredit: number | null;
    pendingCredit: number | null;
    eligibleCredit: number | null;
    compulsoryCredit: number | null;
    optionalCredit: number | null;
  }>({
    totalCredit: null,
    passCredit: null,
    resitCredit: null,
    repeatCredit: null,
    pendingCredit: null,
    eligibleCredit: null,
    compulsoryCredit: null,
    optionalCredit: null,
  });

  const gpaSummary = useMemo(() => {
    if (!result)
      return { gpa: "0.00", classPred: "N/A", gpaCredits: 0, coursesUsed: 0 };
    const { gpa, gpaCredits, coursesIncluded } = calculateGPA(result);
    // const info = getNextClassInfo(gpa, gpaCredits);

    let currentClass = "Pending";
    if (gpa >= 3.7) currentClass = "First Class";
    else if (gpa >= 3.3) currentClass = "Second Upper";
    else if (gpa >= 3.0) currentClass = "Second Lower";
    else if (gpa >= 2.0) currentClass = "Pass";

    return {
      gpa: gpa.toFixed(2),
      classPred: currentClass,
      gpaCredits,
      coursesUsed: coursesIncluded.length,
    };
  }, [result]);

  useEffect(() => {
    if (result) {
      const calculatedStats = calStatistics(result);
      setStats(calculatedStats);
    }
  }, [result]);

  const creditStats1 = [
    { label: "Subjects Count", value: result?.length ?? null },
    { label: "Selected Total Credits", value: stats.totalCredit },
    { label: "Pass Credits", value: stats.passCredit },
    { label: "Pending Credits", value: stats.pendingCredit },
    { label: "Eligible Credits", value: stats.eligibleCredit },
  ];

  const creditStats2 = [
    { label: "Compulsory Credits", value: stats.compulsoryCredit },
    { label: "Optional Credits", value: stats.optionalCredit },
    { label: "Resit Credits", value: stats.resitCredit },
    { label: "Repeat Credits", value: stats.repeatCredit },
  ];

  const gpaStats = [
    { label: "Current GPA", value: gpaSummary.gpa },
    { label: "Classification", value: gpaSummary.classPred },
    { label: "GPA Credits", value: gpaSummary.gpaCredits },
    { label: "Courses in GPA", value: gpaSummary.coursesUsed },
  ];

  if (!result) return null;

  return (
    <div className="w-full space-y-4">
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Academic Overview
            </h2>
            <p className="text-sm text-gray-600">
              Your comprehensive credit and GPA summary
            </p>
          </div>
          <Link
            to="/gpa-analysis"
            className="inline-flex items-center justify-center gap-2 bg-[#D06718] hover:bg-[#b65714] text-white px-6 py-3 rounded-lg transition-colors shadow-sm font-semibold text-sm group"
          >
            <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Detailed GPA Analysis
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <CreditTable
          title="Current GPA Status"
          data={gpaStats}
          icon={<Award className="w-5 h-5 text-[#D06718]" />}
          highlight={true}
        />
        <CreditTable
          title="Credit Statistics"
          data={creditStats1}
          icon={<BookOpen className="w-5 h-5 text-gray-700" />}
        />
        <CreditTable
          title="Credit Distribution"
          data={creditStats2}
          icon={<BookOpen className="w-5 h-5 text-gray-700" />}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> GPA calculation excludes Continuing Education
          courses (FDE3023, LTE34SE, MHZ2250) as per OUSL regulations.
          Compulsory failed courses must be retaken. Optional failed courses may
          be ignored if credit requirements are met.
        </p>
      </div>
    </div>
  );
};

export default Result;

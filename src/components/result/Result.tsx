import { useEffect, useState, useMemo } from "react";
import { useStore } from "../../store/global";
import { calStatistics } from "../../utility/dataClean";
import { calculateGPA, getNextClassInfo } from "../../utility/gpa";
import { Link } from "react-router-dom";

const CreditTable = ({
  title,
  data,
  highlight = false,
}: {
  title: string;
  data: { label: string; value: string | number | null }[];
  highlight?: boolean;
}) => (
  <div
    className={`flex-1 min-w-[300px] ${
      highlight ? "border-blue-200 bg-blue-50 rounded-lg" : ""
    }`}
  >
    <h3
      className={`text-lg font-semibold mb-4 ${
        highlight ? "text-blue-800 p-2" : "text-gray-800"
      }`}
    >
      {title}
    </h3>
    <table className="min-w-full table-auto border-collapse text-sm">
      <thead>
        <tr
          className={
            highlight
              ? "bg-blue-100 border-b border-blue-200"
              : "bg-gray-100 border-b"
          }
        >
          <th className="px-6 py-3 text-left text-gray-600">Type</th>
          <th className="px-6 py-3 text-right text-gray-600">Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            className={highlight ? "hover:bg-blue-100" : "hover:bg-gray-50"}
            key={idx}
          >
            <td className="px-6 py-3 text-gray-600">{row.label}</td>
            <td className="px-6 py-3 text-right text-gray-800 font-medium">
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
    if (!result) return { gpa: "0.00", classPred: "N/A" };
    const { gpa, rawGpa, gpaCredits } = calculateGPA(result);
    const info = getNextClassInfo(rawGpa, gpaCredits);
    const currentClass =
      info.targetClass === "Maintained First Class" ? "First Class" : "Pending";
    return { gpa: gpa.toFixed(2), classPred: currentClass };
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

  const gpaStats = [{ label: "Current GPA", value: gpaSummary.gpa }];

  if (!result) return null;

  return (
    <div className="w-full mt-7">
      <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 gap-4">
          <h2 className="text-xl font-bold text-gray-800">Results Overview</h2>
          <Link
            to="/gpa-analysis"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm font-medium flex items-center gap-2"
          >
            <span>📊</span> View Detailed GPA Analysis
          </Link>
        </div>

        <div className="flex flex-wrap gap-6">
          <CreditTable title="GPA Snapshot" data={gpaStats} highlight={true} />
          <CreditTable title="Credit Statistics" data={creditStats1} />
          <CreditTable title="Distribution" data={creditStats2} />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 px-2 italic">
        * GPA excludes Continuing Education courses (EfIL, EAP, Elementary
        Math).
      </p>
    </div>
  );
};

export default Result;

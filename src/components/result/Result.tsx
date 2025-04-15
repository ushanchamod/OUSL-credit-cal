import { useEffect, useState } from 'react';
import { useStore } from '../../store/global';
import { calStatistics } from '../../utility/dataClean';


const CreditTable = ({
  title,
  data
}: {
  title: string;
  data: { label: string; value: number | null }[];
  columns: { label: string; value: string }[];
}) => (
  <div className="flex-1">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <table className="min-w-full table-auto border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="px-6 py-3 text-left text-gray-600">Credit Type</th>
          <th className="px-6 py-3 text-right text-gray-600">Credits</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr className="hover:bg-gray-50" key={idx}>
            <td className="px-6 py-3 text-gray-600">{row.label}</td>
            <td className="px-6 py-3 text-right text-gray-800">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Result = () => {
  const result = useStore(state => state.data);
  const [data, setData] = useState<{
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

  useEffect(() => {
    if (result) {
      const stats = calStatistics(result);
      setData(stats);
    }
  }, [result]);

  const creditStats1 = [
    { label: 'Subjects Count', value: result?.length ?? null },
    { label: 'Selected Total Credits', value: data.totalCredit },
    { label: 'Pass Credits', value: data.passCredit },
    { label: 'Pending Credits', value: data.pendingCredit },
    { label: 'Eligible Credits', value: data.eligibleCredit },
  ];

  const creditStats2 = [
    { label: 'Compulsory Credits', value: data.compulsoryCredit },
    { label: 'Optional Credits', value: data.optionalCredit },
    { label: 'Resit Credits', value: data.resitCredit },
    { label: 'Repeat Credits', value: data.repeatCredit },
  ];

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg border border-gray-200 mt-7 space-y-6 flex flex-wrap gap-6">
      <CreditTable title="Credit Statistics (Selected)" data={creditStats1} columns={[{ label: 'Credit Type', value: 'label' }, { label: 'Credits', value: 'value' }]} />
      <CreditTable title="." data={creditStats2} columns={[{ label: 'Credit Type', value: 'label' }, { label: 'Credits', value: 'value' }]} />
    </div>
  );
};

export default Result;

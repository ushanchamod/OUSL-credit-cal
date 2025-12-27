"use client";

import { useEffect } from "react";
import { useStore } from "../../store/global";
import { applyFilter } from "../../utility/dataClean";
import MultipleSelectChip from "../ui/MultipleSelectChip";
import BasicSelect from "../ui/BasicSelect";
import { FilterX, SlidersHorizontal } from "lucide-react";

const GlobalConfigBar = () => {
  const config = useStore((state) => state.config);
  const upload = useStore((state) => state.upload);
  const setConfig = useStore((state) => state.setConfig);
  const populateData = useStore((state) => state.populateData);

  useEffect(() => {
    if (upload) {
      const x = applyFilter(upload, config);
      populateData(x);
    }
  }, [
    config.removePending,
    config.removeRepeat,
    config.removeResit,
    config.level,
    config.credit,
    config.category,
    config.progress,
    config.loy,
    config.compulsoryState,
    upload,
    populateData,
  ]);

  const setLevels = (levels: string[]) => {
    const toNum = levels.map((num) => Number.parseInt(num));
    setConfig({
      ...config,
      level: toNum,
    });
  };

  const setCredits = (credits: string[]) => {
    const toNum = credits.map((num) => Number.parseInt(num));
    setConfig({
      ...config,
      credit: toNum,
    });
  };

  const setCategory = (category: string[]) => {
    setConfig({
      ...config,
      category: category,
    });
  };

  const setProgress = (progress: string[]) => {
    setConfig({
      ...config,
      progress: progress,
    });
  };

  const setLoy = (loy: string[]) => {
    setConfig({
      ...config,
      loy: loy.map((num) => Number.parseInt(num)),
    });
  };

  const setCompulsoryState = (
    state: "both" | "compulsory" | "notCompulsory"
  ) => {
    setConfig({
      ...config,
      compulsoryState: state,
    });
  };

  const clearFilters = () => {
    setConfig({
      removePending: false,
      removeRepeat: false,
      removeResit: false,
      credit: [],
      level: [],
      lof: [],
      category: [],
      progress: [],
      loy: [],
      compulsoryState: "both",
    });
  };

  return (
    <div className="w-full p-6 bg-white shadow-sm rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Filter Options</h3>
        </div>
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
          aria-label="Clear all filters"
        >
          <FilterX className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MultipleSelectChip
          label="Levels"
          setStateName={setLevels}
          state={
            upload ? [...new Set(upload.map((d) => d.level.toString()))] : []
          }
          stateName={config.level.map((i) => i.toLocaleString())}
        />

        <MultipleSelectChip
          label="Credit"
          setStateName={setCredits}
          state={
            upload ? [...new Set(upload.map((d) => d.credit.toString()))] : []
          }
          stateName={config.credit.map((i) => i.toLocaleString())}
        />

        <MultipleSelectChip
          label="Category"
          setStateName={setCategory}
          state={upload ? [...new Set(upload.map((d) => d.category))] : []}
          stateName={config.category.map((i) => i.toLocaleString())}
        />

        <MultipleSelectChip
          label="Progress"
          setStateName={setProgress}
          state={upload ? [...new Set(upload.map((d) => d.progress))] : []}
          stateName={config.progress.map((i) => i.toLocaleString())}
        />

        <MultipleSelectChip
          label="Last Offer Year"
          setStateName={setLoy}
          state={
            upload ? [...new Set(upload.map((d) => d.loy.toString()))] : []
          }
          stateName={config.loy.map((i) => i.toString())}
        />

        <BasicSelect
          options={[
            { label: "All Subjects", value: "both" },
            { label: "Compulsory Only", value: "compulsory" },
            { label: "Optional Only", value: "notCompulsory" },
          ]}
          label="Subject Type"
          value={config.compulsoryState}
          setValue={(value) =>
            setCompulsoryState(value as "both" | "compulsory" | "notCompulsory")
          }
        />
      </div>
    </div>
  );
};

export default GlobalConfigBar;

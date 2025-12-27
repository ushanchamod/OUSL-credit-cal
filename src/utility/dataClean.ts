import type { InputResultType } from "../App";
import type { ConfigType } from "../store/global";
import { compulsoryOrNot } from "./subject";

// Step 1: Clean the data
export const cleanData = (rows: string[][]): string[][] => {
  return rows.map((d, index) => {
    if (index === 0) return d;
    const newRow = [...d];
    newRow.splice(7, 1);
    return newRow;
  });
};

// Step 2: Format to JSON
export const formatToJson = (data: string[][]): InputResultType[] => {
  return data
    .map((d, index) => {
      if (index === 0) return undefined;

      // FIX: Trim the code to remove leading/trailing spaces
      const rawCode = d[0];
      if (!rawCode || rawCode.length < 5) return undefined;

      const cleanCode = rawCode.trim();

      return {
        id: cleanCode, // Use cleanCode here
        code: cleanCode, // Use cleanCode here
        level: Number.parseInt(d[0][3] ?? "0", 10), // Note: d[0] access here works if format is standard (e.g. EEI3...)
        credit: Number.parseInt(d[0][4] ?? "0", 10),
        category: d[0][2] ?? "",
        name: d[1] ?? "",
        loy: Number(d[2] ?? 0),
        progress: d[3] ?? "",
        grade: d[4] ?? "",
        attempt: Number.parseInt(d[5] ?? "0", 10),
        el: Number(d[6] ?? 0),
        isCompulsory: "",
      } as InputResultType;
    })
    .filter((a): a is InputResultType => a !== undefined);
};

// Step 3: Filter relevant results
export const filterRelevantResults = (
  results: InputResultType[]
): InputResultType[] => {
  return results.filter(
    (result) =>
      result.level > 3 &&
      result.progress.toLowerCase() === "pass" &&
      result.credit > 0
  );
};

export const removeDuplicateRow = (
  results: InputResultType[]
): InputResultType[] => {
  const map = new Map<string, InputResultType>();

  for (const r of results) {
    const existing = map.get(r.code);
    if (!existing || r.loy > existing.loy) {
      map.set(r.code, r);
    }
  }

  return Array.from(map.values());
};

const addCompulsoryOrNot = (results: InputResultType[]): InputResultType[] => {
  return results.map((r) => ({
    ...r,
    isCompulsory: compulsoryOrNot.find((e) => e.code === r.code)?.status ?? "",
  }));
};

// Main function that uses the above functions
export const initialDataClean = (rows: string[][]): InputResultType[] => {
  const cleanedData = cleanData(rows);
  const jsonFormatted = formatToJson(cleanedData);
  const removeDuplicate = removeDuplicateRow(jsonFormatted);
  const addCompulsory = addCompulsoryOrNot(removeDuplicate);
  return addCompulsory;
  // return filterRelevantResults(jsonFormatted);
};

export const applyFilter = (
  upload: InputResultType[] | null,
  config: ConfigType
): InputResultType[] => {
  if (!upload) throw new Error("upload must be defined");

  const excluded = new Set<string>();
  const includeLevel = new Set(config.level);
  const includeCredit = new Set(config.credit);
  const includeCategory = new Set(config.category);
  const includeProgress = new Set(config.progress);
  const includeLoy = new Set(config.loy);

  if (config.removeResit) excluded.add("resit");
  if (config.removeRepeat) excluded.add("repeat");
  if (config.removePending) excluded.add("pending");

  return upload.filter((r) => {
    const isExcluded = excluded.has(r.progress.toLowerCase());
    const isLevelIncluded =
      includeLevel.size === 0 || includeLevel.has(r.level);
    const isCreditIncluded =
      includeCredit.size === 0 || includeCredit.has(r.credit);
    const isCategoryIncluded =
      includeCategory.size === 0 || includeCategory.has(r.category);
    const isProgressIncluded =
      includeProgress.size === 0 || includeProgress.has(r.progress);
    const isLoyIncluded = includeLoy.size === 0 || includeLoy.has(r.loy);

    const compulsoryOrNotFilterCheck =
      config.compulsoryState === "both"
        ? true
        : config.compulsoryState === "compulsory"
        ? r.isCompulsory === "compulsory"
        : r.isCompulsory === "optional";

    return (
      !isExcluded &&
      isLevelIncluded &&
      isCreditIncluded &&
      isCategoryIncluded &&
      isProgressIncluded &&
      isLoyIncluded &&
      compulsoryOrNotFilterCheck
    );
  });
};

export const calStatistics = (result: InputResultType[]) => {
  const data = {
    totalCredit: 0,
    passCredit: 0,
    resitCredit: 0,
    repeatCredit: 0,
    pendingCredit: 0,
    eligibleCredit: 0,
    compulsoryCredit: 0,
    optionalCredit: 0,
  };

  for (const r of result) {
    data.totalCredit += r.credit;
    data.compulsoryCredit += r.isCompulsory === "compulsory" ? r.credit : 0;
    data.optionalCredit += r.isCompulsory === "optional" ? r.credit : 0;

    const progress = r.progress.toLowerCase();
    switch (progress) {
      case "repeat":
        data.repeatCredit += r.credit;
        break;
      case "resit":
        data.resitCredit += r.credit;
        break;
      case "pending":
        data.pendingCredit += r.credit;
        break;
      case "eligible":
        data.eligibleCredit += r.credit;
        break;
      case "pass":
        data.passCredit += r.credit;
        break;
    }
  }

  return data;
};

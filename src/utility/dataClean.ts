import { InputResultType } from "../App";
import { ConfigType } from "../store/global";

// Step 1: Clean the data
export const cleanData = (rows: Array<string[]>): Array<string[]> => {
  return rows.map((d, index) => {
    if (index === 0) return d;
    else {
      const newRow = [...d];
      newRow.splice(7, 1);
      return newRow;
    }
  });
};

// Step 2: Format to JSON
export const formatToJson = (data: Array<string[]>): InputResultType[] => {
  return data
    .map((d, index) => {
      if (index !== 0) {
        return {
          id: d[0],
          code: d[0],
          level: parseInt(d[0][3]),
          credit: parseInt(d[0][4]),
          category: d[0][2],
          name: d[1],
          loy: d[2], // Last Offered Year
          progress: d[3],
          grade: d[4],
          attempt: parseInt(d[5]), // Convert 'attempt' to number
          el: d[6], // Eligibility Left
        } as unknown as InputResultType;
      }
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
      result.progress.toLocaleLowerCase() === "pass" &&
      result.credit > 0
  );
};

export const removeDuplicateRow = (results: InputResultType[]) => {
  const map = new Map<string, InputResultType>();

  results.forEach((r) => {
    const existing = map.get(r.code);

    if (!existing || r.loy > existing.loy) {
      map.set(r.code, r); // set or replace with the one having higher 'loy'
    }
  });

  return Array.from(map.values());
};

// Main function that uses the above functions
export const initialDataClean = (rows: Array<string[]>): InputResultType[] => {
  const cleanedData = cleanData(rows);
  const jsonFormatted = formatToJson(cleanedData);
  const removeDuplicate = removeDuplicateRow(jsonFormatted);
  return removeDuplicate;
  // return filterRelevantResults(jsonFormatted);
};

export const applyFilter = (
  upload: InputResultType[] | null,
  config: ConfigType
): InputResultType[] => {
  if (!upload) throw new Error("upload must be defined");

  const excluded = new Set<string | number>();
  const includeLevel = new Set<number>();
  const includeCredit = new Set<number>();
  const includeCategory = new Set<string>();
  const includeProgress = new Set<string>();
  const includeLoy = new Set<number>();

  if (config.removeResit) excluded.add("resit");
  if (config.removeRepeat) excluded.add("repeat");
  if (config.removePending) excluded.add("pending");

  if (config.level) {
    config.level.forEach((level) => includeLevel.add(level));
  }
  if (config.credit) {
    config.credit.forEach((credit) => includeCredit.add(credit));
  }
  if (config.category) {
    config.category.forEach((category) => includeCategory.add(category));
  }
  if (config.progress) {
    config.progress.forEach((progress) => includeProgress.add(progress));
  }
  if (config.loy) {
    config.loy.forEach((loy) => includeLoy.add(loy));
  }

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

    return (
      !isExcluded &&
      isLevelIncluded &&
      isCreditIncluded &&
      isCategoryIncluded &&
      isProgressIncluded &&
      isLoyIncluded
    );
  });
};

export const calStatistics = (result: InputResultType[]) => {
  let data = {
    totalCredit: 0,
    passCredit: 0,
    resitCredit: 0,
    repeatCredit: 0,
    pendingCredit: 0,
    eligibleCredit: 0,
  };

  result.forEach((r) => {
    data.totalCredit += r.credit; // Add to total credit
    switch (r.progress.toLowerCase()) {
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
      default:
        break;
    }
  });

  return data;
};

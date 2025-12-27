import { create } from "zustand";
import type { InputResultType } from "../App";

interface ConfigType {
  removePending: boolean;
  removeResit: boolean;
  removeRepeat: boolean;
  level: number[];
  credit: number[];
  lof: number[];
  category: string[];
  progress: string[];
  loy: number[];
  compulsoryState: "both" | "compulsory" | "notCompulsory";
}

interface StoreState {
  upload: InputResultType[] | null;
  data: InputResultType[] | null;
  populateData: (newData: InputResultType[]) => void;
  setUpload: (newData: InputResultType[]) => void;
  config: ConfigType;
  setConfig: (c: ConfigType) => void;
}

const useStore = create<StoreState>((set) => ({
  upload: null,
  data: null,
  config: {
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
  },
  setUpload: (newData) => set({ data: newData, upload: newData }),
  populateData: (newData) => set({ data: newData }),
  setConfig: (newConfig) => set({ config: newConfig }),
}));

export { useStore };
export type { StoreState, ConfigType };

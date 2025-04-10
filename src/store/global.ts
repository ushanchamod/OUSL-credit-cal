import { create } from "zustand";
import { InputResultType } from "../App";

interface ConfigType {
  removePending: boolean;
  removeResit: boolean;
  removeRepeat: boolean;
  level: number[],
  credit: number[],
  lof: number[]
  category: string[]
  progress: string[]
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
  },
  setUpload: (newData) => set({ data: newData, upload: newData }),
  populateData: (newData) => set({ data: newData }),
  setConfig: (newConfig) => set({ config: newConfig }),
}));

export { useStore };
export type { StoreState, ConfigType };

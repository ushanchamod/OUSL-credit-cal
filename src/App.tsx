

import FileInput from "./components/input/FileInput";
import DataTable from "./components/data-table/DataTable";
import GlobalConfigBar from "./components/global-config/globalConfigBar";
import { useStore } from "./store/global";
import TopBar from "./components/top-bar/TopBar";
import Result from "./components/result/Result";
import Footer from "./components/footer/Footer";

export type InputResultType = {
  level: number;
  attempt: number;
  code: string;
  credit: number;
  category: string;
  el: number;
  grade: number;
  loy: number;
  name: string;
  progress: string;
};

const App = () => {
  const upload = useStore((state: any) => state.upload)
  return (
    <main className="bg-gray-50 h-full min-h-[100vh] box-border">
      <TopBar />
      <div className="max-w-[1200px] m-auto p-0 sm:px-5 py-5 min-h-[100vh]">
      
        {
          upload ? (
            <>
              <GlobalConfigBar />
              <Result />
              <DataTable />
            </>
          ) : (<FileInput />)
        }
      <Footer />
      </div>
    </main>
  );
};

export default App;

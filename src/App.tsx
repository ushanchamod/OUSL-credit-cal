import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/top-bar/TopBar";
import FileInput from "./components/input/FileInput";
import DataTable from "./components/data-table/DataTable";
import Result from "./components/result/Result";
import GPAPage from "./pages/GPAPage";
import Footer from "./components/footer/Footer";
import GlobalConfigBar from "./components/global-config/globalConfigBar";
import { useStore } from "./store/global";

// Define shared type if needed, or import from store/App
export interface InputResultType {
  id: string;
  code: string;
  level: number;
  credit: number;
  category: string;
  name: string;
  loy: number;
  progress: string;
  grade: number | string;
  attempt: number;
  el: number;
  isCompulsory: string;
}

const Home = () => {
  // We only need 'data' to determine if we should show the results.
  // 'FileInput' handles the setting of 'data' internally.
  const data = useStore((state) => state.data);

  return (
    <div className="container mx-auto px-4 min-h-screen pb-10">
      <TopBar />
      <div className="mt-8 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <FileInput />
        </div>

        {data && (
          <>
            <GlobalConfigBar />
            <Result />
            <DataTable />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gpa-analysis" element={<GPAPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import TopBar from "./components/top-bar/TopBar";
import FileInput from "./components/input/FileInput";
import DataTable from "./components/data-table/DataTable";
import Result from "./components/result/Result";
import Footer from "./components/footer/Footer";
import GlobalConfigBar from "./components/global-config/globalConfigBar";
import LoadingSpinner from "./components/LoadingSpinner";
import { useStore } from "./store/global";

const GPAPage = lazy(() => import("./pages/GPAPage"));

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
  const data = useStore((state) => state.data);
  const hasData = data && data.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {!hasData && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  OUSL Credit Calculator
                </h1>
                <p className="text-gray-600 text-sm">
                  Upload your Excel file from MyOUSL to analyze your academic
                  progress
                </p>
              </div>
              <FileInput />
            </div>
          </div>
        )}

        {hasData && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GlobalConfigBar />
            <Result />
            <DataTable />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gpa-analysis"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <GPAPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

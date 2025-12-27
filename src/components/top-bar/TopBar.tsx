import { useState } from "react";
import PopUp from "../pop-up/PopUp";
import { HelpCircle, Upload } from "lucide-react";

const TopBar = () => {
  const [popUp, setPopUp] = useState(false);

  return (
    <>
      {popUp && <PopUp setPopUp={setPopUp} />}
      <header className="bg-[#D06718] w-full sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-3">
            <h1 className="text-white text-lg md:text-xl font-bold tracking-wide">
              OUSL CREDIT CALCULATOR
            </h1>
          </div>

          <nav className="flex items-center gap-3" aria-label="Main navigation">
            <button
              onClick={() => setPopUp(true)}
              className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              aria-label="Open help dialog"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 bg-white text-[#D06718] hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
              aria-label="Upload new file"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New</span>
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default TopBar;

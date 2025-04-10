import { useState } from "react";
import PopUp from "../pop-up/PopUp";

const TopBar = () => {
    const [popUp, setPopUp] = useState(false)
    return (
        <>
            {popUp && <PopUp setPopUp={setPopUp} />}
            <div className="bg-[#D06718] w-full flex items-center justify-between px-6 py-3 shadow-md sticky top-0 z-10">
                <h1 className="text-white text-[15px] md:text-[17px] font-semibold tracking-wide">
                    OUSL CREDIT CALCULATOR
                </h1>
                {/* Optional Right Side Buttons/Icons */}
                <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-gray-200 text-sm cursor-pointer" onClick={() => setPopUp(true)}>Help</button>
                    <button
                        className="bg-white text-[#2c2c2c] px-3 py-1 rounded hover:bg-[#000] hover:text-white text-sm transition cursor-pointer"
                        onClick={() => window.location.reload()}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </>
    );
};

export default TopBar;

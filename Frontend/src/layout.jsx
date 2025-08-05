import { useState } from "react";
import { CircleUser } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import Nib from "./assets/images/NIBSlider.png";

function Layout() {
  const [activeform, setActiveForm] = useState("/");
  const [activetable, setActiveTable] = useState(" ");

  return (
    <div className="min-h-screen bg-stone-100 ">
      <div className=" flex items-center justify-between shadow-lg bg-stone-100 px-4 py-2">
        <Link to="/">
          <img src={Nib} className="w-46 h-16" />
        </Link>
        <Link to="/signup">
          <CircleUser color="#7a3b04" size={50} />
        </Link>
      </div>

      <div className="flex flex-col md:items-center md:justify-center py-8 px-4">
        <div className="flex flex-col md:flex-row justify-center mb-6">
          <Link
            to="/claimtable"
            onClick={() => setActiveTable("/claimtable")}
            className={`text-center py-3 w-full md:w-[450px] h-[40px] rounded-t-lg md:rounded-l-lg md:rounded-tr-none ${
              activetable === "/claimtable"
                ? "bg-stone-800 text-white"
                : "bg-stone-400 text-black hover:bg-stone-800 hover:text-white duration-500"
            }`}
          >
            Claims Data Table
          </Link>
          <Link
            to="/productiontable"
            onClick={() => setActiveTable("/productiontable")}
            className={`text-center py-3 w-full lg:w-[450px] h-[40px] rounded-b-lg md:rounded-r-lg md:rounded-bl-none ${
              activetable === "/productiontable"
                ? "bg-stone-800 text-white"
                : "bg-stone-200 text-black hover:bg-stone-800 hover:text-white duration-500"
            }`}
          >
            Production Data Table
          </Link>
        </div>

        {/* Step Indicator */}
        <div className="w-full lg:w-[900px] mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <Link to="/">
              <div
                onClick={() => setActiveForm("/")}
                className="flex items-center gap-2 cursor-pointer text-[17px]"
              >
               
                <p
                  className={`${
                    activeform === "/"
                      ? "text-[#7a3b04] font-semibold underline decoration-4 underline-offset-8"
                      : "text-black"
                  }`}
                >
                  Claims Data Form
                </p>
              </div>
            </Link>

            <hr className="w-full md:w-115 border-stone-400 " />

            <Link to="/production">
              <div
                onClick={() => setActiveForm("/production")}
                className="flex items-center gap-2 cursor-pointer"
              >
                
                <p
                  className={`${
                    activeform === "/production"
                      ? "text-[#7a3b04] font-semibold underline decoration-4 underline-offset-8 "
                      : "text-black"
                  }`}
                >
                  Production Data Form
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="w-full mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;

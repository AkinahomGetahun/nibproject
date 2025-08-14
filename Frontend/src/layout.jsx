import { CircleUser } from "lucide-react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Nib from "./assets/images/NIBSlider.png";
import useStore from "./store/useStore";
import api from "./api/axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function Layout() {
  const { activePath, setActivePath } = useStore();
    const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    toast.success("Logged out !", { autoClose: 1500 });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
    try {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed:", error);
      const msg =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="h-20 flex items-center justify-between shadow-lg bg-stone-100 px-4 py-2 sticky top-0">
        <Link to="/">
          <img src={Nib} className="w-60 h-20" />
        </Link>
        {/* <Link to="/logout"> */}
        <div className="flex flex-col items-center ">
          <div>
            <p className="">Hello! </p>
          </div>

          <div className="h-7 border-stone-800 border-4 hover:border-4  hover:border-[#f5a359] text-stone-900 font-semibold hover:text-stone-700 rounded-xl transition duration-700">
            <button onClick={handleLogout}>
              <p className="px-3">Logout</p>
            </button>
          </div>
        </div>
        {/* </Link> */}
      </div>

      <div className="flex flex-col md:items-center md:justify-center py-8 px-4">
        {/* Table Links */}
        <div className="w-full md:w-[700px] lg:w-[900px] mt-10">
          <div className="flex flex-col md:flex-row justify-center mb-6">
            <Link
              to="/claimtable"
              onClick={() => setActivePath("/claimtable")}
              className={`text-center py-3 w-full md:w-[450px] h-[40px] rounded-t-lg md:rounded-l-lg md:rounded-tr-none ${
                activePath === "/claimtable"
                  ? "bg-stone-800 text-gray-100 font-semibold"
                  : "bg-stone-300 text-stone-900 hover:bg-stone-800 hover:text-white duration-500 "
              }`}
            >
              Claims Data Table
            </Link>
            <Link
              to="/productiontable"
              onClick={() => setActivePath("/productiontable")}
              className={`text-center py-3 w-full md:w-[450px] h-[40px] rounded-b-lg md:rounded-r-lg md:rounded-bl-none ${
                activePath === "/productiontable"
                  ? "bg-stone-800 text-gray-100 font-semibold"
                  : "bg-stone-200 text-stone-900 hover:bg-stone-800 hover:text-white duration-500"
              }`}
            >
              Production Data Table
            </Link>
          </div>
        </div>

        {/* Form Links */}
        <div className="w-full md:w-[700px] lg:w-[900px] mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <Link to="/claim">
              <div
                onClick={() => setActivePath("/")}
                className="flex items-center gap-2 cursor-pointer text-[17px]"
              >
                <p
                  className={`${
                    activePath === "/"
                      ? "text-[#7a3b04] font-semibold underline decoration-4 underline-offset-8"
                      : "text-stone-900"
                  }`}
                >
                  Claims Data Form
                </p>
              </div>
            </Link>

            <hr className="w-full md:w-80 lg:w-115 border-stone-400 " />

            <Link to="/production">
              <div
                onClick={() => setActivePath("/production")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <p
                  className={`${
                    activePath === "/production"
                      ? "text-[#7a3b04] font-semibold underline decoration-4 underline-offset-8 "
                      : "text-stone-900"
                  }`}
                >
                  Production Data Form
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;

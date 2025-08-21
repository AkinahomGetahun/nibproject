import { ChevronDown, CircleUser } from "lucide-react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Nib from "./assets/images/NIBSlider.png";
import useStore from "./store/useStore";
import api from "./api/axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect } from "react";
function Layout() {
  const { activePath, setActivePath } = useStore();
  const [error, setError] = useState("");
  const name = useStore((state) => state.user?.name);
  const fetchUser = useStore((state) => state.fetchUser);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    setTimeout(() => {
      navigate("/");
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
      toast.success("Logged out !", { autoClose: 1500 });
    } catch (error) {
      console.error("Logout failed:", error);
      const msg =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };
  useEffect(() => {
    fetchUser();
    if (!localStorage.getItem("token")) {
        toast.error("Please login to continue", {
        autoClose: 1000,
        transition: Bounce,
      });
      navigate("/");
   
      
    }
  }, [fetchUser]);

  return (
    <div className="min-h-screen bg-stone-100 ">
      <div className="h-20 flex items-center justify-between shadow-lg bg-stone-100 px-4 py-2 sticky top-0 z-10">
        <Link to="/landingpage">
          <img src={Nib} className="w-60 h-20" />
        </Link>
        {/* <Link to="/logout"> */}
        <div className="flex  items-center ">
          <CircleUser color="#361d07" size={40} />
          <div className="flex gap-2 text-lg mt-5 mx-2">
            Hello,
            {name ? (
              <p className="text-[#8b6731] font-bold"> {name}!</p>
            ) : (
              <p>...</p>
            )}
          </div>
          <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex  rounded-md  px-3  shadow-xs outline-none ">
              <ChevronDown
                size={30}
                className="-mr-1 mt-2 text-gray-800 hover:text-[#f6b06f] font-bold"
              />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 w-26 h-12 font-bold bg-[#f7c9a0] text-stone-900 origin-top-right rounded-b-md  shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <button onClick={handleLogout}>
                  <MenuItem className=" px-4 py-2 text-md text-gray-700 data-focus:text-gray-900 data-focus:outline-hidden">
                    <p className="px-3">Logout</p>
                  </MenuItem>
                </button>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>

      <div className="flex flex-col md:items-center md:justify-center py-8 px-4">
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
                      ? "text-[#7a3b04]  font-semibold underline decoration-4 underline-offset-8"
                      : "text-stone-900 hover:text-[#7a3b04] transition duration-300"
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
                      : "text-stone-900 hover:text-[#7a3b04] transition duration-300"
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

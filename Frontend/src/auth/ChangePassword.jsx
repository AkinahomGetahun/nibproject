import { useState } from "react";
import {
  CircleUser,
  EyeOff,
  EyeIcon,
  KeySquare,
  LockKeyhole,
} from "lucide-react";
import Nib from "../assets/images/NIBSlider.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";
function ChangePassword() {
  const [temporarypassword, setTemporaryPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [newpassword_confirmation, setConfirmPassword] = useState("");
  const [showtemppass, setShowTempPass] = useState(false);
  const [shownewpass, setShowNewPass] = useState(false);
  const [showconfirmpass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const handlePassword ()=>{

  //  }
  const [form, setForm] = useState({
    temporarypassword: "",
    newpassword: "",
    newpassword_confirmation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/changepassword",
        {
          temporarypassword,
          newpassword,
          newpassword_confirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
            withCredentials: true 

        }
      );

      const { access_token, user } = response.data;

      localStorage.setItem("token", access_token);

      toast.success("Changed Password!", { autoClose: 1500 });

      setTimeout(() => {
        navigate("/");
      }, 1600);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Changing password failed. Please try again.";
      setError(msg);
      console.error(" error:", err);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        transition={Bounce}
        pauseOnHover
        draggable
      />

      <div className="flex flex-col-2 items-center justify-between shadow-lg rounded-10 bg-stone-100">
        <Link to="/">
          <img src={Nib} className="w-70 h-20" />
        </Link>
        <Link to="/signup">
          <CircleUser color="#0e0702ff" size={45} className="mx-20" />
        </Link>
      </div>

      <div className="items-center justify-center flex flex-col py-30">
        <div className="bg-stone-900 sm:w-[400px] h-[350px] items-center justify-center flex flex-col gap-8">
          <p className="text-white text-2xl font-bold">Change Password</p>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex flex-col gap-5">
                {/* <EyeOff color="white"/>  */}
                <div className="relative sm:px-0 px-4 justify-between">
                  <span className="absolute inset-y-0 left-6 sm:left-2 flex items-center">
                    <KeySquare className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    type={showtemppass ? "text" : "password"}
                    className="placeholder:text-sm bg-stone-200 rounded-lg h-7 sm:w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    value={temporarypassword}
                    onChange={(e) => setTemporaryPassword(e.target.value)}
                    placeholder="Temporary password"
                    required
                  />
                  <span
                    onClick={() => setShowTempPass(!showtemppass)}
                    className="absolute inset-y-0 left-60 sm:left-52 flex items-center cursor-pointer"
                  >
                    {showtemppass ? (
                      <EyeIcon className="text-gray-600 w-4 h-4" />
                    ) : (
                      <EyeOff className="text-gray-600 w-4 h-4" />
                    )}
                  </span>
                </div>

                <div className="relative sm:px-0 px-4">
                  <span className="absolute inset-y-0 left-6 sm:left-2 flex items-center">
                    <LockKeyhole className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    type={shownewpass ? "text" : "password"}
                    className="placeholder:text-sm bg-stone-200 rounded-lg h-7 sm:w-60 px-8.5 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    required
                  />
                  <span
                    onClick={() => setShowNewPass(!shownewpass)}
                    className="absolute inset-y-0 left-60 sm:left-52 flex items-center cursor-pointer"
                  >
                    {shownewpass ? (
                      <EyeIcon className="text-gray-600 w-4 h-4" />
                    ) : (
                      <EyeOff className="text-gray-600 w-4 h-4" />
                    )}
                  </span>
                </div>
                <div className="relative sm:px-0 px-4">
                  <span className="absolute inset-y-0 left-6 sm:left-2 flex items-center">
                    <LockKeyhole className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    type={showconfirmpass ? "text" : "password"}
                    name="newpassword_confirmation"
                    value={newpassword_confirmation}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="placeholder:text-sm bg-stone-200 rounded-lg h-7 sm:w-60 px-8.5 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    required
                  />
                  <span
                    onClick={() => setShowConfirmPass(!showconfirmpass)}
                    className="absolute inset-y-0 left-60 sm:left-52 flex items-center cursor-pointer"
                  >
                    {showconfirmpass ? (
                      <EyeIcon className="text-gray-600 w-4 h-4" />
                    ) : (
                      <EyeOff className="text-gray-600 w-4 h-4" />
                    )}
                  </span>
                </div>
              </div>

              <div className="border-2 border-[#f5a359] w-[150px] h-[30px] rounded-2xl hover:bg-[#f5a359] duration-300 mt-8 mx-auto">
                <button type="submit" className="w-full h-full">
                  <p className="text-white hover:text-stone-900 py-1 text-md duration-300">
                    ok
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;

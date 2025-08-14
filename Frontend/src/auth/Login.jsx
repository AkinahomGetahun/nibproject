import { useState } from "react";
import { CircleUser, EyeOff, EyeIcon, LockKeyhole, Mail } from "lucide-react";
import Nib from "../assets/images/NIBSlider.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showpass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { access_token, user } = response.data;
      localStorage.setItem("token", access_token);

      toast.success("Logged in successfully!", { autoClose: 1500 });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
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
        <img src={Nib} className="w-70 h-20" />

        <Link to="/login">
          <CircleUser color="#0e0702ff" size={45} className="mx-20" />
        </Link>
      </div>

      <div className="items-center justify-center flex flex-col py-30">
        <div className="bg-[#f5a359] sm:w-[400px] h-[170px] rounded-t-[40px] items-center justify-center flex flex-col text-stone-900 ">
          <p className="text-xl sm:text-2xl font-bold ">WELCOME BACK!</p>
          <p className="w-72  sm:w-50 text-center sm:text-[17px] text-[15px]">
            Please login with your personal account.
          </p>
        </div>

        <div className="bg-stone-900 sm:w-[400px] h-[350px] items-center justify-center flex flex-col gap-8">
          <p className="text-white text-2xl font-bold">SIGN IN</p>
          <form onSubmit={handleLogin}>
            <div>
              <div className="flex flex-col gap-5">
                <div className="relative sm:px-0 px-4">
                  <span className="absolute inset-y-0 left-6 sm:left-2 flex items-center">
                    <Mail className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    className="placeholder:text-sm bg-stone-200 rounded-lg h-7 sm:w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="relative sm:px-0 px-4">
                  <span className="absolute inset-y-0 left-6 sm:left-2 flex items-center">
                    <LockKeyhole className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    type={showpass ? "text" : "password"}
                    className="placeholder:text-sm bg-stone-200 rounded-lg h-7 sm:w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <span
                    onClick={() => setShowPass(!showpass)}
                    className="absolute inset-y-0 left-60 sm:left-52 flex items-center cursor-pointer"
                  >
                    {showpass ? (
                      <EyeIcon className="text-gray-600 w-4 h-4" />
                    ) : (
                      <EyeOff className="text-gray-600 w-4 h-4" />
                    )}
                  </span>
                </div>
              </div>

              <div className="border-2 border-[#f5a359] w-[150px] h-[30px] rounded-2xl hover:bg-[#f5a359] duration-300 mt-8 mx-auto">
                <button type="submit" className="w-full h-full">
                  <p className="text-white hover:text-stone-900 py-1 text-md duration-300 font-semibold">
                    Log in
                  </p>
                </button>
              </div>
              <div className="flex gap-2 py-4">
                <p className="text-sm text-stone-300">Don't have an account?</p>
                <Link to="/signup">
                  <p className="text-sm text-stone-100 hover:text-[#f5a359] underline">
                    Sign Up
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import {
  CircleUser,
  Mail,
  LockKeyhole,
  UserRound,
  EyeIcon,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nib from "../assets/images/NIBSlider.png";
import api from "../api/axios";

function SignUp() {
  const [showpass, setShowPass] = useState(false);
  const [showconfirmpass, setShowConfirmPass] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // console.log("Signup form data:", form);

    try {
      const res = await api.post("/signup", form);
      localStorage.setItem("token", res.data.access_token);
      toast.success("Registration successful!");
      setForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="">
        <div className="flex flex-col-2 items-center justify-between shadow-lg rounded-10 bg-stone-100">
         
            <img src={Nib} className="w-70 h-20" alt="Logo" />
          
          <Link to="/signup">
            <CircleUser color="#0e0702ff" size={45} className="mx-20" />
          </Link>
        </div>
        <div className="items-center justify-center flex-col flex py-15 ">
          <div className="bg-stone-900 sm:w-[400px] h-[180px]  rounded-t-[40px] items-center justify-center flex flex-col text-gray-200 ">
            <p className="text-2xl font-bold">Hello!</p>
            <p>Enter your personal details</p>
            <div className="flex gap-4">
              <p className="text-sm text-gray-400">Already have an account?</p>
              <Link to="/login">
                <p className="text-sm text-gray-100 hover:text-[#f5a359] underline">
                  Log In
                </p>
              </Link>
            </div>
          </div>
          <div className="bg-[#f5a359] sm:w-[400px] h-[400px] items-center justify-center flex flex-col gap-6">
            <p className="text-stone-900 text-2xl font-bold ">
              CREATE AN ACCOUNT
            </p>
            <form onSubmit={handleSignup}>
              <div className="flex flex-col gap-5 w-[230px]">
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center">
                    <UserRound className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    name="name"
                    type="text"
                    className="placeholder:text-sm bg-stone-200 rounded-lg h-7 w-60 px-8 focus:outline-stone-700 focus:outline-1 focus:outline-offset-2"
                    onChange={handleChange}
                    value={form.name}
                    required
                    placeholder="Full Name"
                  />
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center">
                    <Mail className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    name="email"
                    type="email"
                    className="placeholder:text-sm bg-stone-200 rounded-lg h-7 w-60 px-8 focus:outline-stone-700 focus:outline-1 focus:outline-offset-2"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center">
                    <LockKeyhole className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    name="password"
                    type={showpass ? "text" : "password"}
                    className="placeholder:text-sm bg-stone-200 rounded-lg h-7 w-60 px-8 focus:outline-stone-700 focus:outline-1 focus:outline-offset-2"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
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

                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center">
                    <LockKeyhole className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    name="password_confirmation"
                    type={showconfirmpass ? "text" : "password"}
                    className="placeholder:text-sm bg-stone-200 rounded-lg h-7 w-60 px-8 focus:outline-stone-700 focus:outline-1 focus:outline-offset-2"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    required
                    placeholder="Confirm Password"
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
              <div className="bg-stone-900 text-stone-100 border-2 border-[#f5a359] w-[150px] h-[30px] rounded-2xl hover:bg-stone-800 hover:text-[#f5a359] hover:fontsemibold duration-300 mx-auto mt-8 ">
                <button type="submit">
                  <p className=" rounded-xl py-1 text-md px-10 duration-300 font-semibold">
                    Register
                  </p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

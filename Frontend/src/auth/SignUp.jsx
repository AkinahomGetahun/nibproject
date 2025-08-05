import { useState } from "react";
import { CircleUser, Mail, LockKeyhole, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nib from "../assets/images/NIBSlider.png";

function SignUp() {
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

    console.log("Signup form data:", form);

    try {
      const res = await axios.post("http://localhost:8000/api/signup", form);
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
          <Link to="/">
            <img src={Nib} className="w-70 h-20" alt="Logo" />
          </Link>
          <Link to="/signup">
            <CircleUser color="#0e0702ff" size={45} className="mx-20" />
          </Link>
        </div>
        <div className="items-center justify-center flex py-30">
          <div className="bg-[#f5a359] w-[350px] h-[500px] rounded-l-[40px] items-center justify-center flex flex-col text-stone-900 ">
            <p className="text-2xl font-bold">Hello!</p>
            <p>Enter your personal details</p>
            <p className="text-sm text-stone-700">Already have an account?</p>
            <div className="py-9">
              <Link to="/login">
                <button className="bg-stone-900 hover:border hover:border-stone-800 hover:bg-[#f5a359] hover:border-2 w-45 rounded-xl h-8 duration-300 ">
                  <p className="text-white hover:text-stone-900 py-2">
                    {" "}
                    Log In
                  </p>
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-stone-900 w-[400px] h-[500px]  items-center justify-center flex flex-col gap-6">
            <p className="text-white text-2xl font-bold ">CREATE AN ACCOUNT</p>
            {error && <p className="text-red-500 text-sm ">{error}</p>}
            <form onSubmit={handleSignup}>
              <div className="flex flex-col gap-5 w-[230px]">
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center">
                    <UserRound className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    name="name"
                    type="text"
                    className="bg-stone-200 rounded-lg h-7 w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
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
                    className="bg-stone-200 rounded-lg h-7 w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
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
                    type="password"
                    className="bg-stone-200 rounded-lg h-7 w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                  />
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center">
                    <LockKeyhole className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    name="password_confirmation"
                    type="password"
                    className="bg-stone-200 rounded-lg h-7 w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    required
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="border-2 border-[#f5a359] w-[150px] h-[30px] rounded-2xl hover:bg-[#f5a359] duration-300 mx-auto mt-8 ">
                <button type="submit">
                  <p className="text-white hover:text-stone-900 py-1 text-md px-10 duration-300 ">
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

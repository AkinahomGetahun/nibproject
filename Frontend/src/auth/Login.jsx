import { useState } from "react";
import { CircleUser, LockKeyhole, Mail } from "lucide-react";
import Nib from "../assets/images/NIBSlider.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { access_token, user } = response.data;
      localStorage.setItem("token", access_token);

      toast.success("Logged in successfully!", { autoClose: 2000 });

      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
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
        <Link to="/">
          <img src={Nib} className="w-70 h-20" />
        </Link>
        <Link to="/signup">
          <CircleUser color="#0e0702ff" size={45} className="mx-20" />
        </Link>
      </div>

      <div className="items-center justify-center flex flex-col py-30">
        <div className="bg-[#f5a359] sm:w-[400px] h-[150px] rounded-t-[40px] items-center justify-center flex flex-col text-stone-900">
          <p className="text-xl sm:text-2xl font-bold ">WELCOME BACK!</p>
          <p className="w-72  sm:w-50 text-center sm:text-[17px] text-[15px]">Please login with your personal account.</p>
          {/* <p className="text-sm text-stone-700">Don't have an account?</p> */}
          {/* <div className="py-9">
            <Link to="/signup">
              <button className="bg-stone-900 hover:border hover:border-stone-800 hover:bg-[#f5a359] hover:border-2 w-45 rounded-xl h-8 duration-300">
                <p className="text-white hover:text-stone-900 py-2"> Sign Up</p>
              </button>
            </Link>
          </div> */}
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
                    className="bg-stone-200 rounded-lg h-7 sm:w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative sm:px-0 px-4">
                  <span className="absolute inset-y-0 left-6 sm:left-2 flex items-center">
                    <LockKeyhole className="text-gray-800 w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    className="bg-stone-200 rounded-lg h-7 sm:w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="border-2 border-[#f5a359] w-[150px] h-[30px] rounded-2xl hover:bg-[#f5a359] duration-300 mt-8 mx-auto">
                <button type="submit" className="w-full h-full">
                  <p className="text-white hover:text-stone-900 py-1 text-md duration-300">
                    Log in
                  </p>
                </button>
              </div>

              {/* {error && <p className="text-red-400 mt-4">{error}</p>} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

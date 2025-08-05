import { useState } from "react";
import { CircleUser, LockKeyhole } from "lucide-react";
import Nib from "../assets/images/NIBSlider.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:8000/api/login", {
//         email,
//         password,
//       });

//       const { access_token, user } = response.data;
//       localStorage.setItem("token", access_token);

//       toast.success("Logged in successfully!", { autoClose: 2000 });

//       setTimeout(() => {
//         navigate("/"); 
//       }, 2000);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Login failed. Please try again.";
//       setError(msg);
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

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
          <form>
            <div>
              <div className="flex flex-col gap-5">
               <div className="relative sm:px-0 px-4">
                  <span className="absolute inset-y-0 left-6 sm:left-2 flex items-center">
                    {/* <LockKeyhole className="text-gray-800 w-4 h-4" /> */}
                  </span>
                  <input
                    type="password"
                    className="bg-stone-200 rounded-lg h-7 sm:w-60 px-8 focus:outline-[#f5a359] focus:outline-1 focus:outline-offset-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Temporary password"
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
                    placeholder="new password"
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
                    placeholder="confirm password"
                    required
                  />
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

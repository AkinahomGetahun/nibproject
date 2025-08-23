import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

function claim() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branch: " ",
    claimnumber: " ",
    policyclass: " ",
    policynumber: " ",
    totalclaimspaid: " ",
    coinsurerrecovery: " ",
    facrecovery: " ",
    salvage: " ",
    totalrecovery: "",
    insured: " ",
    dateofloss: " ",
    treatyrecovery: "",
    notificationdate: " ",
    regdate: " ",
    dateclaimpaid: "",
    descriptionofloss: " ",
    risktype: "",
    agency: "",
  });
  const [error, setError] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/create-claims-data", formData);
      console.log(response);

      toast.success("Submitted Claims Data Successfully!");
      setTimeout(() => {
        navigate("/claimtable");
      }, 2500);
    } catch (error) {
      console.error("Error submitting claim:", error);

      let message =
        "Something went wrong while submitting. Please try again later.";

      if (error.response) {
        // Check if backend provides a specific error message
        const backendMessage = error.response.data?.message;

        if (typeof backendMessage === "string") {
          // Use it only if it's a simple string
          message = backendMessage;
        }
        if (message.length > 200) {
          message = "An error occurred. Please check your input and try again.";
        } else if (Array.isArray(backendMessage)) {
          // If it's a list of messages, use the first one
          message = backendMessage[0] || message;
        } else if (typeof error.response.data === "string") {
          // Sometimes the error is sent directly as a string
          message = error.response.data;
        }
      }

      toast.error(message);
    }

    console.log(formData);
  };

  return (
    <div className=" flex flex-col items-center justify-center lg:w-[1000px] border-2 border-stone-200  mx-auto rounded-md bg-stone-50 ">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between py-6">
            <div>
              <h1 className="text-[23px] underline px-3 lg:px-0">
                Claims Data Form
              </h1>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:px-0 px-3 gap-x-25 gap-y-8 items-center justify-center ">
            <div className=" flex flex-col gap-3">
              <label>Branch</label>
              <input
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                type="text"
                className="bg-gray-100 rounded-md outline-none px-2  border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3 text-[#1e1408] text-bold">
              <label>Claim Number </label>
              <input
                type="text"
                placeholder="Claims/270222/EN/002"
                name="claimnumber"
                value={formData.claimnumber}
                onChange={handleChange}
                className="h-[35px] bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731]"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Policy Class </label>
              <input
                type="text"
                name="policyclass"
                value={formData.policyclass}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>{" "}
            <div className=" flex flex-col gap-3">
              <label>Policy Number</label>
              <input
                type="text"
                name="policynumber"
                value={formData.policynumber}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>{" "}
            <div className=" flex flex-col gap-3">
              <label>Total Claims Paid</label>
              <input
                type="text"
                name="totalclaimspaid"
                value={formData.totalclaimspaid}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>Treaty Recovery</label>
              <input
                type="text"
                name="treatyrecovery"
                value={formData.treatyrecovery}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Co-insurer Recovery </label>
              <input
                type="text"
                name="coinsurerrecovery"
                value={formData.coinsurerrecovery}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>FAC Recovery </label>
              <input
                type="text"
                name="facrecovery"
                value={formData.facrecovery}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Salvage</label>
              <input
                type="text"
                name="salvage"
                value={formData.salvage}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>Total Recovery</label>
              <input
                type="text"
                name="totalrecovery"
                value={formData.totalrecovery}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>Insured</label>
              <input
                type="date"
                name="insured"
                value={formData.insured}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>Date of Loss</label>
              <input
                type="date"
                placeholder="select"
                name="dateofloss"
                value={formData.dateofloss}
                onChange={handleChange}
                className="bg-gray-100 placeholder-gray-50 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            {/* </div> */}
            {/* <div className=" flex flex-col gap-5 mt-4"> */}
            <div className=" flex flex-col gap-3 ">
              <label>Agency</label>
              <input
                type="text"
                name="agency"
                value={formData.agency}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>Notification Date</label>
              <input
                type="date"
                name="notificationdate"
                value={formData.notificationdate}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>Reg Date</label>
              <input
                type="date"
                name="regdate"
                value={formData.regdate}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>Date Claim Paid</label>
              <input
                type="date"
                name="dateclaimpaid"
                value={formData.dateclaimpaid}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px] "
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>Risk type</label>
              <input
                type="text"
                name="risktype"
                value={formData.risktype}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label>Description of loss</label>
              <textarea
                type="text"
                name="descriptionofloss"
                value={formData.descriptionofloss}
                onChange={handleChange}
                className="bg-gray-100 rounded-md outline-none px-2 py-2 border-2 border-[#8b6731] h-[80px] text-wrap"
              />
            </div>
            {/* </div> */}
          </div>
          <div className="w-[100px] h-[30px] text-center text-stone-750 mx-3 py-1 rounded-xl mt-9 mb-8 bg-stone-900 text-white font-semibold hover:text-[#f5a359] hover:bg-stone-800 duration-300">
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Bounce}
              toastClassName="custom-toast"
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default claim;

// bg-gradient-to-tr from-amber-100 via-amber-50 to-amber-100 h-scree

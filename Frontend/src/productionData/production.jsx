import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

function production() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branchcode: " ",
    processingdate: " ",
    clientname: " ",
    policynumber: " ",
    agentname: " ",
    effectivedate: " ",
    enddate: " ",
    suminsured: " ",
    totpremium: " ",
    totcommission: " ",
    netpremium: " ",
    totvat: " ",
    salesperson: "",
    naicom: " ",
    transactiontype: "",
    channel: " ",
    policytype: " ",
    currency: "",
  });
  const [error, setError] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/create-production-data", formData);
      console.log(response);

      toast.success("Submitted Production Data Successfully!");
      setTimeout(() => {
        navigate("/productiontable");
      }, 3500);
    } catch (error) {
     console.error("Error submitting claim:", error);

      let message =
        "Something went wrong while submitting. Please try again later.";

      if (error.response) {
        const backendMessage = error.response.data?.message;

        if (typeof backendMessage === "string") {
          message = backendMessage;
        }
        if (message.length > 200) {
          message = "An error occurred. Please check your input and try again.";
        } else if (Array.isArray(backendMessage)) {
          message = backendMessage[0] || message;
        } else if (typeof error.response.data === "string") {

          message = error.response.data;
        }
      }

      toast.error(message);
    
    }

    console.log(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center lg:w-[1000px] border-2 border-stone-200 mx-auto rounded-md bg-stone-50 bottom-10">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="sm:flex justify-between py-6">
            <div>
              <h1 className="text-[23px] underline px-3 lg:px-0">Production Data Form</h1>
            </div>
            <Menu as="div" className="relative inline-block">
              <MenuButton className="inline-flex gap-x-22 rounded-md bg-stone-100  px-3 py-2 text-sm text-stone-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-stone-50">
                DropDown
                <ChevronDown className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  <Link to="/production">
                    <MenuItem className=" px-4 py-2 text-md text-gray-700 data-focus:bg-[#f7c9a0] data-focus:text-gray-900 data-focus:outline-hidden">
                      <p>form 1</p>
                    </MenuItem>
                  </Link>
                  <MenuItem className=" px-4 py-2 text-md text-gray-700 data-focus:bg-[#f7c9a0] data-focus:text-gray-900 data-focus:outline-hidden">
                    <p>form 2</p>
                  </MenuItem>
                  <MenuItem className=" px-4 py-2 text-md text-gray-700 data-focus:bg-[#f7c9a0] data-focus:text-gray-900 data-focus:outline-hidden">
                    <p>form 3</p>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:px-0 px-3 gap-x-25 gap-y-8 items-center justify-center py-6 ">
            {/* <div className=" lg:w-70 flex flex-col gap-5 text-stone-800 "> */}
              <div className="flex flex-col gap-3 ">
                <label>Branch Code</label>
                <input
                  type="text"
                  name="branchcode"
                  value={formData.branchcode}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2  border-2 border-[#8b6731] h-[35px] "
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Processing Date</label>
                <input
                  type="date"
                  name="processingdate"
                  value={formData.processingdate}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2  border-2 border-[#8b6731] h-[35px] "
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <label>Policy Number</label>
                <input
                  type="text"
                  name="policynumber"
                  value={formData.policynumber}
                  onChange={handleChange}
                  className="h-[35px] bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Client Name</label>
                <input
                  type="text"
                  name="clientname"
                  value={formData.clientname}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Broker / Sales Agent</label>
                <input
                  type="text"
                  name="agentname"
                  value={formData.agentname}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Effective Date </label>
                <input
                  type="date"
                  name="effectivedate"
                  value={formData.effectivedate}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
            {/* </div> */}

            {/* <div className="lg:w-70 flex flex-col gap-5 text-stone-800"> */}
              <div className="flex flex-col gap-3">
                <label>End Date</label>
                <input
                  type="date"
                  name="enddate"
                  value={formData.enddate}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Sum Insured</label>
                <input
                  type="text"
                  name="suminsured"
                  value={formData.suminsured}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Tot Premium</label>
                <input
                  type="text"
                  name="totpremium"
                  value={formData.totpremium}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Tot Commission</label>
                <input
                  type="text"
                  name="totcommission"
                  value={formData.totcommission}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Net Premium</label>
                <input
                  type="text"
                  name="netpremium"
                  value={formData.netpremium}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Tot Vat on Commision</label>
                <input
                  type="text"
                  name="totvat"
                  value={formData.totvat}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
            {/* </div> */}
            {/* <div className="lg:w-70 flex flex-col gap-5 text-stone-800 "> */}
              {/* delete after removing it from db */}
              <div className="flex flex-col gap-3">
                <label>Sales Person</label>
                <input
                  type="text"
                  name="salesperson"
                  value={formData.salesperson}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>NAICOM Class of Business</label>
                <input
                  type="text"
                  name="naicom"
                  value={formData.naicom}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Transcation Type</label>
                <input
                  type="text"
                  name="transactiontype"
                  value={formData.transactiontype}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Channel</label>
                <input
                  type="text"
                  name="channel"
                  value={formData.channel}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px] "
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Policy Type</label>
                <input
                  type="text"
                  name="policytype"
                  value={formData.policytype}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>

              {/* might delete */}
              <div className="flex flex-col gap-3 ">
                <label>Currency</label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
            {/* </div> */}
          </div>
          <div className="w-[100px] h-[30px] text-center text-stone-750 mx-3 py-1 rounded-xl bg-stone-900 text-white font-semibold hover:text-[#f5a359] hover:bg-stone-800 mt-9 mb-8 duration-300">
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
            />{" "}
            <button type="submit" >Submit</button> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default production;

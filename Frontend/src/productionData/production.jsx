import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Pointer } from "lucide-react";

function production() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSourceChange = (e) => {
    setSource(e.target.value);
    setName("");
    setRate("");
  };

  //  const handleSourceSubmit = () => {
  //   if (!source || !name || !rate) {
  //     alert("Please fill source of business.");
  //     return;
  //   }

  //   const newEntry = {
  //     sourceofbusiness: `${source}, ${name}`,
  //     rate,
  //   };

  //   setEntries((prev) => [...prev, newEntry]);

  //   setSource("");
  //   setName("");
  //   setRate("");
  // };

  const [formData, setFormData] = useState({
    branchcode: " ",
    nameofinsured: " ",
    policynumber: " ",
    effectivedate: " ",
    enddate: " ",
    suminsured: " ",
    premiumamount: " ",
    commissionamount: " ",
    retainedpremium: " ",
    naicom: " ",
    reciept: "",
    rate: " ",
    source: "",
    name: "",
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
      console.error("Error submitting production:", error);

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
              <h1 className="text-[23px] underline px-3 lg:px-0">
                Production Data Form
              </h1>
            </div>
          </div>
          {/* <div className=" lg:w-70 flex flex-col gap-5 text-stone-800 "> */}
          <div className="">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:px-0 px-3 gap-x-25 gap-y-8 items-center justify-center py-6 ">
              <div className="grid grid-col gap-7">
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
                  <label>Reciept Number</label>
                  <input
                    type="text"
                    name="reciept"
                    value={formData.reciept}
                    onChange={handleChange}
                    className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px] "
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label> Name of insured</label>
                  <input
                    type="text"
                    name="nameofinsured"
                    value={formData.nameofinsured}
                    onChange={handleChange}
                    className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                  />
                </div>
              </div>

              <div className="grid grid-col gap-6">
                <div className="flex flex-col gap-3">
                  <label> Class of Business</label>
                  <input
                    type="text"
                    name="naicom"
                    value={formData.naicom}
                    onChange={handleChange}
                    className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
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
                <label className="font-semibold text-stone-800">
                  Transaction Type Status:
                </label>

                <select
                  name="transactiontype"
                  value={formData.transactiontype}
                  onChange={handleChange}
                  className="w-35 bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                >
                  <option value="" selected disabled>
                    Select Status
                  </option>

                  <option value="New">New</option>
                  <option value="Renewal">Renewal</option>
                </select>
              </div>
              <div className="grid grid-col grid-rows-2 gap-9">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-stone-900">Policy Period:</p>

                  <label>Effective Date </label>
                  <input
                    type="date"
                    name="effectivedate"
                    value={formData.effectivedate}
                    onChange={handleChange}
                    className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                  />
                </div>
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
              </div>
            </div>
            <hr className="lg:w-[800px] text-stone-200 items-center justify-center px-7 mt-9" />
            <hr className="lg:w-[800px] text-stone-200  items-center justify-center px-7  " />
            <p className=" text-stone-900 font-semibold py-7">
              Source of Business
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:px-0 px-3 gap-x-15 gap-y-8 items-center justify-center ">
              <div className="grid  gap-9">
                <div className="gap-6 flex ">
                  <input
                    type="radio"
                    id="direct"
                    name="source"
                    value="Direct"
                    checked={source === "Direct"}
                    onChange={handleSourceChange}
                  />
                  <label htmlFor="direct" className="font-semibold">
                    Direct
                  </label>
                </div>
                <div className="grid grid-col gap-7">
                  <div className="flex flex-col  gap-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={source === "Direct" ? name : "-"}
                      onChange={(e) => setName(e.target.value)}
                      disabled={source !== "Direct"}
                      className={`bg-gray-100 rounded-md outline-none px-2 h-[35px]
              border-2 
              ${source === "Direct" ? "border-[#8b6731]" : "border-stone-400"}`}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      name="rate"
                      placeholder="Rate"
                      value={source === "Direct" ? rate : "-"}
                      onChange={(e) => setRate(e.target.value)}
                      disabled={source !== "Direct"}
                      className={`bg-gray-100 rounded-md outline-none px-2 h-[35px]
              border-2 
              ${
                source === "Direct"
                  ? "border-[#8b6731] transition"
                  : "border-stone-400"
              }`}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-9">
                <div className="gap-6 flex ">
                  <input
                    type="radio"
                    id="sales"
                    name="source"
                    value="Sales Agent"
                    checked={source === "Sales Agent"}
                    onChange={handleSourceChange}
                  />
                  <label htmlFor="sales" className="font-semibold">
                    Sales Agent
                  </label>
                </div>
                <div className="grid grid-col gap-7">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={source === "Sales Agent" ? name : "-"}
                    onChange={(e) => setName(e.target.value)}
                    disabled={source !== "Sales Agent"}
                    className={`bg-gray-100 rounded-md outline-none px-2 h-[35px]
              border-2 
              ${
                source === "Sales Agent"
                  ? "border-[#8b6731]"
                  : "border-stone-400"
              }`}
                  />
                  <input
                    type="text"
                    name="rate"
                    placeholder="Rate"
                    value={source === "Sales Agent" ? rate : "-"}
                    onChange={(e) => setRate(e.target.value)}
                    disabled={source !== "Sales Agent"}
                    className={`bg-gray-100 rounded-md outline-none px-2 h-[35px]
              border-2 
              ${
                source === "Sales Agent"
                  ? "border-[#8b6731] transition"
                  : "border-stone-400"
              }`}
                  />
                </div>
              </div>
              <div className="grid gap-9">
                <div className="gap-6 flex ">
                  <input
                    type="radio"
                    id="broker"
                    name="source"
                    value="Broker"
                    checked={source === "Broker"}
                    onChange={handleSourceChange}
                  />
                  <label htmlFor="broker" className="font-semibold">
                    Broker
                  </label>
                </div>
                <div className="grid grid-col gap-7">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={source === "Broker" ? name : "-"}
                    onChange={(e) => setName(e.target.value)}
                    disabled={source !== "Broker"}
                    className={`bg-gray-100 rounded-md outline-none px-2 h-[35px]
              border-2 
              ${source === "Broker" ? "border-[#8b6731]" : "border-stone-400"}`}
                  />
                  <input
                    type="text"
                    name="rate"
                    placeholder="Rate"
                    value={source === "Broker" ? rate : "-"}
                    onChange={(e) => setRate(e.target.value)}
                    disabled={source !== "Broker"}
                    className={`bg-gray-100 rounded-md outline-none px-2 h-[35px]
              border-2 
              ${
                source === "Broker"
                  ? "border-[#8b6731] transition"
                  : "border-stone-400"
              }`}
                  />
                </div>
              </div>
              {/* <div
                className="bg-stone-300 h-8 w-15 rounded-xl text-white"
                onClick={handleSourceSubmit}
                cursor:Pointer
              >
                Enter
              </div> */}
            </div>
            <hr className="lg:w-[800px] text-stone-200 items-center justify-center px-7 mt-9" />
            <hr className="lg:w-[800px] text-stone-200  items-center justify-center px-7  " />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:px-0 px-3 gap-x-15 gap-y-8 items-center justify-center py-8 ">
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
                <label> Premium Amount</label>
                <input
                  type="text"
                  name="premiumamount"
                  value={formData.premiumamount}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Commission Amount</label>
                <input
                  type="text"
                  name="commissionamount"
                  value={formData.commissionamount}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Retained Premium</label>
                <input
                  type="text"
                  name="retainedpremium"
                  value={formData.retainedpremium}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md outline-none px-2 border-2 border-[#8b6731] h-[35px]"
                />
              </div>
            </div>
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
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default production;

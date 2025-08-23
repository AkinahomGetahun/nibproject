import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function ProductionDataEdit() {
  const navigate = useNavigate();
  const sources = ["Direct", "Sales Agent", "Broker"];
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

  const { id } = useParams();
  useEffect(() => {
    getProductionbyid();
  }, []);
  const getProductionbyid = async () => {
    const response = await api.post(`/production-by-id/${id}`);
    setFormData({
      branchcode: response.data.branchcode || " ",
      policynumber: response.data.policynumber || " ",
      nameofinsured: response.data.nameofinsured || " ",
      effectivedate: response.data.effectivedate || " ",
      enddate: response.data.enddate || " ",
      suminsured: response.data.suminsured || " ",
      premiumamount: response.data.premiumamount || "",
      commissionamount: response.data.commissionamount || " ",
      retainedpremium: response.data.retainedpremium || "",
      naicom: response.data.naicom || " ",
      transactiontype: response.data.transactiontype || "",
      reciept: response.data.reciept || "",
      rate: response.data.rate || " ",
      source: response.data.source || "",
      name: response.data.name || "",
      id: id,
    });
  };
  const handleSourceChange = (src) => {
    setFormData((prev) => ({
      ...prev,
      source: src,
      name: "", 
      rate: "", 
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/edit-production-data`, formData);
      console.log(response);
      toast.success("Updated Production Data Successfully!");
      setTimeout(() => {
        navigate("/productiontable");
      }, 2000);
    } catch (error) {
      console.log(error);

      const message =
        error.response?.data?.message || "Something went wrong while updating.";

      toast.error(message);
    }

    console.log(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center lg:w-[1000px] border-2 border-stone-200 mx-auto rounded-md bg-stone-50 bottom-10">
      <div className="">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[23px] underline py-5">Edit Production Data </h1>
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
              {sources.map((src) => (
                <div key={src} className="grid gap-9">
                  <div className="flex gap-6 items-center">
                    <input
                      type="radio"
                      id={src}
                      value={src}
                      checked={formData.source === src}
                      onChange={() => handleSourceChange(src)}
                    />
                    <label htmlFor={src}>{src}</label>
                  </div>

                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.source === src ? formData.name : ""}
                    onChange={handleChange}
                    disabled={formData.source !== src}
                    className={`bg-gray-100 rounded-md outline-none px-2 h-[35px]
              border-2 
              ${formData.source === src ? "border-[#8b6731] " : "border-stone-400"}`}
                  />

                  <input
                    type="text"
                    name="rate"
                    placeholder="rate (0.15)"
                    value={formData.source === src ? formData.rate : ""}
                    onChange={handleChange}
                    disabled={formData.source !== src}
                    className={`bg-gray-100 rounded-md outline-none px-2 h-[35px]
              border-2 
              ${formData.source === src ? "border-[#8b6731] transition" : "border-stone-400"}`}
                  />
                </div>
              ))}
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
          <div className="w-[100px] h-[30px] text-center text-stone-750  py-1 rounded-xl bg-[#fc973f] mt-9 mb-8 hover:bg-stone-900 hover:text-gray-200 duration-300">
            <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Bounce}
            />{" "}
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductionDataEdit;

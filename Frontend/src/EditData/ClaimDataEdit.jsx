import { useState } from "react";
import { ToastContainer, toast,Bounce } from "react-toastify";
function ClaimDataEdit() {
  const notify = () => toast("Submitted Claim Data Successfully!");
  return (
    <div className="flex flex-col items-center justify-center  border-2 border-stone-200 lg:w-[1200px] mx-auto rounded-md bg-stone-50 ">
      <div className="">
        <form>
          <h1 className="text-[23px] underline py-6">Edit Claims Data </h1>
          <div className="flex flex-col-2  gap-40 items-center justify-center py-3">
            <div className=" w-70 flex flex-col gap-5 ">
              <div className="flex flex-col gap-3">
                <label>Branch</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3 text-[#1e1408] text-bold">
                <label>Claim Number *</label>
                <input
                  type="text"
                  placeholder="Claims/270222/EN/002"
                  className="h-[35px] bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731]"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Policy Class *</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                  required
                />
              </div>{" "}
              <div className="flex flex-col gap-3">
                <label>Policy Number *</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                  required
                />
              </div>{" "}
              <div className="flex flex-col gap-3">
                <label>Total Claims Paid</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
            </div>

            <div className="w-70 flex flex-col gap-5 ">
              <div className="flex flex-col gap-3">
                <label>Co-insurer Recovery *</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>FAC Recovery </label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Salvage</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Insured</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Date of Loss</label>
                <input
                  type="date"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
            </div>
            <div className="w-70 flex flex-col gap-5 ">
              <div className="flex flex-col gap-3">
                <label>Notification Date</label>
                <input
                  type="date"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Reg Date</label>
                <input
                  type="date"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Date Claim Paid</label>
                <input
                  type="date"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Description of loss</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Risk type</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
            
            </div>
            
          </div>
            <div className="w-[100px] h-[30px] text-center text-stone-750  py-1 rounded-xl bg-[#fc973f] mt-9 mb-8 hover:bg-stone-900 hover:text-gray-200 duration-300">
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
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
                <button onClick={notify}>Submit</button>
              </div>
        </form>
      </div>
    </div>
  );
}

export default ClaimDataEdit;

// bg-gradient-to-tr from-amber-100 via-amber-50 to-amber-100 h-scree

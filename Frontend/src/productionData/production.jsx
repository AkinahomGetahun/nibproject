import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
function production() {
const handleSubmit = (e) => {
  e.preventDefault(); 
  toast("Submitted Production Data Successfully!");

  setTimeout(() => {
    window.location.reload();
  }, 2500);
};


  return (
    <div className="flex flex-col items-center justify-center  border-2 border-stone-200 lg:w-[1200px] mx-auto rounded-md bg-stone-50 bottom-10">
      <div className="">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[23px] underline py-3">Production Data Form</h1>
          <div className="md:flex md:flex-col-2 lg:gap-30 gap-20 items-center justify-center w-full py-2">
            <div className=" lg:w-70 flex flex-col gap-5 text-stone-800 ">
              <div className="flex flex-col gap-3">
                <label>Branch Code</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Processing Date</label>
                <input
                  type="date"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <label>Policy Number</label>
                <input
                  type="text"
                  placeholder="Claims/270222/EN/002"
                  className="h-[35px] bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Client Name</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Agent Name</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Effective Date </label>
                <input
                  type="date"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
            </div>

            <div className="lg:w-70 flex flex-col gap-5 text-stone-800">
              <div className="flex flex-col gap-3">
                <label>End Date</label>
                <input
                  type="date"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Sum Insured</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Tot Premium</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Tot Commission</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Net Premium</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Tot Vat on Commision</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
            </div>
            <div className="lg:w-70 flex flex-col gap-5 text-stone-800 ">
              <div className="flex flex-col gap-3">
                <label>Sales Person</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>NAICOM Class Desc</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Transcation Type</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Channel</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Policy Type</label>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md outline-none px-2 border border-2 border-[#8b6731] h-[35px]"
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <label>Currency</label>
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
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default production;

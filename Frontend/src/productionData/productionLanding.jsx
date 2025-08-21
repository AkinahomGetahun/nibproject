// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useStore } from 'zustand';

// const productionLanding = () => {
//       const { activePath, setActivePath } = useStore();

//   return (
//     <div>
//          <div className="w-full md:w-[700px] lg:w-[900px] mt-10">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
//             <Link to="/claim">
//               <div
//                 onClick={() => setActivePath("/")}
//                 className="flex items-center gap-2 cursor-pointer text-[17px]"
//               >
//                 <p
//                   className={`${
//                     activePath === "/"
//                       ? "text-[#7a3b04]  font-semibold underline decoration-4 underline-offset-8"
//                       : "text-stone-900 hover:text-[#7a3b04] transition duration-300"
//                   }`}
//                 >
//                   Claims Data Form
//                 </p>
//               </div>
//             </Link>

//             <hr className="w-full md:w-80 lg:w-115 border-stone-400 " />

//             <Link to="/production">
//               <div
//                 onClick={() => setActivePath("/production")}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <p
//                   className={`${
//                     activePath === "/production"
//                       ? "text-[#7a3b04] font-semibold underline decoration-4 underline-offset-8 "
//                       : "text-stone-900 hover:text-[#7a3b04] transition duration-300"
//                   }`}
//                 >
//                   Production Data Form
//                 </p>
//               </div>
//             </Link>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default productionLanding
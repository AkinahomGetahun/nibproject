import { useState } from "react";
import { CircleUser } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Nib from "./assets/images/NIBSlider.png";

function NavBar() {
  const [activeform, setActiveForm] = useState("/");
  const [activetable, setActiveTable] = useState(" ");
  return (
    <div className="">
      <div className="flex flex-col-2 items-center justify-between shadow-lg rounded-10 bg-stone-100">
       <Link to="/"><img src={Nib} className="w-70 h-20" /></Link>
        <Link to='/signup'> <CircleUser color="#0e0702ff" size={50} className="mx-20" /></Link>
      </div>
     {/* <Outlet/> */}
    </div>
  );
}

export default NavBar;

import React from "react";
import BarChart from "./BarChart.jsx";
import LineChart from "./LineChart.jsx";
const LandingPageCharts = () => {
  return (
    <div className="lg:flex items-center justify-center gap-20 ">
      <div className=""><BarChart/></div>
      
      <div className=""><LineChart /></div>
      
    </div>
  );
};

export default LandingPageCharts;

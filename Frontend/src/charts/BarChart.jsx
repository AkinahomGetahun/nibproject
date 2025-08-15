import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useStore from "../store/useStore";

const BarChart = () => {
  const { claims, fetchClaims } = useStore();
  const [state, setState] = useState({
    series: [{ data: [] }],
    options: {
      chart: {
        type: "bar",
        height: 400,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Total Claims Paid",
          "Treaty Recovery",
          "Fac Recovery",
          "Salvage",
          "Total Recovery",
        ],
      },
      
      colors: ["#f5a359"],
    },
  });

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  useEffect(() => {
    if (claims && claims.length > 0) {
      const totalClaimsPaid = claims.reduce(
        (sum, c) => sum + (parseFloat(c.totalclaimspaid) || 0),
        0
      );
      const totalTreatyRecovery = claims.reduce(
        (sum, c) => sum + (parseFloat(c.treatyrecovery) || 0),
        0
      );
      const totalFacRecovery = claims.reduce(
        (sum, c) => sum + (parseFloat(c.facrecovery) || 0),
        0
      );
      const totalSalvage = claims.reduce(
        (sum, c) => sum + (parseFloat(c.salvage) || 0),
        0
      );
      const totalRecovery = claims.reduce(
        (sum, c) => sum + (parseFloat(c.totalrecovery) || 0),
        0
      );

      setState((prev) => ({
        ...prev,
        series: [
          {
            name: "Claims Total",
            data: [
              totalClaimsPaid,
              totalTreatyRecovery,
              totalFacRecovery,
              totalSalvage,
              totalRecovery,
            ],
          },
        ],
      }));
    }
  }, [claims]);

  return (
    <div className="flex flex-col items-center justify-center py-8 ">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        width={450}
        height={350}
        className="bg-[#fff5eb] shadow-md hover:shadow-lg rounded-lg p-4"
      />
      <p className="text-stone-600 py-3 text-sm"> Claims Data Total</p>
    </div>
  );
};

export default BarChart;

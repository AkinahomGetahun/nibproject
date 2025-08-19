import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useStore from "../store/useStore";
import production from "../productionData/production";

const BarChart = () => {
  const { production, fetchProduction } = useStore();

  const [state, setState] = useState({
    series: [{ data: [] }],
    options: {
      chart: {
        type: "line",
        height: 400,
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        line: {
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
          "Sum Insured",
          "Premium Amount",
          "Commission Amount",
          "Net Premium",
          "Retained Premium",
        ],
      },
      colors: ["#7a3b04"],
    },
  });

  useEffect(() => {
    fetchProduction();
  }, [fetchProduction]);

  useEffect(() => {
    if (production && production.length > 0) {
      const suminsured = production.reduce(
        (sum, c) => sum + (parseFloat(c.suminsured) || 0),
        0
      );
      const premiumamount = production.reduce(
        (sum, c) => sum + (parseFloat(c.premiumamount) || 0),
        0
      );
      const commissionamount = production.reduce(
        (sum, c) => sum + (parseFloat(c.commissionamount) || 0),
        0
      );
      const netpremium = production.reduce(
        (sum, c) => sum + (parseFloat(c.netpremium) || 0),
        0
      );
      const retainedpremium = production.reduce(
        (sum, c) => sum + (parseFloat(c.totvat) || 0),
        0
      );

      setState((prev) => ({
        ...prev,
        series: [
          {
            name: "Total Production",
            data: [suminsured, premiumamount, commissionamount, netpremium, retainedpremium],
          },
        ],
      }));
    }
  }, [production]);

  return (
    <div className="flex flex-col px-20  ">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
        className="bg-stone-200 shadow-md hover:shadow-lg rounded-lg  p-4"
      />
      <p className="text-stone-600 py-3 text-sm"> Production Data Total</p>
    </div>
  );
};

export default BarChart;

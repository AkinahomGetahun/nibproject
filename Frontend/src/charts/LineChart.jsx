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
          "Sum Insured",
          "Tot Premium",
          "Tot Commission",
          "Net Premium",
          "Tot on vat commission",
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
      const totpremium = production.reduce(
        (sum, c) => sum + (parseFloat(c.totpremium) || 0),
        0
      );
      const totcommission = production.reduce(
        (sum, c) => sum + (parseFloat(c.totcommission) || 0),
        0
      );
      const netpremium = production.reduce(
        (sum, c) => sum + (parseFloat(c.netpremium) || 0),
        0
      );
      const totvat = production.reduce(
        (sum, c) => sum + (parseFloat(c.totvat) || 0),
        0
      );

      setState((prev) => ({
        ...prev,
        series: [
          {
            name: "Total Production",
            data: [suminsured, totpremium, totcommission, netpremium, totvat],
          },
        ],
      }));
    }
  }, [production]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        width={450}
        height={350}
        className="bg-stone-200 shadow-md hover:shadow-lg rounded-lg  p-4"
      />
      <p className="text-stone-600 py-3 text-sm"> Production Data Total</p>
    </div>
  );
};

export default BarChart;

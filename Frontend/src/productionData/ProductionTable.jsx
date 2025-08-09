import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Plus, FileSpreadsheet, SquarePen, Trash2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import useStore from "../store/useStore";
import pdf from "../assets/images/pdf.png";
import csv from "../assets/images/csv.png";

const Export = ({ onExport }) => (
  <div className="flex">
    <button className="text-white py-1 rounded-lg text-sm flex gap-2">
      <img src={pdf} className="w-10" />
    </button>
    <button
      onClick={onExport}
      className="text-white py-1 rounded-lg text-sm flex gap-2"
    >
      <img src={csv} className="w-10" />
    </button>
  </div>
);

// Converts JSON data to CSV string
const convertArrayOfObjectsToCSV = (array) => {
  if (!array || !array.length) return null;
  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  let result = keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    keys.forEach((key, index) => {
      if (index > 0) result += columnDelimiter;
      result += item[key];
    });
    result += lineDelimiter;
  });

  return result;
};

// Triggers CSV download in browser
const downloadCSV = (array) => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (!csv) return;

  const filename = "ProductionData.csv";
  csv = `data:text/csv;charset=utf-8,${csv}`;
  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};

const customStyles = {
  rows: {
    style: {
      minHeight: "38px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      backgroundColor: "#7e7775ff",
      fontSize: "13px",
      color: "white",
      width: "135px",
      minHeight: "35px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      width: "50px",
      cursor: "pointer",
    },
  },
  highlightOnHoverStyle: {
    backgroundColor: "#eef",
    color: "#000",
  },
};

function ProductionTable() {
  const [filterText, setFilterText] = useState("");
  const { production, fetchProduction, deleteProduction } = useStore();

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(production)} />,
    [production]
  );
  const filteredData = production.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );
  const handleDelete = async (id) => {
    try {
      await deleteProduction(id);
      toast.success("Claim deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete claim.");
    }
  };
  useEffect(() => {
    fetchProduction();
  }, [fetchProduction]);

  useEffect(() => {
    console.log("production:", production);
  }, [production]);
  const columns = [
    {
      name: "Branch Code",
      selector: (row) => row.branchcode,
      sortable: true,
      width: "100px",
    },
    {
      name: "Processing Date",
      selector: (row) => row.processingdate,
      sortable: true,
    },
    {
      name: "Policy Number",
      selector: (row) => row.policynumber,
      sortable: true,
    },
    { name: "Client Name", selector: (row) => row.clientname, sortable: true },
    { name: "Agent Name", selector: (row) => row.agentname, sortable: true },
    {
      name: "Effective Date",
      selector: (row) => row.effectivedate,
      sortable: true,
    },
    { name: "End Date", selector: (row) => row.enddate, sortable: true },
    { name: "Sum Insured", selector: (row) => row.suminsured, sortable: true },
    { name: "Tot Premium", selector: (row) => row.totpremium, sortable: true },
    {
      name: "Tot Commission",
      selector: (row) => row.totcommission,
      sortable: true,
    },
    { name: "Net Premium", selector: (row) => row.netpremium, sortable: true },
    {
      name: "TOT On Vat Commission",
      selector: (row) => row.totvat,
      sortable: true,
    },
    {
      name: "Sales Person",
      selector: (row) => row.salesperson,
      sortable: true,
    },
    {
      name: "NAICOM Class Desc",
      selector: (row) => row.naicom,
      sortable: true,
    },
    {
      name: "Transaction Type",
      selector: (row) => row.transactiontype,
      sortable: true,
    },
    { name: "Channel", selector: (row) => row.channel, sortable: true },
    { name: "Policy Type", selector: (row) => row.policytype, sortable: true },
    { name: "Currency", selector: (row) => row.currency, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/editproduction/${row.id}`}>
            <button>
              <SquarePen color="#fc8823" size={20} />
            </button>
          </Link>
          <button onClick={() => handleDelete(row.id)}>
            <Trash2 color="#851004" size={20} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="xl:w-[1200px] rounded-lg mx-auto w-full">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl text-lg py-3 font-semibold text-stone-900">
          Production Data Table
        </p>
        <div className="text-[13px] flex sm:gap-5 gap-1">
          <div className="flex relative">
            <span className=" absolute mx-2 mt-2 flex items-center">
              <Search size={20} color="#292524" />
            </span>
            <input
              className="w-30 sm:w-40 border border-2 border-stone-500 rounded-2xl flex gap-3 outline-none px-8 text-stone-200"
              type="search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          <Link to="/production">
            <button className="bg-stone-800 sm:w-[160px] h-[35px] flex gap-1 rounded-xl px-2 ">
              <Plus size={16} color="white" className="mt-2.5" />
              <p className=" sm:text-white py-3 hidden sm:block">
                Add Production Data
              </p>
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        actions={actionsMemo}
        selectableRows
        highlightOnHover
        persistTableHead
        noDataComponent={
          <div className="w-full text-left bg-[#ffdcbd] text-gray-700 italic p-4">
            No records found.
          </div>
        }
      />
    </div>
  );
}

export default ProductionTable;

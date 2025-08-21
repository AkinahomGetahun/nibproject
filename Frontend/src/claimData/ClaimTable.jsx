import React, { useEffect, useMemo, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Plus,
  Search,
  Trash2,
  SquarePen,
  EyeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import useStore from "../store/useStore";
import pdf from "../assets/images/pdf.png";
import csv from "../assets/images/csv.png";
import { useReactToPrint } from "react-to-print";

const customStyles = {
  rows: {
    style: { minHeight: "38px" },
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
    },
  },
  highlightOnHoverStyle: {
    backgroundColor: "#eef",
    color: "#000",
  },
};

function ClaimTable() {
  const { claims, fetchClaims, deleteClaim } = useStore();
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetchClaims();

  }, [fetchClaims]);

  useEffect(() => {
    // console.log("claims:", claims);
  }, [claims]);
  //  const componentRef = useRef();
  //  const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //  })
  const Export = ({ onExport }) => (
    <div className="flex">
      {/* <button onClick={handlePrint} className="text-white py-1 rounded-lg text-sm flex gap-2">
      <img src={pdf} className="w-10" />
    </button> */}
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

    const filename = "ClaimsData.csv";
    csv = `data:text/csv;charset=utf-8,${csv}`;
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  };

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(claims)} />,
    [claims]
  );
  const filteredData = claims.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  //calculated sum
  const totalClaimsPaidSum = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.totalclaimspaid) || 0),
    0
  );

  const totalRecoverySum = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.totalrecovery) || 0),
    0
  );
  const treatyrecovery = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.treatyrecovery) || 0),
    0
  );

  const facrecovery = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.facrecovery) || 0),
    0
  );
  const salvage = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.salvage) || 0),
    0
  );

  const dataWithTotal = [
    ...filteredData,
    {
      claimnumber: "Total",
      branch: "-",
      policyclass: "-",
      policynumber: "-",
      totalclaimspaid: totalClaimsPaidSum,
      coinsurerrecovery: "-",
      treatyrecovery: treatyrecovery,
      facrecovery: facrecovery,
      salvage: salvage,
      totalrecovery: totalRecoverySum,
      insured: "-",
      dateofloss: "-",
      notificationdate: "-",
      regdate: "-",
      dateclaimpaid: "-",
      descriptionofloss: "-",
      risktype: "-",
      agency: "-",
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row.claimnumber === "Total",
      style: {
        fontWeight: "bold",
        backgroundColor: "#f7c9a0",
        color: "#000",
      },
    },
  ];
  //end

  const handleDelete = async (id) => {
    try {
      await deleteClaim(id);
      toast.success("Claim deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete claim.");
    }
  };
  const columns = [
    {
      name: "Claim Number",
      selector: (row) => row.claimnumber,
      sortable: true,
      width: "100px",
    },
    { name: "Branch", selector: (row) => row.branch, sortable: true },
    {
      name: "Policy Class",
      selector: (row) => row.policyclass,
      sortable: true,
    },
    {
      name: "Policy Number",
      selector: (row) => row.policynumber,
      sortable: true,
    },
    {
      name: "Total Claims Paid",
      selector: (row) => row.totalclaimspaid,
      sortable: true,
    },
    {
      name: "Co Insurer Recovery",
      selector: (row) => row.coinsurerrecovery,
      sortable: true,
    },
    {
      name: "Treaty Recovery",
      selector: (row) => row.treatyrecovery,
      sortable: true,
    },
    {
      name: "FAC Recovery",
      selector: (row) => row.facrecovery,
      sortable: true,
    },
    { name: "Salvage", selector: (row) => row.salvage, sortable: true },
    {
      name: "Total Recovery",
      selector: (row) => row.totalrecovery,
      sortable: true,
    },
    { name: "Insured", selector: (row) => row.insured, sortable: true },
    {
      name: "Date of Loss",
      selector: (row) => row.dateofloss,
      sortable: true,
      wrap: true,
    },
    {
      name: "Notification Date",
      selector: (row) => row.notificationdate,
      sortable: true,
    },
    { name: "Reg Date", selector: (row) => row.regdate, sortable: true },
    {
      name: "Date Claim Paid",
      selector: (row) => row.dateclaimpaid,
      sortable: true,
    },
    {
      name: "Description of Loss",
      selector: (row) => row.descriptionofloss,
      sortable: true,
    },
    { name: "Risk Type", selector: (row) => row.risktype, sortable: true },
    { name: "Agency", selector: (row) => row.agency, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
         
          <Link to={`/editclaims/${row.id}`}>
            <button>
              <SquarePen color="#fc8823" size={20} />
            </button>
          </Link>

          {/* <div>
            <button onClick={() => handleDelete(row.id)}>
              <Trash2 color="#851004" size={20} />
            </button>
          </div> */}
        </div>
      ),
    },
  ];

  return (
    <div className="xl:w-[1300px] rounded-lg mx-auto">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl text-lg py-3 font-semibold text-stone-900">
          Claims Data Table
        </p>
        <div className="text-[13px] flex sm:gap-5 gap-1">
          <div className="flex relative">
            <span className="absolute mx-2 mt-2 flex items-center">
              <Search size={20} color="#292524" />
            </span>
            <input
              className="w-30 sm:w-40 border-2 border-stone-500 rounded-2xl flex gap-3 outline-none px-8 text-stone-200"
              type="search"
              placeholder="Search..."
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <Link to="/">
            <button className="bg-stone-800 sm:w-[140px] h-[35px] flex gap-1 rounded-xl px-2">
              <Plus size={16} color="white" className="mt-2.5" />
              <p className="sm:text-white py-3 hidden sm:block">
                Add Claims Data
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
        data={dataWithTotal}
        customStyles={customStyles}
        actions={actionsMemo}
        selectableRows
        highlightOnHover
        persistTableHead
        conditionalRowStyles={conditionalRowStyles}
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "",
        }}
        noDataComponent={
          <div className="w-full text-left bg-[#ffdcbd] text-gray-700 italic p-4">
            No records found.
          </div>
        }
      />
    </div>
  );
}

export default ClaimTable;

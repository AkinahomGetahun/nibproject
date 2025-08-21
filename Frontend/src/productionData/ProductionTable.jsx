import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Plus, SquarePen, Trash2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import useStore from "../store/useStore";
import csv from "../assets/images/csv.png";
import { usePDF } from "react-to-pdf";
import api  from "../api/axios"; 
const Export = ({ onExport }) => (
  <div className="flex">
    {/* <button className="text-white py-1 rounded-lg text-sm flex gap-2">
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
  // const [data, setData] = useState(null);
  // const [sortType, setSortType] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await api.get("/groupbytime");
  //     setData(res.data); 
  //   };
  //   fetchData();
  // }, []);

  // const sortedPosts = sortType && data ? data[sortType] : null;

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
  const suminsured = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.suminsured) || 0),
    0
  );

  const premiumamount = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.premiumamount) || 0),
    0
  );
  const commissionamount = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.commissionamount) || 0),
    0
  );
  const netpremium = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.netpremium) || 0),
    0
  );
  const retainedpremium = filteredData.reduce(
    (sum, row) => sum + (parseFloat(row.retainedpremium) || 0),
    0
  );
  const dataWithTotal = [
    ...filteredData,
    {
      id: "totalrow",
      branchcode: "Total",
      policynumber: "-",
      nameofinsured: "-",
      effectivedate: "-",
      enddate: "-",
      suminsured: suminsured,
      premiumamount: premiumamount,
      commissionamount: commissionamount,
      netpremium: netpremium,
      retainedpremium: retainedpremium,
      naicom: "-",
      transactiontype: "-",
      rate: "-",
      sourceofbusiness: "",
      source: "",
      name: "",
      created_at: "-",
      updated_at: "-",
      actions: " ",
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row.branchcode === "Total",
      style: {
        fontWeight: "bold",
        backgroundColor: "#f7c9a0",
        color: "#000",
      },
    },
  ];
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
    // console.log("production:", production);
  }, [production]);
  const columns = [
    {
      name: "Branch Code",
      selector: (row) => row.branchcode,
      sortable: true,
      width: "100px",
    },
    { name: "Reciept No", selector: (row) => row.reciept, sortable: true },

    {
      name: "Name of insured",
      selector: (row) => row.nameofinsured,
      sortable: true,
    },
    {
      name: "Class of business",
      selector: (row) => row.naicom,
      sortable: true,
    },
    {
      name: "Policy Number",
      selector: (row) => row.policynumber,
      sortable: true,
    },
    {
      name: "Transaction Status",
      selector: (row) => row.transactiontype,
      sortable: true,
    },
    {
      name: "Effective Date",
      selector: (row) => row.effectivedate,
      sortable: true,
    },
    { name: "End Date", selector: (row) => row.enddate, sortable: true },

    { name: "Sum Insured", selector: (row) => row.suminsured, sortable: true },
    {
      name: "Premium Amount",
      selector: (row) => row.premiumamount,
      sortable: true,
    },
    {
      name: "Commission Amount",
      selector: (row) => row.commissionamount,
      sortable: true,
    },
    { name: "Net Premium", selector: (row) => row.netpremium, sortable: true },
    {
      name: "SOB (Source)",
      selector: (row) => row.source,
      sortable: true,
    },
{
      name: "SOB (Name)",
      selector: (row) => row.name,
      sortable: true,
    },
    { name: "SOB (Rate)", selector: (row) => row.rate, sortable: true },

    {
      name: "Retained Premium",
      selector: (row) => row.retainedpremium,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => row.updated_at,
      sortable: true,
    },
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
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  return (
    <div ref={targetRef} className="xl:w-[1200px] rounded-lg mx-auto w-full">
      {/* <button onClick={() => toPDF()} className="">
        pdf
      </button> */}
      <div className="flex items-center justify-between">
        <p className="lg:text-xl text-lg py-3 font-semibold text-stone-900">
          Production Data Table
        </p>
        <div className="text-[13px] flex sm:gap-5 gap-1">
          <div>
            <select
              className="outline-none bg-[#f8d9be] rounded-lg w-23"
              // value={sortType}
              // onChange={(e) => setSortType(e.target.value)}
            >
              <option disabled>sort by</option>
              <option value="byDay">Day</option>
              <option value="byWeek">Week</option>
              <option value="byMonth">Month</option>
            </select>
{/* 
            <div className="mt-4">
              {sortedPosts &&
                Object.entries(sortedPosts).map(([groupKey, posts]) => (
                  <div key={groupKey} className="mb-4 p-2 border rounded">
                    <h3 className="font-bold">{groupKey}</h3>
                    <ul className="list-disc ml-4">
                      {posts.map((post) => (
                        <li key={post.id}>
                          {post.nameofinsured} ({post.policynumber})
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div> */}
          </div>

          <div className="flex relative">
            <span className=" absolute mx-2 mt-2 flex items-center">
              <Search size={20} color="#292524" />
            </span>
            <input
              className="w-30 sm:w-40 border-2 border-stone-500 rounded-2xl flex gap-3 outline-none px-8 text-stone-200"
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
        keyField="id"
        columns={columns}
        data={dataWithTotal}
        customStyles={customStyles}
        actions={actionsMemo}
        conditionalRowStyles={conditionalRowStyles}
        selectableRows
        highlightOnHover
        persistTableHead
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

export default ProductionTable;

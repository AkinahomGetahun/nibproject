import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Plus, FileSpreadsheet, SquarePen, Trash2, Search } from "lucide-react";
import { Link } from "react-router-dom";

const notify = () => toast("Data deleted!");

const Export = ({ onExport }) => (
  <div className="flex">
    <p className="text-sm font-semibold text-stone-700  py-2"> Download CSV </p>
    <button
      onClick={onExport}
      className=" text-white px-4 py-1 rounded-lg text-sm flex gap-2 "
    >
      <FileSpreadsheet color="#b4790bff" size={33} />
    </button>
  </div>
);

const convertArrayOfObjectsToCSV = (array) => {
  if (!array || !array.length) return null;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  let result = keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

const downloadCSV = (array) => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (!csv) return;

  const filename = "ProductionData.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};

const data = [
  {
    id: 1,
    branchcode: "200",
    processdate: "16/07/01 ",
    policynum: "2001 ",
    clientname: "Ibbisa ",
    agentname: "Nil ",
    effectivedate: "22/08/2020 ",
    enddate: "19/09/23 ",
    suminsured: "5345678 ",
    totpremium: "456778 ",
    totcommission: "29345 ",
    netpremium: "96789 ",
    Totonvat: "1111 ",
    salesperson: "Agent Abc ",
    naicomclass: "Fire Insurance ",
    transactiontype: "Renewal ",
    channel: " Ethio Sales",
    policytype: "NoFAC + Noco ",
    currency: "birr",
  },
  {
    id: 2,
    branchcode: "200",
    processdate: "16/07/01 ",
    policynum: "2001 ",
    clientname: "Ibbisa ",
    agentname: "Nil ",
    effectivedate: "22/08/2020 ",
    enddate: "19/09/23 ",
    suminsured: "5345678 ",
    totpremium: "456778 ",
    totcommission: "29345 ",
    netpremium: "96789 ",
    Totonvat: "1111 ",
    salesperson: "Agent Abc ",
    naicomclass: "Fire Insurance ",
    transactiontype: "Renewal ",
    channel: " Ethio Sales",
    policytype: "NoFAC + Noco ",
    currency: "birr",
  },
  {
    id: 3,
    branchcode: "200",
    processdate: "16/07/01 ",
    policynum: "2001 ",
    clientname: "Ibbisa ",
    agentname: "Nil ",
    effectivedate: "22/08/2020 ",
    enddate: "19/09/23 ",
    suminsured: "5345678 ",
    totpremium: "456778 ",
    totcommission: "29345 ",
    netpremium: "96789 ",
    Totonvat: "1111 ",
    salesperson: "Agent Abc ",
    naicomclass: "Fire Insurance ",
    transactiontype: "Renewal ",
    channel: " Ethio Sales",
    policytype: "NoFAC + Noco ",
    currency: "birr",
  },
];

const columns = [
  {
    name: "Branch Code",
    selector: (row) => row.branchcode,
    sortable: true,
    width: "100px",
  },
  {
    name: "Processing Date",
    selector: (row) => row.processdate,
    sortable: true,
  },
  { name: "Policy Number", selector: (row) => row.policynum, sortable: true },
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
    selector: (row) => row.Totonvat,
    sortable: true,
  },
  { name: "Sales Person", selector: (row) => row.salesperson, sortable: true },
  {
    name: "NAICOM Class Desc",
    selector: (row) => row.naicomclass,
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
    button: true,
    cell: () => (
      <div className="flex gap-2">
        <Link to="/editproduction">
          <button>
            <SquarePen color="#fc8823" size={20} />
          </button>
        </Link>
        <button>
          <Trash2 color="#851004" size={20} />
        </button>
      </div>
    ),
  },
];

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
      width: "115px",
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

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );

  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );



  return (
    <div className="lg:w-[1200px] rounded-lg mx-auto w-full">
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

          <Link to="/">
            <button className="bg-stone-800 sm:w-[160px] h-[35px] flex gap-1 rounded-xl px-2 ">
              <Plus size={16} color="white" className="mt-2.5" />
              <p className=" sm:text-white py-3 hidden sm:block">
                Add Production Data
              </p>
            </button>
          </Link>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        actions={actionsMemo}
        selectableRows
        highlightOnHover
        persistTableHead
      />
    </div>
  );
}

export default ProductionTable;

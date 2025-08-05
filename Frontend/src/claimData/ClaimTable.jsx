import DataTable from "react-data-table-component";
import {
  Plus,
  Search,
  FileSpreadsheet,
  Trash2,
  SquarePen,
  LineSquiggle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

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

  const filename = "ClaimsData.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

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
      width: "100px",
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
const columns = [
  {
    name: "Claim Number",
    selector: (row) => row.claimnumber,
    sortable: true,
    width: "100px",
  },
  {
    name: "Branch",
    selector: (row) => row.branch,
    sortable: true,
  },
  {
    name: "Policy Class",
    selector: (row) => row.policyclass,
    sortable: true,
  },

  {
    name: "Policy Number ",
    selector: (row) => row.policynum,
    sortable: true,
  },
  {
    name: "Total Claims Paid",
    selector: (row) => row.totalclaims,
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
  {
    name: "Salvage",
    selector: (row) => row.salvage,
    sortable: true,
  },
  {
    name: "Total Recovery",
    selector: (row) => row.totalrecovery,
    sortable: true,
  },
  {
    name: "Insured",
    selector: (row) => row.insured,
    sortable: true,
  },

  {
    name: "Date of Loss",
    selector: (row) => row.dateofloss,
    sortable: true,
    wrap: true,
  },
  {
    name: "Notification Date",
    selector: (row) => row.notifdate,
    sortable: true,
  },
  {
    name: "Reg Date",
    selector: (row) => row.regdate,
    sortable: true,
  },
  {
    name: "Date Claim Paid",
    selector: (row) => row.dateclaimpaid,
    sortable: true,
  },
  {
    name: "Description of Loss",
    selector: (row) => row.descofloss,
    sortable: true,
  },
  {
    name: "Risk Type",
    selector: (row) => row.risktype,
    sortable: true,
  },
  {
    name: "Agency",
    selector: (row) => row.agency,
    sortable: true,
  },
  {
    name: "Actions",
    button: true,
    cell: () => (
      <div className="flex gap-2">
        <Link to="/editclaims">
          <button>
            <SquarePen color="#fc8823" size={20} />
          </button>
        </Link>
        <div >
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
            
          />
          <button onClick={notify}>
            <Trash2 color="#851004" size={20} />
          </button>{" "}
        </div>
      </div>
    ),
  },
];

const data = [
  {
    id: 1,
    claimnumber: "Claims/724/EN/001",
    branch: "Ethiopia ",
    policyclass: "Fire insurance ",
    policynum: "001 ",
    totalclaims: "214567 ",
    coinsurerrecovery: "22456 ",
    treatyrecovery: "193545 ",
    facrecovery: "5678 ",
    salvage: "6778 ",
    totalrecovery: "293455 ",
    insured: "767289 ",
    dateofloss: "11/11/20 ",
    notifdate: "23/12/22",
    regdate: "7/2/2020 ",
    dateclaimpaid: "08/11/34 ",
    descofloss: " Call fell into a river",
    risktype: "- ",
    agency: "-",
  },
  {
    id: 1,
    claimnumber: "Claims/694/EN/001",
    branch: "Ethiopia ",
    policyclass: "Fire insurance ",
    policynum: "001 ",
    totalclaims: "214567 ",
    coinsurerrecovery: "22456 ",
    treatyrecovery: "193545 ",
    facrecovery: "5678 ",
    salvage: "6778 ",
    totalrecovery: "293455 ",
    insured: "767289 ",
    dateofloss: "11/11/20 ",
    notifdate: "23/12/22",
    regdate: "7/2/2020 ",
    dateclaimpaid: "08/11/34 ",
    descofloss: " Call fell into a river",
    risktype: "- ",
    agency: "-",
  },
  {
    id: 1,
    claimnumber: "Claims/104/EN/001",
    branch: "Ethiopia ",
    policyclass: "Fire insurance ",
    policynum: "001 ",
    totalclaims: "214567 ",
    coinsurerrecovery: "22456 ",
    treatyrecovery: "193545 ",
    facrecovery: "5678 ",
    salvage: "6778 ",
    totalrecovery: "293455 ",
    insured: "767289 ",
    dateofloss: "11/11/20 ",
    notifdate: "23/12/22",
    regdate: "7/2/2020 ",
    dateclaimpaid: "08/11/34 ",
    descofloss: " Call fell into a river",
    risktype: "- ",
    agency: "-",
  },
  {
    id: 1,
    claimnumber: "Claims/374/EN/001",
    branch: "Ethiopia ",
    policyclass: "Fire insurance ",
    policynum: "001 ",
    totalclaims: "214567 ",
    coinsurerrecovery: "22456 ",
    treatyrecovery: "193545 ",
    facrecovery: "5678 ",
    salvage: "6778 ",
    totalrecovery: "293455 ",
    insured: "767289 ",
    dateofloss: "11/11/20 ",
    notifdate: "23/12/22",
    regdate: "7/2/2020 ",
    dateclaimpaid: "08/11/34 ",
    descofloss: " Call fell into a river",
    risktype: "- ",
    agency: "-",
  },
];

function ClaimTable() {
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );

  return (
    <div className="lg:w-[1300px] rounded-lg mx-auto ">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl text-lg py-3 font-semibold text-stone-900">
          Claims Data Table
        </p>
        <div className="text-[13px] flex sm:gap-5 gap-1 ">
          <div className="flex relative">
            <span className=" absolute mx-2 mt-2 flex items-center">
              <Search size={20} color="#292524" />
            </span>
            <input
              className="w-30 sm:w-40 border border-2 border-stone-500 rounded-2xl flex gap-3 outline-none px-8 text-stone-200"
              type="search"
            />
          </div>
          <Link to="/">
            <button className="bg-stone-800 sm:w-[140px] h-[35px] flex gap-1 rounded-xl px-2 ">
              <Plus size={16} color="white" className="mt-2.5" />
              <p className=" sm:text-white py-3 hidden sm:block">
                Add Claims Data
              </p>
            </button>
          </Link>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        actions={actionsMemo}
        selectableRows
        className=""
        highlightOnHover
        persistTableHead
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "",
        }}
      />
    </div>
  );
}
export default ClaimTable;

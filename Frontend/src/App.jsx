import { Routes, Route } from "react-router-dom";
import Claim from "./claimData/claim";
import Layout from "./layout";
import Production from "./productionData/production";
import ProductionTable from "./productionData/ProductionTable";
import ClaimTable from "./claimData/ClaimTable";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import ProductionDataEdit from "./EditData/ProductionDataEdit";
import ClaimDataEdit from "./EditData/ClaimDataEdit";
import ChangePassword from "./auth/ChangePassword";
import LandingPageCharts from "./charts/LandingPageCharts";
import LineChart from "./charts/LineChart"
import BarChart from "./charts/LineChart";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="landingpage" element={<LandingPageCharts />} />
        <Route path="linechart" element={<LineChart />} />
        <Route path="barchart" element={<BarChart />} />
        <Route path="claim" element={<Claim />} />
        <Route path="production" element={<Production />} />
        <Route path="claimtable" element={<ClaimTable />} />
        <Route path="productiontable" element={<ProductionTable />} />
        <Route path="editproduction/:id" element={<ProductionDataEdit />} />
        <Route path="editclaims/:id" element={<ClaimDataEdit />} />
      </Route>
      {/* <Route path="/signup" element={<NavBar />}> */}
      <Route path="protectsignup" element={<SignUp />} />
      <Route index element={<Login />} />
      <Route path="changepassword" element={<ChangePassword />} />

      {/* </Route> */}
    </Routes>
  );
}

export default App;

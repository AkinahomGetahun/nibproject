import { Routes, Route } from "react-router-dom";
import Claim from "./claimData/claim";
import Layout from "./layout";
import Production from "./productionData/production";
import ProductionTable from "./productionData/ProductionTable";
import ClaimTable from "./claimData/ClaimTable";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import NavBar from "./NavBar";
import ProductionDataEdit from "./EditData/ProductionDataEdit";
import ClaimDataEdit from "./EditData/ClaimDataEdit";
import ChangePassword from "./auth/ChangePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Claim />} />
        <Route path="production" element={<Production />} />
        <Route path="claimtable" element={<ClaimTable />} />
        <Route path="productiontable" element={<ProductionTable />} />
        <Route path="editproduction/:id" element={<ProductionDataEdit />} />
        <Route path="editclaims/:id" element={<ClaimDataEdit />} />
      </Route>
      {/* <Route path="/signup" element={<NavBar />}> */}
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="changepassword" element={<ChangePassword />} />

      {/* </Route> */}
    </Routes>
  );
}

export default App;

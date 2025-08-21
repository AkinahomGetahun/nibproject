// // ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles, user }) => {

//   if (!user) {
//     return <Navigate to="/" />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

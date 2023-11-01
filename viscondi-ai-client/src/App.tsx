// import {
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
//   defer
// } from "react-router-dom";

// import { ProtectedLayout } from "./components/ProtectedLayout";
// import { LoginLayout } from "./components/LoginLayout";
// import { AuthLayout } from "./components/AuthLayout";

// import { LoginPage } from "./pages/LoginPage";
// import { HomePage } from "./pages/HomePage";

// const getUserData = () =>
//   new Promise((resolve) =>
//     setTimeout(() => {
//       const user = window.localStorage.getItem("user");
//       resolve(user);
//     }, 3000)
//   );

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       element={<AuthLayout />}
//       loader={() => defer({ userPromise: getUserData() })}
//     >
//       <Route element={<LoginLayout />}>
//         <Route path="/login" element={<LoginPage />} />
//       </Route>

//       <Route path="/dashboard" element={<ProtectedLayout />}>
//         <Route path="/" element={<HomePage />} />
//       </Route>
//     </Route>
//   )
// );
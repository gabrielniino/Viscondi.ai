import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthenticationPage } from './pages/AuthenticationPage/AuthenticationPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       {/* <AuthenticationPage /> */}
//       {/* <LoginPage/> */}
//       <HomePage />
//     </BrowserRouter>
//   </React.StrictMode>,
// )

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "authentication",
    element: <AuthenticationPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "home",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

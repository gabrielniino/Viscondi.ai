import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from './hooks/useAuth';
import { AuthenticationPage } from './pages/AuthenticationPage/AuthenticationPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<LoginPage />}>
//       <Route path="login" element={<LoginPage />} />
//       <Route path="cadastro" element={<AuthenticationPage />} />
//       <Route path="home" element={<HomePage />} />
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="authentication" element={<AuthenticationPage />} />
          <Route path="home" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

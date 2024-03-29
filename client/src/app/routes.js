import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";
import RecruiterSignUp from "./recruiter/Register";
import RecruiterSignIn from "./recruiter/Login";

import ApplicantSignUp from "./applicant/Register";
import ApplicantSignIn from "./applicant/Login";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("app/views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("app/views/sessions/ForgotPassword")));
// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
// const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
const Dashboard = Loadable(lazy(() => import("app/views/dashboard")));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      // { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      { path: "/dashboard", element: <Dashboard />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor }
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },
  // Recruiter
  { path: "/recruiter/signup", element: <RecruiterSignUp /> },
  { path: "/recruiter/signin", element: <RecruiterSignIn /> },
  
  // applicant 
  { path: "/applicant/signup", element: <ApplicantSignUp /> },
  { path: "/applicant/signin", element: <ApplicantSignIn /> },

  { path: "/", element: <Navigate to="dashboard" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;

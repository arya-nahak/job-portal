import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

// import materialRoutes from "app/views/material-kit/MaterialRoutes";
import RecruiterSignUp from "./recruiter/Register";
import RecruiterSignIn from "./recruiter/Login";

import ApplicantSignUp from "./applicant/Register";
import ApplicantSignIn from "./applicant/Login";
import AddJob from "./recruiter/AddJob";
import JobsApplications from "./views/jobs/Jobs_Applications";
import Job_Recruiter_Application from "./views/jobs/Job_Recruiter_Application";
import Employees from "./views/jobs/Employees";
import { isUser } from "./utils/GetCookies";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(
  lazy(() => import("app/views/sessions/JwtRegister"))
);
const ForgotPassword = Loadable(
  lazy(() => import("app/views/sessions/ForgotPassword"))
);
// DASHBOARD PAGE
// const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
const Dashboard = Loadable(lazy(() => import("app/views/dashboard")));
const ApplicantProfile = Loadable(lazy(() => import("app/applicant/Profile")));
const RecruiterProfile = Loadable(lazy(() => import("app/recruiter/Profile")));

// const Role = "applicant";
// const Role = "recruiter";
const Role = isUser();
// const Role = false;

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      // ...materialRoutes,
      // dashboard route
      // { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      { path: "/dashboard", element: <Dashboard />, auth: authRoles.admin },
      { path: "/add-job", element: <AddJob /> },
      { path: "/my-job", element: <Dashboard /> },
      { path: "/applications", element: <JobsApplications /> },
      { path: "/job/applications", element: <Job_Recruiter_Application /> },
      { path: "/employees", element: <Employees /> },
      // { path: "/applicant/profile", element: <ApplicantProfile /> },
      // { path: "/recruiter/profile", element: <RecruiterProfile /> },
      {
        path: "/user/profile",
        element: !Role ? <RecruiterProfile /> : <ApplicantProfile />,
      },
    ],
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  // { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },
  // Recruiter
  { path: "/recruiter/signup", element: <RecruiterSignUp /> },
  { path: "/recruiter/signin", element: <RecruiterSignIn /> },

  // applicant
  { path: "/applicant/signup", element: <ApplicantSignUp /> },
  { path: "/session/signin", element: <ApplicantSignIn /> },

  { path: "/", element: <Navigate to="dashboard" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

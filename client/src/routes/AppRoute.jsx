import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import EmployeeList from "../pages/admin/EmployeeList";
import Attendance from "../pages/admin/Attendance";
import LeaveManagement from "../pages/admin/LeaveManagement";

import EmployeeLayout from "../layouts/EmployeeLayout";
import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeAttendance from "../pages/employee/Attendance";
import MyLeaves from "../pages/employee/MyLeaves";
import Profile from "../pages/employee/Profile";
import ChangePassword from "../pages/employee/ChangePassword";
import Reports from "../pages/admin/Reports";

import HRLayout from "../layouts/HRLayout";

import HRDashboard from "../pages/hr/Dashboard";
import HREmployees from "../pages/hr/Employees";
import HRLeaves from "../pages/hr/Leaves";
import HRAttendance from "../pages/hr/Attendance";
import HRChangePassword from "../pages/hr/ChangePassword";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="employees"
          element={<EmployeeList />}
        />

        <Route
         path="attendance"
         element={<Attendance />}
         />
       <Route
       path="leaves"
       element={<LeaveManagement />}
       />
       <Route
     path="reports"
    element={<Reports />}
    />
         <Route
         path="change-password"
         element={<ChangePassword/>}
        /> 

      </Route>

      <Route
    path="/employee"
    element={<EmployeeLayout />}
    >
  <Route
    path="dashboard"
    element={<EmployeeDashboard />}
  />

  <Route
    path="attendance"
    element={<EmployeeAttendance />}
  />

  <Route
    path="leaves"
    element={<MyLeaves />}
  />

  <Route
    path="profile"
    element={<Profile />}
  />
</Route>

<Route
  path="/hr"
  element={<HRLayout />}
>

<Route
  path="dashboard"
  element={<HRDashboard />}
/>

<Route
  path="employees"
  element={<HREmployees />}
/>

<Route
  path="leaves"
  element={<HRLeaves />}
/>

<Route
  path="attendance"
  element={<HRAttendance />}
/>
<Route
 path="change-password"
 element={<HRChangePassword />}
/>
</Route>

    </Routes>
  );
}

export default AppRoutes;
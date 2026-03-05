
import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import DashBoard from "../Layout/DashBoard";
import ManageUsers from "../Pages/DashBoard/AllUsers/ManageUsers";
import AdminRoutes from "./AdminRoutes";
import BecomeTutor from "../Pages/BecomeTutor/BecomeTutor";
import TeacherRequests from "../Pages/DashBoard/TeachersRequests/TeacherRequests";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "become-tutor",
        element: <PrivateRoutes><BecomeTutor></BecomeTutor></PrivateRoutes>
      }
      
    ]
  },
  
  {
    path: "dashboard",
    element: <PrivateRoutes><DashBoard /></PrivateRoutes>, // Protect the whole dashboard
    children: [
      // Admin Routes
      { 
        path: "manage-users",
        element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
      },
      {
        path: "teachers-requests",
        element: <AdminRoutes><TeacherRequests></TeacherRequests></AdminRoutes>
      }
      // { path: "all-classes", element: <AdminAllClasses /> },

      // // Teacher Routes
      // { path: "add-class", element: <AddClass /> },
      // { path: "my-classes", element: <MyClasses /> },

      // // Student Routes
      // { path: "my-enroll-classes", element: <MyEnrolled /> },
    ]
  }
]);

const Routes = () => {
  return (
    <div> </div>
  );
};

export default Routes;
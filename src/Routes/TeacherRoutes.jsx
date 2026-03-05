import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useTeacher from "../hooks/useTeacher";

const TeacherRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isTeacher, isTeacherLoading] = useTeacher();
    const location = useLocation();

    if (loading || isTeacherLoading) {
        return <span className="loading loading-dots loading-lg"></span>;
    }
    
    if (user && isTeacher) {
        return children;
    }


    return <Navigate to="/" state={{ from: location }} replace />;
};

export default TeacherRoutes;
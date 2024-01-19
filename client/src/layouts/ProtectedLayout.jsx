import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedLayout() {
    const { admin } = useSelector((state) => state.user)
    return admin ? <Outlet /> : <Navigate to='/forbidden' />
}

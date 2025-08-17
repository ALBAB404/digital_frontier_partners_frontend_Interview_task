import { Navigate, Outlet } from "react-router";
import Layout from "../components/Layout";

export const PrivateRoute = ({auth}) => {
  return auth?.authToken ? (
    <>
      <Layout auth={auth}>
        <Outlet />
      </Layout>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Loader from "../common/Loader";
import Sidebar from "../common/Sidebar";

const AppLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      console.log(user);
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loader fullHeight />
  ) : (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;

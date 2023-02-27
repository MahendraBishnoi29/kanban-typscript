import axios from "axios";
import authApi from "../api/authApi";

type Data = {};

interface AxiosResponse<T = any, D = any> {
  id: string;
  user: string;
}

const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res: AxiosResponse = await authApi.verifyToken();
      return res.user;
    } catch (err: any) {
      console.error(err.message);
      return false;
    }
  },
};

export default authUtils;

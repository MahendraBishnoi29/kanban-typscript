import axiosClient from "./axiosClient";

interface Data {
  id: string;
  user: string;
}

const authApi = {
  signup: (params: object) => axiosClient.post("auth/signup", params),
  login: (params: object) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post<Data>("auth/verify-token"),
};

export default authApi;

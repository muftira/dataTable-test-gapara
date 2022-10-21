import axios from "axios";

const base_url = "https://dev-be.trijagabaya.co.id/api";

const validToken = () => {
  const storage = JSON.parse(localStorage.getItem("dataUser"));
  const token = storage?.access_token ?? "";
  return token;
};

export const loginApi = (userName, password) =>
  axios.post(base_url + "/login", { adminpetugasusername: userName, password });
export const getApi = () =>
  axios.get(base_url + "/auth/user-profile", {
    headers: { Authorization: "Bearer " + validToken() },
  });
export const dataTableApi = (startDate, endDate) =>
  axios.post(
    base_url + "/satpam-kegiatan/",
    { startdate: startDate, enddate: endDate },
    { headers: { Authorization: "Bearer " + validToken() } }
  );

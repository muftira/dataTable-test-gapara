import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../utils/Axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await loginApi(userName, password);
      localStorage.setItem("dataUser", JSON.stringify(result.data));
      navigate("Home");
    } catch (error) {
      console.log("GAGAL =>", error);
    }
  };

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    if (dataUser) {
      navigate("/Home");
    }
  }, []);

  return (
    <div className="w-screen h-[calc(100vh-64px)] flex justify-center items-center">
      <div className="h-[300px] sm:w-[400px]  w-[300px] flex flex-col justify-center  border-2 border-neutral-300 shadow-2xl rounded-2xl p-6">
        <p className="sm:w-[400px] flex justify-center font-bold text-xl sm:ml-[-24px] ml-0">
          Admin Petugas
        </p>
        <form className="flex flex-col items-start">
          <p className="text-sm mb-1 mt-4">Username</p>
          <input
            className="ring-2 ring-neutral-400 rounded-md px-1 py-1 sm:w-[350px] w-[250px] text-sm"
            type="email"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <p className="text-sm mb-1 mt-4 ">Password</p>
          <input
            className="ring-2 ring-neutral-400 rounded-md px-1 py-1 sm:w-[350px] w-[250px] text-sm"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            onClick={(e) => login(e)}
            className="sm:w-[350px] w-[250px] h-9 bg-blue-600 rounded-md mt-6 text-sm text-white font-bold"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

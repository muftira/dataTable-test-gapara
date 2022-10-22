import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../utils/Axios";
import DataTable from "../component/DataTable";

function Home() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    if (dataUser) {
      getApi()
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((error) => {
          console.log("GAGAL", error);
        });
    } else {
      navigate("/");
    }
  }, []);

  function logOut(e) {
    e.preventDefault();
    localStorage.removeItem("dataUser");
    navigate("/");
  }

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center ">
      <div className="w-full flex justify-evenly items-center  my-10">
        <p className="font-bold sm:text-3xl text-md">PROFIL</p>
        <button
          onClick={(e) => logOut(e)}
          className="w-20 h-8 bg-blue-600 text-white font-bold active:bg-blue-400 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="sm:w-full sm:flex sm:flex-row flex-col justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="p-4  border-2 border-neutral-500 rounded-md flex justify-center items-center">
          <div className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] border-2 rounded-md mr-2 overflow-hidden">
            <img src={user && user[0].adminpetugasfoto} alt="" />
          </div>
          <div className="text-left sm:text-base text-xs">
            <p>Jabatan : {user && user[0].adminpetugasjabatan}</p>
            <p>Kode : {user && user[0].adminpetugaskode}</p>
            <p>Nama Lengkap : {user && user[0].adminpetugasnamalengkap}</p>
          </div>
        </div>
        <div className="p-4 border-2 border-neutral-500 rounded-md flex justify-center items-center ">
          <div className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] border-2 rounded-md mr-2 overflow-hidden">
            <img src={user && user[0].adminpetugasperusahaanfoto} alt="" />
          </div>
          <div className="text-left sm:text-base text-xs">
            <p>
              Kode Perusahaan : {user && user[0].adminpetugasperusahaankode}
            </p>
            <p>
              Nama Perusahaan : {user && user[0].adminpetugasperusahaannama}
            </p>
            <p>Username : {user && user[0].adminpetugasusername}</p>
          </div>
        </div>
      </div>
      {<DataTable />}
    </div>
  );
}

export default Home;

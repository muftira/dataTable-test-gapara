import React, { useEffect, useState } from "react";
import { dataTableApi } from "../utils/Axios";
import ReactDataTable from "react-data-table-component";

function DataTable() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [dataRes, setDataRes] = useState("");
  const [headers, setHeaders] = useState([]);

  function columns(rows = []) {
    if (rows.length === 0) return [];
    const properti = Object.keys(rows[0]);
    return properti.map((prop, index) => {
      return {
        id: index,
        name: prop.split("satpam")[1],
        selector: (row) => row[prop],
        sortable: true,
        reorder: true,
      };
    });
  }

  function handleIncomingData(data = "") {
    if (!data) return;
    setDataRes(data.data);
  }

  const getData = (e) => {
    e.preventDefault();
    if (!(startDate || endDate)) {
      return false;
    }

    dataTableApi(startDate, endDate)
      .then((res) => {
        if (!res.data) return;
        handleIncomingData(res.data);
        const col = columns(res.data.data);
        setHeaders(col);
      })
      .catch((error) => {
        console.log("GAGAL =>", error);
      });
  };

  return (
    <div className="mt-10 flex flex-col justify-center items-center ">
      <div className="flex justify-center items-center space-x-4">
        <div className="flex justify-center items-center">
          <p>Start Date : </p>
          <input
            className="border-2 border-neutral-300 rounded-md ml-2"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center">
          <p>End Date : </p>
          <input
            className="border-2 border-neutral-300 rounded-md ml-2"
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          className="w-20 h-8 bg-blue-600 text-white font-bold active:bg-blue-400 rounded-md"
          onClick={(e) => getData(e)}
        >
          Search
        </button>
      </div>
      <div className="overflow-auto max-w-7xl mx-auto">
        {dataRes && dataRes?.length > 0 ? (
          <ReactDataTable
            title="Data"
            columns={headers}
            data={dataRes ?? []}
            defaultSortFieldId={1}
            pagination
          />
        ) : (
          <p className="mt-6">No Data</p>
        )}
      </div>
    </div>
  );
}

export default DataTable;

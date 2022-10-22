import React, { useMemo, useState } from "react";
import { dataTableApi } from "../utils/Axios";
import ReactDataTable from "react-data-table-component";
import { customStyles } from "../styles/styles";
import FilterComponent from "../component/FilterComponent";

function DataTable() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataRes, setDataRes] = useState("");
  const [headers, setHeaders] = useState([]);
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

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

  
    const filteredItems = dataRes && dataRes.filter(
      item => item.satpamnamalengkap && item.satpamnamalengkap.toLowerCase().includes(filterText.toLowerCase()),
    );

  console.log('DATA',dataRes);

    
  

  const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

  return (
    <div className="mt-10 flex flex-col justify-center items-center ">
      <p className="font-bold mb-6 sm:text-2xl text-md">LIST DATA SATPAM</p>
      <div className="sm:flex sm:flex-row flex flex-col justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex justify-center items-center">
          <p className="font-bold">Start Date : </p>
          <input
            className=" rounded-md ml-2 border-2 border-black"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center">
          <p className="font-bold">End Date : </p>
          <input
            className=" rounded-md ml-2 border-2 border-black"
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
      <div className="overflow-auto xl:max-w-6xl lg:max-w-4xl sm:max-w-xl max-w-[300px] mx-auto sm:mt-0 mt-14">
        {dataRes && dataRes?.length > 0 ? (
          <ReactDataTable
            
            columns={headers}
            data={filteredItems ?? []}
            defaultSortFieldId={1}
            highlightOnHover='true'
            customStyles={customStyles}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
          />
        ) : (
          <p className="mt-6">No Data</p>
        )}
      </div>
    </div>
  );
}

export default DataTable;

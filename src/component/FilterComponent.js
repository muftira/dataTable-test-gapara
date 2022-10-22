import React from "react";

function FilterComponent({ onFilter, onClear, filterText }) {
  return (
    <div className="w-full h-10 flex flex-col sm:items-end items-center ">
      <div>
        <input className="p-1 border-2 border-black rounded-l-lg text-sm"
          type="text"
          placeholder="Filter By Full Name"
          value={filterText}
          onChange={onFilter}
        />
        <button
          className="w-[35px] h-[33px] bg-blue-600 text-white font-bold active:bg-blue-400 rounded-r-lg"
          onClick={onClear}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default FilterComponent;

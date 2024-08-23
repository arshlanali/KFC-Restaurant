import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

function FilterProduct({ category,onClick,isActive }) {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl p-5  rounded-full cursor-pointer ${isActive ? 'bg-yellow-800 text-white' : 'bg-yellow-500'}`}>
        <CiForkAndKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
}

export default FilterProduct;

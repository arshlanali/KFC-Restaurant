import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteCartItem,increaseQty,decreaseQty } from '../redux/productSlide';

function CardProduct({id,name,image,category,qty,total,price}) {
  const dispatch=useDispatch();
  return (
    <div className='bg-slate-350 p-2 flex gap-4 rounded border-2 border-slate-300'>
      <div className='bg-white p-3 rounded overflow-hidden'>
        <img src={image} className='h-28 w-40 object-cover' alt="" />
      </div>
      <div className="flex flex-col gap-1 w-full">
          <div className='flex justify-between'>
          <h3 className="font-semibold  text-slate-600 capitalize text-lg md:text-xl ">
            {name}
          </h3>
          <div className='cursor-pointer text-slate-700 hover:text-red-700' onClick={()=>dispatch(deleteCartItem(id))}>
          <MdDelete/>
          </div>
          </div>
          <p className=" text-slate-500 capitalize font-medium">
            {category}
          </p>
          <p className=" font-bold text-base">
            <span className="text-red-500">₹</span>
            <span>{price}</span>
          </p>
          <div className='flex justify-between'>
          <div className="flex items-center gap-3">
            <button onClick={()=>dispatch(increaseQty(id))}className="bg-slate-400 py-2 mt-2 p-1 rounded hover:bg-yellow-600 ">
              <FaPlus/>
            </button>
            <p className='font-semibold p-1'>{qty}</p>
            <button onClick={()=>dispatch(decreaseQty(id))} className="bg-slate-400 py-2 mt-2 p-1 rounded hover:bg-yellow-600 ">
             <FaMinus/>
            </button>
          </div>
          <div className='flex items-center gap-2 font-bold text-slate-700'>
            <p>Total : </p>
            
            <p><span className="text-red-500">₹</span>{total}</p>
          </div>
          </div>
          
        </div>
    </div>
  )
}

export default CardProduct

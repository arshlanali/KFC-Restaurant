import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlide";

function CardFeature({ image, name, price, category, loading, id}) {
  const dispatch = useDispatch()
  const handleAddCartProduct=(e)=>{
    dispatch(addCartItem({
      _id : id,
      name : name,
      image : image,
      category : category,
      price : price
  }))
  }
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
      {
        image?
        <>
        <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:'0',behavior:'smooth'})}>
        <div className="h-28 flex justify-center">
        <img src={image} alt='' className="h-full" />
        </div>
        <h3 className="font-semibold text-center text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
          {name}
        </h3>
        <p className="text-center text-slate-500 text-medium capitalize">{category}</p>
        <p className="text-center font-bold">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
        </Link>
        <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full" onClick={handleAddCartProduct}>Add to Cart</button>
        </>
        :
        <div className="min-h-[200px] flex justify-center items-center"><p>{loading}</p></div>
      }
      
    </div>
    
  );
}

export default CardFeature;

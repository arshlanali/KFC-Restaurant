import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";

function Menu() {
  const navigate=useNavigate();
  const dispatch = useDispatch()
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  // console.log(productDisplay);

  const handleAddCartProduct=(e)=>{
    dispatch(addCartItem(productDisplay))
  }

  const handleBuy=()=>{
    dispatch(addCartItem(productDisplay))
    navigate('/cart');
  }
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl bg-white m-auto md:flex">
        <div className="w-full max-w-sm overflow-hidden p-5 ">
          <img
            src={productDisplay.image}
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold  text-slate-600 capitalize text-2xl md:text-4xl ">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500 text-medium capitalize md:text-2xl">
            {productDisplay.category}
          </p>
          <p className=" font-bold md:text-2xl">
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3">
            <button className="bg-yellow-500 py-2 mt-2 min-w-[100px] rounded hover:bg-yellow-600" onClick={handleBuy}>
              Buy Now
            </button>
            <button onClick={handleAddCartProduct} className="bg-yellow-500 py-2 mt-2 min-w-[100px] rounded hover:bg-yellow-600">
              Add to Cart
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description: </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={'Related Product'}/>
    </div>
  );
}

export default Menu;

import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast from "react-hot-toast";

function Newproduct() {
  const [data,setData]=useState({
    name : '',
    category : '',
    image : '',
    price : '',
    description : ''
  })

  const handleOnChange=(e)=>{
    const {name,value}=e.target;
    setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
  
  }
  
  const uploadImage = async(e)=>{
    const data= await ImagetoBase64(e.target.files[0]);
    // console.log(data);
    setData((prev)=>{
      return{
        ...prev,
        image : data
      }
    })
  }

  const handleOnSubmit=async(e)=>{
    e.preventDefault();
    // console.log(data);

    const {name,image,category,price}=data
    if(name && image && category && price){
      const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method : 'POST',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(data)
      })
      const fetchRes=await fetchData.json()
      // console.log(fetchRes);
      toast(fetchRes.message);
      setData(()=>{
        return{
          name : '',
          category : '',
          image : '',
          price : '',
          description : ''
        }
      })
    }
    else{
      toast('Enter required Fields');
    }
  }

  return (
    <div className="">
      <form className="p-4 m-auto w-full max-w-md shadow flex flex-col bg-white" onSubmit={handleOnSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 mt-1 mb-3"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select className="bg-slate-200 p-1 mt-1 mb-3" onChange={handleOnChange} name="category" value={data.category}>
          <option value={'other'}>Select Category</option>
          <option value={'fruits'}>Fruits</option>
          <option value={'vegetable'}>Vegetable</option>
          <option value={'icecream'}>Ice Cream</option>
          <option value={'dosa'}>Dosa</option>
          <option value={'pizza'}>Pizza</option>
          <option value={'rice'}>Rice</option>
          <option value={'cake'}>Cake</option>
          <option value={'burger'}>Burger</option>
        </select>

        <label htmlFor="image">Image
        <div
          className="h-40 w-full bg-slate-200 mt-1 mb-3 rounded flex items-center justify-center cursor-pointer">
          {
            data.image ? <img src={data.image} className="h-full"/> : <span className="text-4xl"><IoCloudUploadOutline /></span>
          }
          
          <input type={'file'} accept='image/*' id="image" onChange={uploadImage} className="hidden"/>
        </div>
        </label>

        <label htmlFor="price">Price</label>
        <input type={"text"} className="bg-slate-200 p-1 mt-1" onChange={handleOnChange} name="price" value={data.price}/>
        
        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          className="bg-slate-200 p-1 mt-1 resize-none" onChange={handleOnChange} name="description" value={data.description}
        ></textarea>
        
        <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full my-3">
          Save
        </button>
      </form>
    </div>
  );
}

export default Newproduct;

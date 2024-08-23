import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import loginsignupImage from "../assets/login-animation.gif";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast, { Toaster } from 'react-hot-toast';


function Signup() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
  });
  // console.log(data);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage=async(e)=>{
    const data=await ImagetoBase64(e.target.files[0]);
    setData((prev)=>{
      return{
        ...prev,
        image: data
      }
    })
  }
  // console.log(data);
  // console.log(process.env.REACT_APP_SERVER_DOMIN)

  const handleSubmit = async(e) => {
    e.preventDefault(); //page will not refresh
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
          method: 'POST',
          headers:{
            'content-type' : 'application/json'
          },
          body: JSON.stringify(data)
        });
        const dataRes = await fetchData.json()
        // console.log(dataRes);
        
        // alert(dataRes.message);
        toast(dataRes.message);
        if(dataRes.alert){
          navigate('/login');
        }
      } else {
        alert("Password and Confirm Password should be same");
      }
    } else {
      alert("Please enter required fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex items-center flex-col p-4">

        <h1 className="text-center text-2xl font-bold ">Sign Up</h1>
        <label htmlFor="profileImage">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative cursor-pointer">
          <img className="w-full h-full" src={data.image ? data.image : loginsignupImage} alt="" />

          
          <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
          <p className="text-sm p-0.5 text-white">Upload</p>
        </div>
        <input className='hidden' type={'file'} accept='image/*' id='profileImage' onChange={handleUploadProfileImage}/>
        
        </div>
        </label>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>

          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="my-2 w-full bg-slate-200 rounded-lg px-2 py-1"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="my-2 w-full bg-slate-200 rounded-lg px-2 py-1"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="my-2 w-full bg-slate-200 rounded-lg px-2 py-1"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="my-2 w-full px-2 py-1 bg-slate-200 rounded-lg "
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer text-xl "
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="my-2 w-full px-2 py-1 bg-slate-200 rounded-lg "
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer text-xl "
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full my-3">
            Sign Up
          </button>

        </form>

        <p className="text-left text-xs">
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;

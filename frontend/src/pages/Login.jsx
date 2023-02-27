import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { sentotpfunction } from "../services/Apis";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const navigate =useNavigate();

const sendotp =async(e)=>{
    e.preventDefault();
  if(email ==="")
  {
    toast.error("Enter your email");
  }
  else if(!email.includes("@")){
    toast.error("Enter valide email")
  }
  else{
   const data ={
    email:email
   }

   const response =await sentotpfunction(data);
      if(response.status ===200){
             navigate("/user/otp",{state:email})
      }else{
        toast.error(response.response.data.error);
      }


  }
}



  return (
    <div>
      <div>
        <h1>Welcome back login</h1>
        <p>Hi , glad to come here for login</p>
        <div>
          <input
            type="text"
            placeholder="enter your email"
            onChange={(e)=>setemail(e.target.value)}
            className="border-solid border-4 font-semibold border-blue-800 w-[14rem] h-[2rem] p-2"
          />
          <button className="bg-black rounded-md text-white font-bold w-[6rem] mt-[1rem] ml-4"
             onClick={sendotp}>
            Login
          </button>
        </div>
        <p>
          Don't have an account<NavLink to="/register">Sign up</NavLink>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;

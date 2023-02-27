import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userverify } from '../services/Apis';

const Otp = () => {
  const [otp,setotp] =useState("");

const location =useLocation()
const navigate =useNavigate();
console.log(location);
  const sendotp =async()=>{
           if(otp ===""){
            toast.error("enter your otp")
           }else if(!/[^a-zA-Z]/.test(otp)){
            toast.error("enter valid otp")
           }else if(otp.length<6){
            toast.error(" otplength minimum 6 digit")
           }else{
            const data ={otp,email:location.state}
             const response =await userverify(data)
             if(response.status ===200){
              localStorage.setItem("userdbtoken",response.data.userToken);
              toast.success(response.data.message);
              setTimeout(()=>{
                    navigate("/dashboard")
              },5000)
             }

             else{
              toast.error(response.response.data.error)
             }

           }
  }
  return (
    <div>
        <div>
          <h1>OTP PAGE</h1>
          <input
            type="text"
            placeholder="enter your OTP"
            onChange={(e)=>setotp(e.target.value)}
            className="border-solid border-4 font-semibold border-blue-800 w-[14rem] h-[2rem] p-2"
          />
          <button className="bg-black rounded-md text-white font-bold w-[6rem] mt-[1rem] ml-4"
             onClick={sendotp}>
            Submit
          </button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Otp
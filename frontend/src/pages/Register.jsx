import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { registerfunction } from "../services/Apis";
import {useNavigate} from "react-router-dom"

const Register = () => {
const [input,setinput] =useState({
    fname:"",
    email:"",
    password:""
})

const navigate =useNavigate()

  const [passshow, setpassshow] = useState(false);

  const handleChange =  (e) => {
    const {name,value} =e.target
    setinput({...input,[name]:value})
  };

  const handlsubmit =async(e)=>{
    e.preventDefault();
    const {fname,email,password} =input;
    if(fname === "")
    {
        toast.error("Enter Your name")
    }
    else if(email ===""){
      toast.error("enter your email")
    }else if(!email.includes("@")){
        toast.error("enter valid email")

    }else if(password ===""){
        toast.error("enter your password") 
    }
    else if(password.length <6 ){
      toast.error("password length minimum 6 character")
    }
    else{
     const response =await registerfunction(input)
     if(response.status===200){
      setinput({...input,fname:"",email:"",password:""})
          navigate("/")
     }else{
      toast.error(response.response.data.error)
     }
    }

  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold ml-[27rem] mt-[3rem]">Register</h1>
        <div className="flex flex-col ml-[29rem] mt-[1rem] ">
          <input
            type="text"
            name="fname"
            placeholder="enter name"
            onChange={handleChange}
            className="border-solid border-4 font-semibold border-blue-800 w-[14rem] h-[2rem] p-2"     
          />
          <input
            type="text"
            name="email"
            placeholder="enter email"
            className="border-solid border-4 font-semibold mt-2 border-blue-800 w-[14rem] h-[2rem] p-2"
              onChange={handleChange}
          />
          <div className="flex flex-row">
            <input
              type={!passshow ? "password" : "text"}
              name="password"
              placeholder="enter password"
              onChange={handleChange}
              className="border-solid border-4 font-semibold mt-2 border-blue-800 w-[14rem] h-[2rem] p-2"     
            />
            <button
              className="bg-black rounded-md text-white font-bold w-[6rem] mt-[1rem] ml-4"
              onClick={() => setpassshow(!passshow)}
            >
              {!passshow ? "show" : "hide"}
            </button>
          </div>
          <button
            className="bg-black rounded-md text-white font-bold w-[6rem] mt-[1rem] ml-4"
          onClick={handlsubmit}
          >
            Signup
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;

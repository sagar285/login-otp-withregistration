import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dahboard = () => {
  const navigate =useNavigate()
  const uservalid =()=>{
    let token =localStorage.getItem("userdbtoken");
    if(token){
      console.log("user valid");
    }else{
      navigate("*")
    }
  }

  useEffect(()=>{
    uservalid();
  },[])
  return (
    <div>Dahboard</div>
  )
}

export default Dahboard
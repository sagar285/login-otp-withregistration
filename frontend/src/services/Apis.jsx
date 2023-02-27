import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./Helper";

export const registerfunction =async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/register`,data)
}


export const sentotpfunction =async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/sendotp`,data)
}

export const userverify =async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/userverify`,data)
}
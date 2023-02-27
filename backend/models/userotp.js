const mongoose =require("mongoose")
const validator =require("validator")

const userotpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not valid Email");
            }
        }
    },
    otp:{
        type:String,
        required:true
    }
})

const userotp =new mongoose.model("userotps",userotpSchema)
module.exports =userotp
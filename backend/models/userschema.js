const mongoose =require("mongoose")
const validator =require("validator")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")
const SECRET_KEY ="dsbhjdfhjcxkjzjkvchvjchjkjkjkjkfffjgfifdkkkviffiff"

const userSchema =new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
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
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
})


userSchema.methods.generateAuthtoken =async function(){
    try {
        
         let newtoken =jwt.sign({_id:this._id},SECRET_KEY,{
            expiresIn:"1d"
         })
        this.tokens =this.tokens.concat({token:newtoken});
        await this.save();
        return newtoken;

    } catch (error) {
        res.status(400).json(error)
    }
}

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password =await bcrypt.hash(this.password,12);
    }
    next();
})






const User = new mongoose.model("Userdata",userSchema)

module.exports =User;
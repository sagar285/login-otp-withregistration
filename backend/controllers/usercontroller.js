const User = require("../models/userschema");
const userotp = require("../models/userotp");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user:"gtest3681@gmail.com",
    pass:"snuzsancvuyyhydq"
}
});

exports.userregister = async (req, res) => {
  const { fname, email, password } = req.body;
  if (!fname || !email || !password) {
    res.status(400).json({ error: "please enter all inputdata" });
  }

  try {
    const preuser = await User.findOne({ email: email });
    if (preuser) {
      res.status(400).json({ error: "this user already existed" });
    } else {
      const userregister = new User({ fname, email, password });
      const storedata = await userregister.save();
      res.status(200).json(storedata);
    }
  } catch (error) {
    res.status(400).json({ error: "ivalid detail", error });
  }
};

exports.userotpsend = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "please enter your email" });
  }

  try {
    const preuser = await User.findOne({ email: email });
    if (preuser) {
      const OTP = Math.floor(100000 + Math.random() * 900000);

      const existEmail = await userotp.findOne({ email: email });
      if (existEmail) {
        const updatedata = await userotp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );

        await updatedata.save();

        const mailOptions = {
          from:"gtest3681@gmail.com",
          to: email,
          subject: "sending for otpvalidation",
          text: `OTP:-${OTP}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("email send", info.response);
            res.status(200).json({ message: "email send succesfully" });
          }
        });
      } else {
        const saveotpdata = new userotp({ email, otp: OTP });
        await saveotpdata.save();
        const mailOptions = {
          from:"gtest3681@gmail.com",
          to: email,
          subject: "sending for otpvalidation",
          text: `OTP:-${OTP}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("email send", info.response);
            res.status(200).json({ message: "email send succesfully" });
          }
        });
      }
    } else {
      res.status(400).json({ error: "this user not existed in our database" });
    }
  } catch (error) {
    res.status(400).json({ error: "ivalid detail", error });
  }
};


exports.userlogin =async(req,res)=>{
   const {otp,email} =req.body

   if(!otp || !email){
    res.status(400).json({error:"please Enter your otp and email"})
   }

   try {

    const otpverification =await userotp.findOne({email:email})
         if(otpverification.otp === otp){
              
          const preuser = await User.findOne({email:email});

          const token =await preuser.generateAuthtoken();
          res.status(200).json({message:"User Login Succesfuly",userToken:token})

         }else{

          res.status(400).json({error:"Invalid otp"})
         } 
   } catch (error) {
      
         res.status(400).json({error:"Invalid Details",error})

   }
}

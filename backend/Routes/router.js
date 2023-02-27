const express =require("express")
const router =new express.Router();
const  controllers =require("../controllers/usercontroller")

router.post("/user/register",controllers.userregister)
router.post("/user/sendotp",controllers.userotpsend)
router.post("/user/userverify",controllers.userlogin)




module.exports =router
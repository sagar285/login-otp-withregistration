const express =require("express");
require("dotenv").config();
const app =express();
const cors =require("cors")
require("./db/connection")
const router =require("./Routes/router")
const port=3000

app.use(express.json())
app.use(cors());
app.use(router)




app.listen(port,()=>{
    console.log(`server runing on port ${port}`);
})
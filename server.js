const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB")
//*** middleware global
const app = express();
app.use(express.json())
//******data base******** */
connectDB();
//******router******** */
app.use("/api/product" ,require("./router/product")  )
app.use("/api/order" ,require("./router/order")  )
//***************************** */
const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running in PORT= ${PORT}`)
);
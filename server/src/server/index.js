const { json } = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
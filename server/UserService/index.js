"use strict";
require('dotenv').config()
const express = require("express")
const app = express();
const cors = require("cors");
const config = require("./config");

const authRoute = require("./routes")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoute);

app.get('/', (req, res) => {
    res.send({ status: "Ok", message: "Api!" });
} )
app.get("*", (req, res) => {
    res.status(404).send({ message: "Page not found" });
  });

const PORT = process.env.APP_SERVER_PORT;
app.listen( PORT, () => console.log( `Server running on localhost ${ PORT }` ) )

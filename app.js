const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dex"));
app.use(express.urlencoded({extended:false}));
// app.use(express.)

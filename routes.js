const express = require ("express");
const router = express.Router();
const layout = require("./views/layout")
const { db } = require('./models/index');

db.authenticate().
then(() => {
  console.log('Connected to the database!');
})


router.get("/", (req,res,next)=>{
  res.send(layout("hello there"));
  next();
})

module.exports = router;

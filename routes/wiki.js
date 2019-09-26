const express = require ("express");
const router = express.Router();
const { db } = require('../models/index');
const {addPage, main} = require('../views');
// const addPage = require('../views/addPage');
// const main = require('../views/main');

db.authenticate().
then(() => {
  console.log('(wiki) Connected to the database!');
})

router.get("/", (req,res,next)=>{
  res.send(main());
  next();
})

router.get("/add", (req, res, next) => {
  res.send(addPage());
})

router.post("/", (req, res, next) => {
  //submit new page
})

module.exports = router;

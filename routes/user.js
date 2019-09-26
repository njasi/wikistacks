const express = require ("express");
const router = express.Router();
const { db , Page, User} = require('../models/index');
const {userPages, userList} = require("../views");

db.authenticate().
then(() => {
  console.log('(users) Connected to the database!');
})

router.get("/", async (req,res,next)=>{
  const users = await Page.findAll();
  res.send(userList(users));
})

router.get("/:id", async (req,res,next)=>{
  const pages = await Page.findAll({
    where:{
      authorId: req.params.id
    }
  });
  const user = await User.findByPk(req.params.id);

  res.send(userPages(user,pages));
  next();
})

module.exports = router;

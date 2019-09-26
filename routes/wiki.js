const express = require ("express");
const router = express.Router();
const { db , Page, User} = require('../models/index');
const {addPage, main} = require('../views');
const wikipage = require("../views/wikipage")

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
  next()
})

router.get("/:slug", async (req, res, next) => {
  let page = await Page.findAll({
    where:{
      slug : req.params.slug
    }
  })
  res.send(wikipage(page[0]));
  next()
})

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.active
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
})

module.exports = router;

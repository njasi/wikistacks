const express = require ("express");
const router = express.Router();
const { db , Page, User} = require('../models/index');
const {addPage, main} = require('../views');
const wikipage = require("../views/wikipage")

db.authenticate().
then(() => {
  console.log('(wiki) Connected to the database!');
})

router.get("/", async (req,res,next)=>{
  const pages = await Page.findAll();
  res.send(main(pages));
  next();
})

router.get("/add", (req, res, next) => {
  res.send(addPage());
  next()
})

router.get("/:slug", async (req, res, next) => {
  const page = await Page.findAll({
    where:{
      slug : req.params.slug
    }
  })
  const author = await User.findByPk(page[0].authorId);
  res.send(wikipage(page[0],author));
  next()
})

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });


  try {
    const user = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    })

    await page.save();
    page.setAuthor(user[0]);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
})

module.exports = router;

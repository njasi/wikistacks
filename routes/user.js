const express = require ("express");
const router = express.Router();
const layout = require("../views/layout")
const { db } = require('../models/index');

db.authenticate().
then(() => {
  console.log('(users) Connected to the database!');
})





module.exports = router;

const express = require("express");
const morgan = require("morgan");
const router = require("./routes")

const app = express();

app.use(morgan("dex"));
app.use(express.urlencoded({extended:false}));

app.use(router);

const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`App listening on port ${PORT}!`);
});
// app.use(express.)

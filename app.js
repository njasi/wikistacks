const express = require("express");
const morgan = require("morgan");
const routerWiki = require("./routes/wiki")
const routerUser = require("./routes/user")


const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

app.use('/wiki', routerWiki);
app.use('/user', routerUser);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
})

const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`App listening on port ${PORT}!`);
});
// app.use(express.)

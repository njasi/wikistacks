const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack',{
  logging: false
});
const Slugger = require("../utils/slug.js")

const Page = db.define("Page",{
  title :{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  slug : {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'open'
  }
})

Page.beforeValidate((page)=>{
  page.slug = Slugger(page.title);
})

const User = db.define("User",{
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  }
})

Page.belongsTo(User, { as: 'author' });

const init = async () => {
  // DEV
  // await db.sync({ force: true});

  // PROD
  await db.sync();
}

init();

module.exports = {
  db, Page, User
}

This is The Odin Project's Project: Inventory App (https://www.theodinproject.com/lessons/nodejs-inventory-application)

Making this with Express and MongoDB. MongoDB Atlas is used with Mongoose ODM for database management.

run > npm init

To connect to MongoDB use you own database url in app.js.
A good guide is written here: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "insert_your_database_url_here";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


run > npm run serverstart

goto: localhost:3000

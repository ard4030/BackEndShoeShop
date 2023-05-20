// const Application = require("./app/server");
// const DB_URL = "mongodb://novinco2_shop:Ard40301376@localhost:27017/novinco2_shop";
// require("dotenv").config();
// new Application(DB_URL,3560);

const Application = require("./app/server");
const DB_URL = "mongodb://localhost:27017/newShoeShop";
require("dotenv").config();
new Application(DB_URL,7251);
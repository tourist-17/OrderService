const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  PRODUCT_SERVICE_PATH: process.env.PRODUCT_SERVICE_PATH,
};

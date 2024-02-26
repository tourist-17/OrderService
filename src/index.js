const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const setupAndstartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/orderservice/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`server started at Port ${PORT}`);
  });
};
setupAndstartServer();

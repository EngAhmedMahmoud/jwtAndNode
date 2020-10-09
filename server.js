"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const PORT = require("./src/config/setting.json").PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//our routes
require("./src/routes")(app);

app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});

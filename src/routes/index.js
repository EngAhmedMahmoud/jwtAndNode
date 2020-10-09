"use strict";
module.exports = (app) => {
  require("./auth")(app);
  require("./../middlewares/auth")(app);
  require("./users")(app);
};

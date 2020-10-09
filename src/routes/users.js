"use strict";
const API_RESPONSE = require("./../utils/api_response");
module.exports = (app) => {
  app.get("/api/v1/user", (req, res, next) => {
    let user = req.user;
    let { code, response } = API_RESPONSE(user, 200, null);
    return res.status(code).json(response);
  });
};

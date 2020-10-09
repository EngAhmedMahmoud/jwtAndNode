"use strict";
const authenticationController = require("./../controllers/authentication");
module.exports = (app) => {
  app.post("/api/v1/login", (req, res, next) => {
    let { username, password } = req.body;
    let auth = authenticationController.login({ username, password });
    let { response, code } = auth;
    return res.status(code).json(response);
  });
};

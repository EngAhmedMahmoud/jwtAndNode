"use strict";
const SECRET = require("./../config/setting.json").SECRET;
const jwt = require("jsonwebtoken");
const API_RESPONSE = require("./../utils/api_response");
module.exports = (app) => {
  app.use((req, res, next) => {
    //read token from authorization header
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];
    //if header not contains token
    if (!token) {
      let apiRes = API_RESPONSE(null, 402, ["Un-Authorized !!"]);
      return res.status(apiRes.code).json(apiRes.response);
    }
    try {
      //decode payload using token and secret
      let decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      let apiRes = API_RESPONSE(null, 402, ["Un-Authorized !!"]);
      return res.status(apiRes.code).json(apiRes.response);
    }
  });
};

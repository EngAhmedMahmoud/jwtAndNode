"use strict";
const User = require("./../models/users");
const API_RESPONSE = require("./../utils/api_response");
const SETTING = require("./../config/setting.json");
const jwt = require("jsonwebtoken");
class Authentication {
  login(user) {
    let { username, password } = user;
    //validate that username and password having values
    let check = this.checkRequired({ username, password });
    if (check.length) {
      //return err msg in the response
      return API_RESPONSE(null, 400, check);
    } else {
      //check if user exist or not
      let userAccount = User.find((user) => {
        return user.username === username && user.password === password;
      });
      if (userAccount) {
        //return signed token expaires after one hour with payload of {id,firstName,lastName}
        let payload = {
          id: userAccount.id,
          firstName: userAccount.firstName,
          lastName: userAccount.lastName,
        };
        const accessToken = jwt.sign(payload, SETTING.SECRET, {
          algorithm: "HS256",
          expiresIn: SETTING.EXPIRE,
        });
        return API_RESPONSE({ token: accessToken }, 200, null);
      } else {
        //return err msg check your username and password
        return API_RESPONSE(null, 400, [
          "Login fail check your username & password",
        ]);
      }
    }
  }
  checkRequired(fields) {
    const errors = [];
    let keys = Object.keys(fields);
    keys.forEach((key) => {
      if (!fields[key]) errors.push(`${key} is required!`);
    });
    return errors;
  }
}
module.exports = new Authentication();

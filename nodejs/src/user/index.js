const userModel = require("./user.model");
const { register, login } = require("./user.controller");
const userRoute = require("./user.route");

module.exports = {
  userModel,
  register, login,
  userRoute
};
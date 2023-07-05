const userModel = require("./user.model");
const catchAsyncError = require("../../utils/catchAsyncError");
const ErrorHandler = require("../../utils/errorHandler");

const sendData = (user, statusCode, res) => {
  const token = user.getJWTToken();

  res.status(statusCode).json({
    user,
    token,
  });
};

exports.register = catchAsyncError(async (req, res, next) => {
  console.log("user register", req.body);

  const user = await userModel.create(req.body);
  sendData(user, 200, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  console.log("user login", req.body);
  const { username, password } = req.body;

  if (!username || !password)
    return next(new ErrorHandler("Please enter your username and password", 400));

  const user = await userModel.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid username or password!", 401));

  sendData(user, 200, res);
});
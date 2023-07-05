const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const isAlphaNumeric = (str) => {
  var re = /^[a-zA-Z0-9]+$/;
  return re.test(str);
};

const validatePassword = (password) => {
  var re = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
  return re.test(password);
};

const userSchema = new mongoose.Schema({
	username: {
		type: String,
    unique: true,
		minLength: [6, "Username must be at least 6 characters long."],
		maxLength: [12, "Username should have maximum 12 characters."],
		required: [true, "Username is required."],
    validate: [isAlphaNumeric, "Username to be alphanumeric."],
	},
	password: {
		type: String,
		minLength: [6, "Password must be 6 characters long."],
    validate: [validatePassword, "Password must contain at least one alphabet, one digit and one special characters."],
		required: [true, "Password is required."],
	},
}, { timestamps: true });


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 11);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE,
  });
};


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;


const Token = require("../models/user.token.model");
const User = require("../models/user.model");
const checkTokenValid = async (req, res) => {
  const { email, newPassword, verificationCode } = req.body;
  const existingUser = await User.findByEmail(email);
  if (!existingUser) {
    return res.status(400).json({
      message: "Please go back and request a token again",
      type: false,
    });
  }

  const validToken = await Token.checkToken(email, verificationCode);
  console.log(validToken);
  if (!validToken) {
    return res.status(400).json({
      message: "Your verification code has either been expired or wrong",
      type: false,
    });
  }
  try {
    console.log(email, newPassword);
    await User.updateUserPassword(email, newPassword);
  } catch (err) {
    return res.status(500).json({
      message: "Internal System Error, Please try again later or Contact Admin",
      type: false,
    });
  }
  return res.status(201).json({
    message: "Your password has been updated",
    type: true,
  });
};
module.exports = { checkTokenValid };

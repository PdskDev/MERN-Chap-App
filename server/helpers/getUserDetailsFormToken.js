const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

async function getUserDetailsFormToken(token) {
  if (!token) {
    return {
      message: "Session out",
      logout: true,
    };
  }

  const tokenDecode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await UserModel.findById(tokenDecode.id).select("-password");

  if (!user) {
    return {
      message: "User does not exist",
      error: true,
    };
  }
  return { message: "User information", success: true, data: user };
}

module.exports = getUserDetailsFormToken;

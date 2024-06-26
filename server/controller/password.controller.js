const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const returnServerError = require("../helpers/serverErrorHandler");

async function checkPasswordController(request, response) {
  try {
    const { password, userId } = request.body;

    if (password === null || password === "" || password === undefined) {
      response.status(400).json({
        message: "Password must be indicated",
        error: true,
      });
      return;
    }

    if (userId === null || userId === "" || userId === undefined) {
      response.status(400).json({
        message: "User Id must be indicated",
        error: true,
      });
      return;
    }

    const userToCheck = await UserModel.findById(userId);

    if (!userToCheck) {
      response.status(401).json({
        message: "Unauthorized connection",
        error: true,
      });
      return;
    }

    const verifyPassword = await bcryptjs.compare(
      password,
      userToCheck.password
    );

    if (!verifyPassword) {
      response.status(401).json({
        message: "Please check password",
        error: true,
      });
      return;
    }

    const userTokenData = {
      id: userToCheck._id,
      email: userToCheck.email,
    };

    const userToken = await jwt.sign(
      userTokenData,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    const returnData = {
      name: userToCheck.name,
      email: userToCheck.email,
      profile_pic: userToCheck.profile_pic,
      token: userToken,
    };

    return response
      .cookie("access_token", userToken, cookieOptions)
      .status(200)
      .json({
        message: "Logged in succesfully",
        success: true,
        data: returnData,
      });
  } catch (error) {
    return await returnServerError(error, response);
  }
}

module.exports = checkPasswordController;

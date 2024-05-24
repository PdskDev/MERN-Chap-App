const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user.model");

async function checkPassword(request, response) {
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
        message: "Unauthorized user",
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
        message: "Unauthorized connection",
        error: true,
      });
      return;
    }

    const returnData = {
      message: "Login succesfully",
      success: true,
      data: {
        name: userToCheck.name,
        email: userToCheck.email,
        profile_pic: userToCheck.profile_pic,
      },
    };

    return response.status(200).json({
      message: "User verified successfully",
      success: true,
      data: returnData,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;

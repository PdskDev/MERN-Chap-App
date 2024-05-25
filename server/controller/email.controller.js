const returnServerError = require("../helpers/serverErrorHandler");
const UserModel = require("../models/user.model");

async function checkEmailController(request, response) {
  try {
    const { email } = request.body;
    if (email === null || email === "" || email === undefined) {
      response.status(400).json({
        message: "Email must be indicated",
        error: true,
      });
      return;
    }

    const checkedEmail = await UserModel.findOne({ email }).select("-password");

    if (!checkedEmail) {
      response.status(404).json({
        message: "User does not exist",
        error: true,
      });
      return;
    }

    return response.status(200).json({
      message: "Email verified successfully",
      success: true,
      data: checkedEmail,
    });
  } catch (error) {
    return await returnServerError(error, response);
  }
}

module.exports = checkEmailController;

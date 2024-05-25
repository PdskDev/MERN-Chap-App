const getUserDetailsFormToken = require("../helpers/getUserDetailsFormToken");
const returnServerError = require("../helpers/serverErrorHandler");
const UserModel = require("../models/user.model");

async function updateUserDetailsController(request, response) {
  try {
    const { name, profile_pic } = request.body;

    if (
      (name === null || name === "" || name === undefined) &&
      (profile_pic === null || profile_pic === "" || profile_pic === undefined)
    ) {
      response.status(400).json({
        message: "Name or Profile_pic must be indicated",
        error: true,
      });
      return;
    }

    const token = request.cookies.access_token || "";
    const userInfo = await getUserDetailsFormToken(token);

    if (!userInfo.data) {
      return response.status(404).json(userInfo);
    }

    const userUpdateInfo = await UserModel.updateOne(
      { _id: userInfo.data._id },
      {
        name,
        profile_pic,
      }
    );

    const updatedUserInformation = await UserModel.findById(
      userInfo.data._id
    ).select("-password");

    return response.status(200).json({
      message: "User information was updated successfully",
      success: true,
      data: updatedUserInformation,
    });
  } catch (error) {
    return await returnServerError(error, response);
  }
}

module.exports = updateUserDetailsController;

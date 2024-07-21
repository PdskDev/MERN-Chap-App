const returnServerError = require("../helpers/serverErrorHandler");
const UserModel = require("../models/user.model");

async function searchUser(request, response) {
  try {
    const { search } = request.body;
    const query = new RegExp(search, "i", "g");

    const usersFoundOrNot = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    console.log("search word", search);

    return response.status(200).json({
      message: "All users found",
      data: usersFoundOrNot,
      success: true,
    });
  } catch (error) {
    return await returnServerError(error, response);
  }
}

module.exports = searchUser;

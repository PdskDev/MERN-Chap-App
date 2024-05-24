const UserModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
async function registerUser(request, response) {
  try {
    const { name, email, password, profile_pic } = request.body;
    const checkEmailExist = await UserModel.findOne({ email });

    if (checkEmailExist) {
      return response.status(400).json({
        message: "Already user exist",
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(password, salt);

    const newUserPayload = {
      name,
      email,
      password: passwordHashed,
      profile_pic,
    };

    const newUserToRegister = new UserModel(newUserPayload);
    const newUserCreated = await newUserToRegister.save();

    return response.status(201).json({
      message: "User was created successfully",
      data: newUserCreated,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser;

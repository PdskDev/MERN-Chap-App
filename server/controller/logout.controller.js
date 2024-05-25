const returnServerError = require("../helpers/serverErrorHandler");

async function logout(request, response) {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    return response.cookie("access_token", "", cookieOptions).status(200).json({
      message: "User session out",
      success: true,
    });
  } catch (error) {
    return await returnServerError(error, response);
  }
}

module.exports = logout;

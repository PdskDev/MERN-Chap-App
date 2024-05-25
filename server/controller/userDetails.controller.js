const getUserDetailsFormToken = require("../helpers/getUserDetailsFormToken");

async function userDetailsController(request, response) {
  try {
    const token = request.cookies.access_token;
    const info = await getUserDetailsFormToken(token);
    return response.status(200).json(info);
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userDetailsController;

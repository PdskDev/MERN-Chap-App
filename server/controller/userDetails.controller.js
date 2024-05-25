const getUserDetailsFormToken = require("../helpers/getUserDetailsFormToken");
const returnServerError = require("../helpers/serverErrorHandler");

async function userDetailsController(request, response) {
  try {
    const token = request.cookies.access_token;
    const info = await getUserDetailsFormToken(token);
    return response.status(200).json(info);
  } catch (error) {
    return await returnServerError(error, response);
  }
}

module.exports = userDetailsController;

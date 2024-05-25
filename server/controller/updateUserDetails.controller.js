const returnServerError = require("../helpers/serverErrorHandler");

async function updateUserDetails(request, response) {
  try {
    const { name, email, profile_pic } = request.body;
  } catch (error) {
    return await returnServerError(error, response);
  }
}

module.exports = updateUserDetails;

async function userDetailsController(request, reponse) {
  try {
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userDetailsController;

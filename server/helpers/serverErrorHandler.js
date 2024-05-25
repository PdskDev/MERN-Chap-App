async function returnServerError(error, response) {
  response.status(500).json({
    message: error.message || error,
    error: true,
  });
}

module.exports = returnServerError;

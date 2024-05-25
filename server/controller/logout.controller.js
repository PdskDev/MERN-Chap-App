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
    response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = logout;

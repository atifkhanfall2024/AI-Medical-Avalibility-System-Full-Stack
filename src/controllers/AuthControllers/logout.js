const Logout = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,     
      sameSite: "strict"
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message
    });
  }
};

module.exports = Logout;
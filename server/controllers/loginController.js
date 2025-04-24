// loginController.js
const bcrypt = require("bcrypt");
const { User, validateLogin } = require("../models/userModel.js");

const loginController = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email" });
    }

    // Check password validity using bcrypt
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    // Check if the user's email is verified
    if (!user.verified) {
      return res
        .status(400)
        .send({ message: "User doesn't exist or email not verified" });
    }

    // Generate token
    const token = user.generateAuthToken();

    // IMPORTANT: Correctly set the cookie with proper options
    res.cookie("authToken", token, {
      httpOnly: false, // Set to false temporarily for debugging
      secure: false, // Set to false for development (true only in production with HTTPS)
      sameSite: "lax", // Use "lax" instead of "strict"
      path: "/", // Ensure cookie is available on all paths
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    console.log("Setting auth cookie for user:", user.email);

    // Log the token for debugging (remove in production)
    console.log("Token:", token.substring(0, 20) + "...");

    // Send success response
    return res.status(200).json({
      message: "Login successful",
      token: token, // Also include the token in the response
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = loginController;

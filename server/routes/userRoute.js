//userRoute.js
const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const verifyEmail = require("../controllers/emailVerifyController");
const profileController = require("../controllers/profileController");
const messageController = require("../controllers/messageController");
const peopleController = require("../controllers/peopleController");
const avatarController = require("../controllers/avatarController");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/:id/verify/:token", verifyEmail);
router.get("/profile", profileController.profileController);
router.get("/messages/:userId", messageController);
router.get("/people", peopleController);
router.put("/profile/update", profileController.profileUpdate);
router.post("/", avatarController.avatarController);
router.get("/all", avatarController.getAllAvatars);
router.get("/verify-token", (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      return res.status(200).json({
        valid: true,
        user: {
          _id: decoded._id,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          email: decoded.email,
        },
      });
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/test-cookie", (req, res) => {
  res.cookie("testCookie", "hello-world", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ message: "Test cookie set" });
});

module.exports = router;

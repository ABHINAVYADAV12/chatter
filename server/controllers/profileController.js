const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const profileController = async (req, res) => {
  const token = req.cookies?.authToken;
  if (token) {
    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, async (err, userData) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      
      try {
        const user = await User.findOne({ _id: userData._id });
        res.json(user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

const profileUpdate = async (req, res) => {
  const token = req.cookies?.authToken;
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  
  try {
    const userData = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
    
    const { firstName, lastName, email, avatarLink } = req.body;
    
    const user = await User.findOne({ _id: userData._id });
    
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.avatarLink = avatarLink;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { profileController, profileUpdate };
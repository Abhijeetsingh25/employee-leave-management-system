const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
       // console.log("Cookies:", req.cookies);

    const token = req.cookies.token;
   

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 

    req.user = await User.findById(decoded.id);

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }
};

module.exports = protect;
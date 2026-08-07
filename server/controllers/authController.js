const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const crypto = require("crypto");

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      employeeId,
      department,
      designation,
      phone,
      role,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !employeeId ||
      !department ||
      !designation
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check existing user
  const existingUser = await User.findOne({
  $or: [
    { email },
    { phone }
  ]
});

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "Email or Phone already registered",
  });
}

    // Check employee ID
    const existingEmployee = await User.findOne({ employeeId });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee ID already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      employeeId,
      department,
      designation,
      phone,
     
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Send Cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const loginUser = async (req, res) => {
  try {
   const { emailOrPhone, password } = req.body;

    // Validation
    if (!emailOrPhone || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find user
    const user = await User.findOne({
  $or: [
    { email: emailOrPhone },
    { phone: emailOrPhone },
  ],
}).select("+password");

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Incorrect Password",
  });
}

    // Generate Token
    const token = generateToken(user._id);

    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

res.status(200).json({
  success: true,
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isPasswordChanged: user.isPasswordChanged,
  },
  message: "Login Successful",
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const forgotPassword = async (req, res) => {
  try {
  const { emailOrPhone } = req.body;

const user = await User.findOne({
  $or: [
    { email: emailOrPhone },
    { phone: emailOrPhone }
  ]
});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

   const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

await sendEmail({
  email: user.email,
  subject: "Password Reset Request",
  message: `Reset your password using this link:\n\n${resetUrl}\n\nThis link expires in 15 minutes.`,
});

return res.status(200).json({
  success: true,
  message: `Password reset link sent successfully to ${user.email}`,
});
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired Token",
      });
    }

    user.password = await bcrypt.hash(req.body.password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });

};

const changePassword = async (req, res) => {
  try {

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }


    const user = await User.findById(req.user._id).select("+password");


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "If an account exists, a password reset link has been sent to the registered email.",
      });
    }


    // Check old password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );


    if (!isMatch) {
      console.log(req.body);
      return res.status(400).json({
        success:false,
        message:"Current password is incorrect",
      });
    }


    // Hash new password
    user.password = await bcrypt.hash(newPassword,10);

   user.isPasswordChanged = true;
    await user.save();


    res.status(200).json({
      success:true,
      message:"Password changed successfully",
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};

const getCurrentUser = async (req, res) => {

  res.status(200).json({
    success: true,
    user: req.user,
  });

};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword,

};
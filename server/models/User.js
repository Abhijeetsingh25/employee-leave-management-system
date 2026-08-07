const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: [true , "Name is required"],
            trim: true,
            minlength:3,
        },

        email: {
            type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
        },
          password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["admin", "hr", "employee"],
      default: "employee",
    },

    phone: {
      type: String,
      trim: true,
    },
    address: {
    type: String,
    default: "",
   },

   profileImage: {
    type: String,
    default: "",
  },
    joiningDate: {
      type: Date,
      default: Date.now,
    },

    leaveBalance: {
      type: Number,
      default: 20,
    },

    resetPasswordToken: {
  type: String,
},

resetPasswordExpire: {
  type: Date,
},

    isActive: {
      type: Boolean,
      default: false,
    },

    isPasswordChanged: {
  type: Boolean,
  default: false,
},

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
    
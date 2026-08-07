const bcrypt = require("bcrypt");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// =======================
// Create Employee
// =======================

const createEmployee = async (req, res) => {
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

    const exist = await User.findOne({
      email,
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const employee =
      await User.create({

        name,
        email,
        password: hashedPassword,
        employeeId,
        department,
        designation,
        phone,
        role,

      });
      try {

  await sendEmail({
    email: employee.email,
    subject: "Welcome to Employee Leave Management System",
    message: `
Hello ${employee.name},

Welcome to Employee Leave Management System.

Your account has been created successfully.

Login Details

Name : ${employee.name}
Email : ${employee.email}
Password : ${password}
Role : ${employee.role}

Login URL:
http://localhost:5173

Please change your password after your first login.

Regards,
HR Department
Employee Leave Management System
`,
  });

} catch (emailError) {

  console.log("Email Error:", emailError.message);

}

    res.status(201).json({

      success: true,
      employee,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }
};

// =======================
// Get All Employees
// =======================
const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({
      role: { $ne: "admin" }, // Admin ko exclude karega
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get Employee By ID
// =======================
const getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select("-password");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Update Employee
// =======================
const updateEmployee = async (req, res) => {

  try {

    const employee =
      await User.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      );

    res.json({

      success: true,

      employee,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================
// Soft Delete Employee
// =======================
const deleteEmployee = async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({

      success: true,

      message:
        "Employee Deleted Successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,

};
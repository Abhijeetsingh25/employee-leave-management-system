const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config({
  path:"../.env"
});

const connectDB = require("../config/db");
const User = require("../models/User");

connectDB();

const seedUsers = async () => {
  try {

    // Delete old users (Optional)
    // await User.deleteMany();

    const password = await bcrypt.hash("123456", 10);

    const users = [
      {
        name: "System Admin",
        email: "abhijeetbaghel744@gmail.com",
        password,
        employeeId: "ADM001",
        department: "Administration",
        designation: "Administrator",
        phone: "7440873284",
        role: "admin",
        leaveBalance: 30,
      },

      // {
      //   name: "HR Manager",
      //   email: "hr@gmail.com",
      //   password,
      //   employeeId: "HR001",
      //   department: "Human Resource",
      //   designation: "HR Manager",
      //   phone: "9999999992",
      //   role: "hr",
      //   leaveBalance: 30,
      // },

      // {
      //   name: "Abhijeet Singh",
      //   email: "abhi@gmail.com",
      //   password,
      //   employeeId: "EMP001",
      //   department: "IT",
      //   designation: "Software Engineer",
      //   phone: "9999999993",
      //   role: "employee",
      //   leaveBalance: 24,
      // },

      // {
      //   name: "Rahul Sharma",
      //   email: "rahul@gmail.com",
      //   password,
      //   employeeId: "EMP002",
      //   department: "IT",
      //   designation: "Frontend Developer",
      //   phone: "9999999994",
      //   role: "employee",
      //   leaveBalance: 24,
      // },

      // {
      //   name: "Priya Verma",
      //   email: "priya@gmail.com",
      //   password: password,
      //   employeeId: "EMP003",
      //   department: "Finance",
      //   designation: "Accountant",
      //   phone: "9999999995",
      //   role: "employee",
      //   leaveBalance: 24,
      // },

      // {
      //   name: "Aman Patel",
      //   email: "aman@gmail.com",
      //   password,
      //   employeeId: "EMP004",
      //   department: "Sales",
      //   designation: "Sales Executive",
      //   phone: "9999999996",
      //   role: "employee",
      //   leaveBalance: 24,
      // },

      // {
      //   name: "Neha Singh",
      //   email: "neha@gmail.com",
      //   password,
      //   employeeId: "EMP005",
      //   department: "Marketing",
      //   designation: "Marketing Executive",
      //   phone: "9999999997",
      //   role: "employee",
      //   leaveBalance: 24,
      // }
    ];

    await User.insertMany(users);

    console.log("✅ Database Seeded Successfully");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

seedUsers();
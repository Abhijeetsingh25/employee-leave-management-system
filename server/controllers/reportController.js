const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const User = require("../models/User");
const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");

const getReports = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({
      role: "employee",
    });

    const totalLeaves = await Leave.countDocuments();

    const pendingLeaves = await Leave.countDocuments({
      status: "Pending",
    });

    const approvedLeaves = await Leave.countDocuments({
      status: "Approved",
    });

    const rejectedLeaves = await Leave.countDocuments({
      status: "Rejected",
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const presentToday = await Attendance.countDocuments({
      date: { $gte: today },
      status: "Present",
    });

    const absentToday = await Attendance.countDocuments({
      date: { $gte: today },
      status: "Absent",
    });

    const employees = await User.find(
      { role: "employee" },
      "employeeId name department leaveBalance email"
    );

    res.json({
      summary: {
        totalEmployees,
        totalLeaves,
        pendingLeaves,
        approvedLeaves,
        rejectedLeaves,
        presentToday,
        absentToday,
      },
      employees,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const exportExcel = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees Report");

    worksheet.columns = [
      { header: "Employee ID", key: "employeeId", width: 20 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Department", key: "department", width: 20 },
      { header: "Designation", key: "designation", width: 20 },
      { header: "Leave Balance", key: "leaveBalance", width: 15 },
    ];

    employees.forEach((emp) => {
      worksheet.addRow({
        employeeId: emp.employeeId,
        name: emp.name,
        email: emp.email,
        department: emp.department,
        designation: emp.designation,
        leaveBalance: emp.leaveBalance,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Employee_Report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const exportPDF = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Employee_Report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(22).text("Employee Report", {
      align: "center",
    });

    doc.moveDown();

    employees.forEach((emp, index) => {
      doc
        .fontSize(12)
        .text(`${index + 1}. ${emp.name}`)
        .text(`Employee ID : ${emp.employeeId}`)
        .text(`Email       : ${emp.email}`)
        .text(`Department  : ${emp.department}`)
        .text(`Designation : ${emp.designation}`)
        .text(`Leave Balance : ${emp.leaveBalance}`);

      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getReports = getReports;
exports.exportExcel = exportExcel;
exports.exportPDF = exportPDF;

const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

const User = require("../models/User");

const exportEmployeesExcel = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees");

    worksheet.columns = [
      { header: "Employee ID", key: "employeeId", width: 15 },
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
      'attachment; filename="employees.xlsx"'
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



const exportEmployeesPDF = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="employees.pdf"'
    );

    doc.pipe(res);

    doc
      .fontSize(20)
      .text("Employee Report", {
        align: "center",
      });

    doc.moveDown();

    doc.fontSize(12).text(`Generated On: ${new Date().toLocaleString()}`);

    doc.moveDown();

    employees.forEach((emp, index) => {
      doc.text(
        `${index + 1}. ${emp.employeeId} | ${emp.name} | ${emp.department} | ${emp.designation} | Leave Balance: ${emp.leaveBalance}`
      );

      doc.moveDown(0.5);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  exportEmployeesExcel,
  exportEmployeesPDF,
};
const Holiday = require("../models/Holiday");

// Add Holiday
const addHoliday = async (req, res) => {
  try {
    const { title, description, date, type } = req.body;

    const holiday = await Holiday.create({
      title,
      description,
      date,
      type,
    });

    res.status(201).json({
      success: true,
      holiday,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Holidays
const getHolidays = async (req, res) => {
  try {

    const holidays = await Holiday.find().sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: holidays.length,
      holidays,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Holiday
const updateHoliday = async (req, res) => {
  try {

    const holiday = await Holiday.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!holiday) {
      return res.status(404).json({
        success: false,
        message: "Holiday not found",
      });
    }

    res.status(200).json({
      success: true,
      holiday,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Holiday
const deleteHoliday = async (req, res) => {
  try {

    const holiday = await Holiday.findById(req.params.id);

    if (!holiday) {
      return res.status(404).json({
        success: false,
        message: "Holiday not found",
      });
    }

    await holiday.deleteOne();

    res.status(200).json({
      success: true,
      message: "Holiday deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addHoliday,
  getHolidays,
  updateHoliday,
  deleteHoliday,
};
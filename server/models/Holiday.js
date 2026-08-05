const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      enum: ["National", "Festival", "Company"],
      default: "National",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Holiday", holidaySchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z\s]+$/.test(value);
        },
        message: "Name can only contain letters and spaces.",
      },
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
        },
        message: "Invalid email",
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[6-9]\d{9}$/.test(value);
        },
        message:
          "Invalid phone number. Please enter a 10-digit number starting with 6 to 9.",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

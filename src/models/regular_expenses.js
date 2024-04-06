const mongoose = require("mongoose");

const regularExpensesSchema = new mongoose.Schema({
  name_of_expense: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date_of_payment: {
    type: Date,
    default: Date.now,
  },
});

const RegularExpenses = mongoose.model(
  "RegularExpenses",
  regularExpensesSchema
);
module.exports = RegularExpenses;

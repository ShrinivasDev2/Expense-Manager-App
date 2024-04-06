const mongoose = require("mongoose");

const extraExpensesSchema = new mongoose.Schema({
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
  },
});

const ExtraExpenses = mongoose.model("ExtraExpenses", extraExpensesSchema);
module.exports = ExtraExpenses;

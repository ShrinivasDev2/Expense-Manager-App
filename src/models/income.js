const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  total_income_amount: {
    type: Number,
    required: true,
  },
});

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;

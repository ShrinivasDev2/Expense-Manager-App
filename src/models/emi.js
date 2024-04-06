const mongoose = require("mongoose");

const emiSchema = new mongoose.Schema({
  emi_number: {
    type: Number,
    required: true,
  },
  emi_amount: {
    type: Number,
    required: true,
  },
  date_of_payment: {
    type: Date,
  },
  loan_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Loan",
  },
});

const Emi = mongoose.model("Emi", emiSchema);
module.exports = Emi;

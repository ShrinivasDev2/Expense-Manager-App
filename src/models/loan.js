const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  bank_name: {
    type: String,
    trim: true,
  },
  loan_type: {
    type: String,
    enum: ["Personal Loan", "Education Loan", "Vehicle Loan", "Home Loan"],
  },
  total_loan_amount: {
    type: Number,
    required: true,
  },
  installments: {
    type: Number,
    required: true,
  },
  remaining_loan_amount: {
    type: Number,
  },
});

loanSchema.virtual("EMI", {
  ref: "Emi",
  localField: "_id",
  foreignField: "loan_id",
});

const Loan = mongoose.model("Loan", loanSchema);
module.exports = Loan;

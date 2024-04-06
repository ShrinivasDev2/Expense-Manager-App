const income = require("../models/income");
const regularExpenses = require("../models/regular_expenses");
const extraExpenses = require("../models/extra_expenses");

const calculateExpense = async (req, res) => {
  try {
    // Define both aggregation operations
    const regularTotalPromise = regularExpenses
      .aggregate([
        {
          $group: {
            _id: null,
            regularTotal: { $sum: "$amount" },
          },
        },
      ])
      .exec();

    const extraTotalPromise = extraExpenses
      .aggregate([
        {
          $group: {
            _id: null,
            extraTotal: { $sum: "$amount" },
          },
        },
      ])
      .exec();

    // Wait for both promises to resolve
    const [regularResult, extraResult] = await Promise.all([
      regularTotalPromise,
      extraTotalPromise,
    ]);

    // Extract total amounts from results
    const regularTotal =
      regularResult.length > 0 ? regularResult[0].regularTotal : 0;
    const extraTotal = extraResult.length > 0 ? extraResult[0].extraTotal : 0;

    // Calculate total expense
    const totalExpense = regularTotal + extraTotal;

    console.log("Total regular expenses:", regularTotal);
    console.log("Total extra expenses:", extraTotal);
    console.log("Total expense:", totalExpense);

    res.status(200).json({ totalExpense });
  } catch (e) {
    console.error("Error calculating total expenses:", e);
    res.status(500).json({ error: e.message });
  }
};

const addIncome = async (req, res) => {
  const { total_income_amount } = req.body;
  try {
    const newIncome = new income({ total_income_amount });
    const savedIncome = await newIncome.save();
    res.status(200).json({ Message: "Income Added Successfully", savedIncome });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const addRegularExpenses = async (req, res) => {
  const { name_of_expense, amount, date_of_payment } = req.body;
  try {
    const newRegularExpenses = new regularExpenses({
      name_of_expense,
      amount,
      date_of_payment,
    });
    const savedRegularExpenses = await newRegularExpenses.save();
    res.status(200).json({
      Message: "Regular Expenses Added Successfully",
      savedRegularExpenses,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const addExtraExpenses = async (req, res) => {
  const { name_of_expense, amount, date_of_payment } = req.body;
  try {
    const newExtraExpenses = new extraExpenses({
      name_of_expense,
      amount,
      date_of_payment,
    });
    const savedExtraExpenses = await newExtraExpenses.save();
    res.status(200).json({
      Message: "Extra expenses Added Successfully",
      savedExtraExpenses,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const calculatePurseAmount = async (req, res) => {
  try {
    // Fetch total income
    const incomeData = await Income.findOne();
    if (!incomeData) {
      return res.status(404).json({ error: "Income data not found" });
    }
    const income = incomeData.total_income_amount;

    // Fetch total expense using the calculateExpense API
    const expenseResponse = await calculateExpense(req, res);
    if (expenseResponse.status !== 200) {
      throw new Error("Failed to fetch total expense");
    }
    const totalExpense = expenseResponse.data.totalExpense;

    // Calculate purse amount
    const purseAmount = income - totalExpense;

    console.log("Total income:", income);
    console.log("Total expense:", totalExpense);
    console.log("Purse amount:", purseAmount);

    res.status(200).json({ purseAmount });
  } catch (error) {
    console.error("Error calculating purse amount:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addIncome,
  addRegularExpenses,
  addExtraExpenses,
  calculateExpense,
  calculatePurseAmount,
};

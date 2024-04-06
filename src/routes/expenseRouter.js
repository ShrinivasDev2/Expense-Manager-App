const express = require("express");
const Router = express.Router();
const expenseController = require("../controllers/expenseController");

Router.post("/addIncome", expenseController.addIncome);
Router.post("/addRegularExpenses", expenseController.addRegularExpenses);
Router.post("/addExtraExpenses", expenseController.addExtraExpenses);
Router.get("/calculateExpense", expenseController.calculateExpense);

module.exports = Router;

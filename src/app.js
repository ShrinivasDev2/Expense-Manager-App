const express = require("express");
require("./db/mongoose");

// Routes
const expenseRouter = require("./routes/expenseRouter");

const app = express();

app.use(express.json());
app.use(expenseRouter);

module.exports = app;

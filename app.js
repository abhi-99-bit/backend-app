const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const userLoginRouter = require("./routes/login");
const userExpenses = require("./routes/posts");
const userDetails = require("./routes/userDetailsById");
const userPostInsert = require("./routes/insertUserExpenses");
const userPostUpdate = require("./routes/updateExpenses");
const deleteExpenses = require('./routes/deleteExpenses');
const getTodayExpense = require('./routes/today');
const getWeeklyExpenses = require('./routes/weekly');
const getMonthlyExpense = require('./routes/monthly');
const cors = require('cors')

var app = express();
app.use(cors())

app.disable("etag");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter); // USER SIGN UP
app.use("/user/login", userLoginRouter); // USER SIGN IN
app.use("/user/expenses-list", userExpenses); // GET USER EXPESNSES LIST BASED ON CURRENT USER OR USER ID
app.use("/users/details", userDetails); // UPDATE USER EXPENSES LIST
app.use("/user/expenses", userPostInsert); //INSERT USER EXPENSES INTO DATABASE
app.use("/user/update-expenses/:id", userPostUpdate); //UPDATE USER EXPENSES
app.use("/user/delete-expenses/:id", deleteExpenses);
app.use("/user/today-expenses", getTodayExpense);
app.use("/user/weekly-expnses", getWeeklyExpenses);
app.use("/user/monthly-expnses", getMonthlyExpense);
module.exports = app;

require('dotenv').config();

const express = require("express");
const userRoutes = require("./routes/user.route");
const accountRoutes = require("./routes/account.route");
const transactionRoutes = require("./routes/transaction.route");
const depositRoutes = require("./routes/deposit.route");
const withdrawalRoutes = require("./routes/withdrawal.route");
const authRoutes = require("./routes/auth/auth.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", accountRoutes);
app.use("/api/v1", transactionRoutes);
app.use("/api/v1", depositRoutes);
app.use("/api/v1", withdrawalRoutes);
app.use("/api/v1", authRoutes);


app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT || 4000, () => {
  console.log(`Server is running on port ${PORT}`);
});

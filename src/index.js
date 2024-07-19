require('dotenv').config();

const express = require("express");
const userRoutes = require("./routes/user.route");
const accountRoutes = require("./routes/account.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", accountRoutes);


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

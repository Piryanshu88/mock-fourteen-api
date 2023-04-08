const express = require("express");
const app = express();
const cors = require("cors");
const { connect } = require("./config/db");
const { bankRouter } = require("./routes/bank.route");
require("dotenv").config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is Home Page ");
});

app.use("/bank", bankRouter);

app.listen(process.env.port, async () => {
  try {
    await connect;
    console.log("Connecting to db");
  } catch (error) {
    console.log(error);
    console.log("Something went wrong");
  }
  console.log("Server running at 8080");
});

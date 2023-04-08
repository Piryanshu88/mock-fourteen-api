const express = require("express");
const { BankModel } = require("../models/bank.model");

const bankRouter = express.Router();

bankRouter.post("/register", async (req, res) => {
  const { name, gender, dob, email, mobile, balance, aadhar, pan } = req.body;
  const user = await BankModel.find({ email });
  if (user.length != 0) {
    res.send({ msg: "User Already had an account" });
    return;
  }
  try {
    const user = new BankModel({
      name,
      gender,
      dob,
      email,
      mobile,
      balance: Number(balance),
      aadhar,
      pan,
    });

    await user.save();
    res.send({ msg: "User Register Successfully" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});

bankRouter.post("/login", async (req, res) => {
  const { email, pan } = req.body;
  const user = await BankModel.find({ email });
  if (user.length == 0) {
    res.send({ msg: "Please Register first" });
    return;
  }
  try {
    const user = await BankModel.find({ email, pan });
    res.send({
      msg: "Login Successfully",
      id: user[0]._id,
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});

bankRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await BankModel.find({ _id: id });
    res.send({
      data: user[0],
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});

bankRouter.patch("/amount/:id", async (req, res) => {
  const { id } = req.params;
  let amount = req.query.amount;
  const t = req.query.trans;
  if (t == "deposit") {
    amount = Number(amount);
  } else if (t == "withdrawel") {
    amount = -Number(amount);
  }
  try {
    const user = await BankModel.find({ _id: id });
    await BankModel.findByIdAndUpdate(
      { _id: id },
      { balance: user[0].balance + amount }
    );
    res.send({
      msg: "Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});

bankRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await BankModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      msg: "Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});

bankRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await BankModel.findByIdAndDelete({ _id: id });
    res.send({
      msg: "Closed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  bankRouter,
};

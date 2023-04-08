const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
  name: String,
  gender: String,
  dob: String,
  email: String,
  mobile: String,
  balance: Number,
  aadhar: String,
  pan: String,
});

const BankModel = mongoose.model("bank", bankSchema);

module.exports = {
  BankModel,
};

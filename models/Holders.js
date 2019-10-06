const mongoose = require("mongoose");

const HoldersSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    unique: true
  },
  holders: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Holders = mongoose.model("holders", HoldersSchema);

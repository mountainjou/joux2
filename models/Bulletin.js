const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BulletinSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  report: {
    type: String,
    required: true
  },
  uname: {
    type: String
  },
  rname: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Bulletin = mongoose.model("bulletin", BulletinSchema);

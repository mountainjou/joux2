const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoldersSchema = new mongoose.Schema({
  corporation: {
    // users 스키마에서 유일값인 ObjectId를 가져와서 corporateId에 매칭해준다.
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  corporateName: {
    type: String
  },
  holders: {
    // 주주명부, 배열 형태로 저장한다.
    type: Array,
    required: true
  },
  date: {
    // 명부 업로드 일시
    type: Date,
    default: Date.now
  }
});

module.exports = Holders = mongoose.model("holders", HoldersSchema);

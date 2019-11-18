const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  // 안건들 - 객체 배열로 저장
  contents: {
      // cNum: { type: String },
      // content: { type: String }
      type: Array
  },
  // 법인명
  corp: {
    type: String,
    // required: true
  },
  // 토큰 이름
  token: {
    type: String,
    // required: true
  },
  // 주총 성격(임시, 정기 등)
  char: {
    type: String,
    // required: true
  },
  // 주총 장소
  place: {
    type: String
  },
  // 주총 일자
  date: {
    type: Date
  }
});

module.exports = Vote = mongoose.model('vote', VoteSchema);

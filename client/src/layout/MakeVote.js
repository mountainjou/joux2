import React from "react";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { makeVote } from "../actions/vote";
// import PropTypes from "prop-types";
import Alert from "../Alert";
// import { getValues } from "jest-validate/build/condition";

// fname: 주주총회 이름, cname: 주주총회 진행 대상회사, options:안건 배열로 나열
const MakeVote = ({ setAlert, makeVote, isAuthenticated }) => {
  // let contents = [ {cNum, content} ]
  const [meeting, setmeeting] = React.useState({
    corp: "",
    cNum: "",
    content: "",
    contents: [],
    token: "",
    char: "",
    place: "",
    date: "",
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setmeeting({ ...meeting, [name]: event.target.value });
  };
  const handleChange2 = name => event => {
    setmeeting({ ...meeting, [name]: event.target.value });
  };
  
  const { corp, contents, token, char, place, date } = meeting;

  const onSubmit = async e => {
    e.preventDefault();
    // makevote 액션을 실행한다.
    makeVote({ corp, contents, token, char, place, date });
  };

  // var num = optionNum;

  // console.log(num);

  // const confirmNum = () => {

  //   for (i=0; i<num; i++) {

  //   };
  // }
  console.log(meeting)
  return (
    <div className="container">
      <div>
        <h1>주주총회 등록</h1>
        <br />
        <br />
      </div>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label for="corp">회사 이름</label>
          <input
            className="form-control"
            type="corp"
            name="corp"
            id="corp"
            meeting={meeting.corp}
            onChange={handleChange("corp")}
          />
        </div>
        <div className="form-group">
          <label for="cNum">안건 번호</label>
          <input
            className="form-control"
            type="cNum"
            name="cNum"
            id="cNum"
            onChange={handleChange("contents.cNum")}
          />
          <input
            className="form-control"
            type="content"
            name="content"
            id="content"
            onChange={handleChange("contents.content")}
          />
        </div>
        {/* <div className="form-group">
          <label for="content">안건</label>
          <input
            className="form-control"
            type="content"
            name="content"
            id="content"
            onChange={handleChange("contents[content]")}
          />
        </div> */}
        {/* <div className="form-group">
          <label for="cNum">안건 번호</label>
          <input
            className="form-control"
            type="cNum"
            name="cNum"
            id="cNum"
            onChange={handleChange("cNum")}
          />
        </div><div className="form-group">
          <label for="content">안건</label>
          <input
            className="form-control"
            type="content"
            name="content"
            id="content"
            onChange={handleChange("content")}
          />
        </div>
        <div className="form-group">
          <label for="cNum">안건 번호</label>
          <input
            className="form-control"
            type="cNum"
            name="cNum"
            id="cNum"
            onChange={handleChange("cNum")}
          />
        </div><div className="form-group">
          <label for="content">안건</label>
          <input
            className="form-control"
            type="content"
            name="content"
            id="content"
            onChange={handleChange("content")}
          />
        </div> */}
        {/* input으로 갯수 설정 버튼 onClick으로 생성함수 호출 */}
        {/* <h4>안건 갯수 설정</h4>
        <br />
        <div>
          
          <input type="number" min="1" name="optionNum" id="optionNum" />
          <button className="btn btn-dark" style={{ marginLeft: 20 }}>
            설정
          </button>
        </div> */}
        <div className="form-group">
          <label for="char">주총 성격</label>
          <input
            className="form-control"
            type="char"
            name="char"
            id="char"
            meeting={meeting.char}
            onChange={handleChange("char")}
          />
        </div>
        <div className="form-group">
          <label for="place">장소</label>
          <input
            className="form-control"
            type="place"
            name="place"
            id="place"
            meeting={meeting.place}
            onChange={handleChange("place")}
          />
        </div>
        <div className="form-group">
          <label for="date">일자/시간</label>
          <input
            className="form-control"
            // type="date"
            name="date"
            id="date"
            meeting={meeting.date}
            onChange={handleChange("date")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          주주총회 등록
        </button>
        <br />
        <br />
      </form>
      <Alert />
    </div>
  );
};

// makeVote.propTypes = {
//   setAlert: PropTypes.func.isRequired,
//   makeVote: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool
// };

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, makeVote }
)(MakeVote);

import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { makeVote } from "../actions/vote";
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

  // console.log(meeting)

  const [rows, setRows] = useState([]);
  const addRow = () => {
      if(rows.length > 9) return;
      let data = {
          id: rows.length + 1,
          context: ""
      };
      setRows([...rows, data]);
  };
  const deleteRow = id => () => {
      let tempRows = rows.filter(row => {
          return row.id !== id;
      });
      setRows(tempRows);
  }

  return (
    <div className="container">
      <div>
        <h1>전자투표 등록</h1><br />
      </div>
      <form onSubmit={e => onSubmit(e)}>
        <p>주주총회 정보</p>
        <table className="table table-dark">
          <tbody>
            <tr>
              <th className="fix"><label htmlFor="corp">회사명</label></th>
              <td className="input"><input className="form-control bg-dark text-white"
                type="corp"
                name="corp"
                id="corp"
                meeting={meeting.corp}
                onChange={handleChange("corp")} /></td>
              <th className="fix"><label htmlFor="char">주주총회성격</label></th>
              <td className="input"><input className="form-control bg-dark text-white"
                type="char"
                name="char"
                id="char"
                meeting={meeting.char}
                onChange={handleChange("char")} /></td>
            </tr>
            <tr>
              <th className="fix"><label htmlFor="date">주주총회일시</label></th>
              <td className="input"><input className="form-control bg-dark text-white"
                // type="date"
                name="date"
                id="date"
                meeting={meeting.date}
                onChange={handleChange("date")} /></td>
              <th className="fix"><label htmlFor="place">주주총회장소</label></th>
              <td className="input"><input className="form-control bg-dark text-white"
                type="place"
                name="place"
                id="place"
                meeting={meeting.place}
                onChange={handleChange("place")} /></td>
            </tr>
          </tbody>
        </table><br />

        <p>전자투표 의안
            <button type="button" className="btn btn-primary float-right"
            onClick={addRow}>의안 추가</button>
        </p>
        <table className="table table-dark table-striped">
          <colgroup>
            <col width="100px" />
            <col />
            <col width="50px" />
          </colgroup>
          <thead className="thead-dark">
            <tr>
              <th>순번</th>
              <th colSpan='2'>의안 내용</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d, i) => (
              <tr key={i}>
                <td align="center">{i + 1}</td>
                <td><input
                  className="form-control bg-dark text-white"
                  type="content"
                  name="content"
                  id="content"
                  onChange={(e) => { handleChange("contents.content"); }}
                   /></td>
                <td><div onClick={deleteRow(i+1)}>
                  <i className="fas fa-backspace"></i>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table><br />


        <button type="submit" className="btn btn-primary float-right">
          등록
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

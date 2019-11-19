import React from "react";
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
    contents: [],
    token: "",
    char: "",
    place: "",
    date: ""
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setmeeting({ ...meeting, [name]: event.target.value });
  };
  const { corp, token, char, place, date } = meeting;

  const onSubmit = async e => {
    e.preventDefault();
    let contents = rows.map(n => {
      return n.context
    })
    // makevote 액션을 실행한다.
    makeVote({ corp, contents, token, char, place, date });
  };

  console.log(meeting)

  const [rows, setRows] = React.useState([]);
  const changeText = id => e => {
    const tempRows = rows.map(row => {
      if (row.id === id + 1) {
        row["context"] = e.target.value;
      }
      return row;
    });
    setRows(tempRows);
  }
  const addRow = () => {
    if (rows.length > 9) return;
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
      <h1>전자투표 등록</h1><br />
      <form onSubmit={e => onSubmit(e)}>
        <h4><p className="bg-dark text-white">주주총회 정보</p></h4>
        <table className="table">
          <tbody>
            <tr>
              <th>회사명</th>
              <td><input className="form-control"
                type="corp"
                name="corp"
                id="corp"
                meeting={meeting.corp}
                onChange={handleChange("corp")} /></td>
              <th ><label htmlFor="char">주주총회성격</label></th>
              <td><input className="form-control"
                type="char"
                name="char"
                id="char"
                meeting={meeting.char}
                onChange={handleChange("char")} /></td>
            </tr>
            <tr>
              <th><label htmlFor="date">주주총회일시</label></th>
              <td><input className="form-control"
                // type="date"
                name="date"
                id="date"
                meeting={meeting.date}
                onChange={handleChange("date")} /></td>
              <th><label htmlFor="place">주주총회장소</label></th>
              <td><input className="form-control"
                type="place"
                name="place"
                id="place"
                meeting={meeting.place}
                onChange={handleChange("place")} /></td>
            </tr>
          </tbody>
        </table><br />

        <h4><p className="bg-dark text-white">전자투표 의안
            <button type="button" className="btn btn-primary float-right"
            onClick={addRow}>의안 추가</button>
        </p></h4>
        <table className="table table-striped">
          <colgroup>
            <col width="100px" />
            <col />
            <col width="50px" />
          </colgroup>
          <thead align="center">
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
                  className="form-control"
                  type="contents"
                  name="contents"
                  id="contents"
                  onChange={changeText(i)} value={d.context}
                /></td>
                <td><div onClick={deleteRow(i + 1)}>
                  <i className="fas fa-backspace"></i>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table><br />
        <button type="submit" className="btn btn-primary float-right">등록</button>
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

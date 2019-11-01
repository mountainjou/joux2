import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import PropTypes from "prop-types";
import Alert from "../Alert";
import { getValues } from "jest-validate/build/condition";


// fname: 주주총회 이름, cname: 주주총회 진행 대상회사, options:안건 배열로 나열
const MakeVote = ({ setAlert, register, isAuthenticated }) => {
  const [festival, setFestival] = React.useState({
    fname: "",
    cname: "",
    options: []
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setFestival({ ...festival, [name]: event.target.festival });
  };

  const { fname, cname, options } = festival;

  const onSubmit = async e => {
    e.preventDefault();
   // password와 password2가 값이 같다면 register 액션을 실행한다.
      register({ fname, cname, options });
  };


  var num = optionNum;

  console.log(num);

  // const confirmNum = () => {
  
  //   for (i=0; i<num; i++) {

  //   };
  // }

  return (
    <div className="container">
      <div>
        <h1>주주총회 등록</h1><br /><br />
      </div>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label for="fname">주주총회 이름</label>
          <input
            className="form-control"
            type="fname"
            name="fname"
            id="fname"
            festival={festival.fname}
            onChange={handleChange("fname")}
          />
        </div>
        <div className="form-group">
          <label for="cname">주주총회 진행 대상회사</label>
          <input
            className="form-control"
            type="cname"
            name="cname"
            id="cname"
            festival={festival.cname}
            onChange={handleChange("cname")}
          />
        </div>
        <h4>안건 갯수 설정</h4><br />
        <div>
          {/* input으로 갯수 설정
              버튼 onClick으로 생성함수 호출 */}
          <input type="number" min="1" name="optionNum" id="optionNum" />
            <button className="btn btn-dark" style={{marginLeft: 20}}>설정</button>
        </div>
        <div className="form-group">
          <label for="option">안건</label>
          <input
            className="form-control"
            type="option"
            name="option"
            id="option"
            festival={festival.options}
            onChange={handleChange("options")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          주주총회 등록</button>
        <br />
        <br />
      </form>
      <Alert />
    </div>
  );
};

// Register.propTypes = {
//   setAlert: PropTypes.func.isRequired,
//   register: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool
// };

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(MakeVote);

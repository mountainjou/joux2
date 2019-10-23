import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Axios from "axios";

const MyAccount = ({ auth: { user } }) => {
  const [values, setValues] = React.useState({
    corporation: user.corporation,
    redirectRegisterCorporation: false
  });

  const { corporation, redirectRegisterCorporation } = values;

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const registerCorporation = () => {
    console.log("기업 회원 등록 페이지 띄우기");
    setValues({ redirectRegisterCorporation: true });
  };
  // const registerCorporation = () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   };

  //   Axios.post("/api/users", corporation, config)
  //     .then(result => {
  //       console.log(result);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };

  const createWallet = () => {
    console.log("월렛 생성하기. web3 가져오기");
  };

  if (redirectRegisterCorporation) {
    return <Redirect to="/registercorp" />;
  }

  return (
    <div className="container">
      <div>내 정보</div>
      <div>이메일 : {user.email}</div>
      <div>
        {user.corporation !== undefined ? (
          <div>
            <div>회사명 : {user.corporation}</div>
            {user.isApprovedCorporation ? (
              <div>기업인증 : 인증된 기업</div>
            ) : (
              <div>기업인증 : 인증받지 않은 기업</div>
            )}
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={registerCorporation}
            >
              기업 회원 등록
            </button>
          </div>
        )}
      </div>

      <div>
        지갑 주소 :
        {user.walletAddress ? (
          user.walletAddress
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={createWallet}
          >
            지갑 생성
          </button>
        )}
      </div>
      {/* <div style={{ textAlign: "center" }}>
        <button type="button" className="btn btn-primary">
          눌러줘
        </button>
      </div> */}
    </div>
  );
};

MyAccount.propTypes = {
  auth: PropTypes.object.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MyAccount);

import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import Axios from "axios";
import Axios from "axios";
import Spinner from "../components/Spinner";

const MyAccount = ({ auth: { user, currentAccount, loading } }) => {
  const [values, setValues] = React.useState({
    redirectRegisterCorporation: false
  });

  console.log(user);

  const { redirectRegisterCorporation } = values;

  const registerCorporation = () => {
    console.log("기업 회원 등록 페이지 띄우기");
    setValues({ redirectRegisterCorporation: true });
  };

  // 지갑 연동
  const saveWallet = async () => {
    console.log(currentAccount);
    const url = "/api/users/registerwallet";
    const data = {
      whitelistWallet: currentAccount,
      email: user.email
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    await Axios.post(url, data, config)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (redirectRegisterCorporation) {
    return <Redirect to="/registercorp" />;
  }

  return loading === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <div>내 정보</div>
      <div>이메일 : {user.email}</div>
      <div>
        {user.role === "corporation" ? (
          <div>
            <div>회사명 : {user.corporation.name}</div>
            <div>법인 등록 번호 : {user.corporation.corpId}</div>
            {user.corporation.isApproved ? (
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
        등록된 지갑 주소 :
        {user.whitelistWallet ? (
          <div>
            {user.whitelistWallet.map(address => (
              <li key={address}>{address}</li>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveWallet}
            >
              현재 접속된 지갑 주소 추가 등록
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveWallet}
          >
            현재 접속된 지갑 주소 등록
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

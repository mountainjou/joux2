import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Web3 from "web3";
import { ethers } from "ethers";

import Alert from "../Alert";
import { setAlert } from "../actions/alert";
import Spinner from "../components/Spinner";

import { abi, bytecode } from "../contracts/Token.json";
import Axios from "axios";

const ReceiveToken = ({
  setAlert,
  auth: { user, loading, currentAccount }
}) => {
  const web3 = new Web3(Web3.givenProvider);

  const [values, setValues] = useState({
    holderId: "",
    searchCorpNameOrSymbol: "",
    searchedCorp: null
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { holderId, searchCorpNameOrSymbol, searchedCorp } = values;

  const searchCorp = () => {
    const url = "/api/users/searchcorp";
    const data = {
      searchData: searchCorpNameOrSymbol
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    Axios.post(url, data, config)
      .then(result => {
        console.log(result);
        setValues({
          searchedCorp: result.data.corpList
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(searchedCorp);

  const receive = () => {
    console.log(holderId);

    const id = ethers.utils.formatBytes32String(holderId.substring(10, 41));
    const option = {
      from: currentAccount,
      gasPrice: "20000000000"
    };
    const tokenCA = "tokenCA";
    const receiveContract = new web3.eth.Contract(abi, tokenCA, option);
  };

  return loading === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <div>수령하기</div>
      <br />
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="기업 이름 또는 기업 토큰 심볼을 검색하세요"
          id="searchCorpNameOrSymbol"
          name="searchCorpNameOrSymbol"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={values.searchCorpNameOrSymbol}
          onChange={handleChange("searchCorpNameOrSymbol")}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={searchCorp}
          >
            검색
          </button>
        </div>
      </div>
      <div>
        {searchedCorp ? (
          <div>
            {searchedCorp.map(corp => (
              <button type="button" key={corp} className="btn btn-primary">
                {corp.corporation.name} ( {corp.corporation.tokenSymbol} )
              </button>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <br />
      <br />
      <form>
        <div className="form-group">
          <label htmlFor="holderId">주주의 신원 확인 번호</label>
          <input
            type="number"
            className="form-control"
            name="holderId"
            id="holderId"
            aria-describedby="emailHelp"
            placeholder="주민등록번호를 - 기호 없이 숫자만 입력하세요"
            value={values.holderId}
            onChange={handleChange("holderId")}
          />
          <small id="emailHelp" className="form-text text-muted">
            신원 확인 번호는 단방향 암호화된 값의 일부를 사용하여 증명에
            활용되고 joujou 서버에 저장되지 않습니다.
          </small>
        </div>
      </form>
      <br />
      <button type="button" className="btn btn-primary" onClick={receive}>
        수령하기
      </button>
      <br />
      <Alert />
    </div>
  );
};

ReceiveToken.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(ReceiveToken);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Web3 from "web3";
import Axios from "axios";
import Spinner from "../components/Spinner";
import { ethers } from "ethers";

import Alert from "../Alert";
import { setAlert } from "../actions/alert";

import { abi, bytecode } from "../contracts/Token.json"; // 컴파일된 Token 컨트랙트에서 abi값과 bytecode값을 가져온다.

const PublishToken = ({
  setAlert,
  auth: { user, loading, currentAccount }
}) => {
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

  const [values, setValues] = React.useState({
    totalStocks: "",
    tokenName: "",
    tokenSymbol: "",
    holders: ""
  });

  // 주주명부 가져오기
  useEffect(() => {
    Axios.get("/api/upload")
      .then(result => {
        console.log(result);
        setValues({
          totalStocks: result.data.totalStocks,
          holders: result.data.holders
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { totalStocks, tokenName, tokenSymbol, holders } = values;

  // 스마트 컨트랙트 토큰 발행 실행
  const publishTokenFromContract = async () => {
    console.log(currentAccount);
    let holdersId = [];
    let holdersAmount = [];

    for (let i = 0; i < holders.length; i++) {
      holdersId.push(
        ethers.utils.formatBytes32String(holders[i].주민번호.substring(10, 41))
      );
      holdersAmount.push(holders[i].보유주식);
    }

    console.log(holdersId);
    console.log(holdersAmount);

    const option = {
      from: currentAccount,
      gasPrice: "20000000000"
    };

    const arg = [
      user.corporation.name,
      tokenName,
      tokenSymbol,
      0,
      totalStocks,
      holdersId,
      holdersAmount
    ];

    console.log(typeof tokenName, typeof tokenSymbol);

    console.log(tokenName.toString("hex"));

    console.log("클라이언트", arg);

    // default gas price in wei, 20 gwei in this case
    const tokenContract = new web3.eth.Contract(abi, option);
    tokenContract.options.data = bytecode;

    tokenContract
      .deploy({ arguments: arg })
      .send(
        {
          from: currentAccount
        },
        (err, transactionHash) => {
          console.log(transactionHash);
        }
      )

      .on("error", err => {})
      .on("transactionHash", transactionHash => {})
      .on("receipt", receipt => {
        console.log(receipt.contractAddress); // contains the new contract address
      })
      .on("confirmation", (confirmationNumber, receipt) => {})
      .then(newContractInstance => {
        console.log(newContractInstance);
        console.log(newContractInstance.options.address); // instance with the new contract address
        const url = "/api/users/registercontractaddress";
        const data = {
          email: user.email,
          ca: newContractInstance.options.address,
          tokenSymbol: tokenSymbol
        };
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        Axios.post(url, data, config)
          .then(result => {
            console.log(result);
            setAlert(result.data.msg, result.data.alertType);
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  return loading === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <div>토큰 발행</div>
      <br />
      {/* <div>
        등록된 지갑 주소 :
        {user.whitelistWallet ? (
          <div>
            {user.whitelistWallet.map(address => (
              <li key={address}>{address}</li>
            ))}
          </div>
        ) : (
          <div>등록된 지갑 없음</div>
        )}
      </div> */}

      <form onSubmit={e => publishTokenFromContract(e)}>
        <div className="form-group">
          <label htmlFor="totalStocks">주주명부에 등록된 총 주식 발행량</label>
          <div>
            <input
              type="text"
              className="form-control"
              readOnly
              id="totalStocks"
              value={totalStocks}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="corporation">회사명</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="corporation"
              readOnly
              value={user.corporation ? user.corporation.name : ""}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tokenName">토큰 이름</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="tokenName"
              placeholder="발행 할 토큰 이름을 입력하세요"
              onChange={handleChange("tokenName")}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tokenSymbol">토큰 심볼</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="tokenSymbol"
              placeholder="토큰 심볼을 입력하세요"
              onChange={handleChange("tokenSymbol")}
            />
          </div>
        </div>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={publishTokenFromContract}
        >
          발행하기
        </button>
      </form>
      <br />
      <Alert />
    </div>
  );
};

PublishToken.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(PublishToken);

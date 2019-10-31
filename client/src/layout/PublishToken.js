import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Web3 from "web3";
import Axios from "axios";
import TokenJSON from "../contracts/Token.json";
import Spinner from "../components/Spinner";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
const abi = TokenJSON.abi;
const byteCode = TokenJSON.bytecode;
console.log(byteCode);
const PublishToken = ({ auth: { user, loading, currentAccount } }) => {
  const [values, setValues] = React.useState({
    corporation: user.corporation,
    totalStocks: "",
    tokenName: "",
    tokenSymbol: ""
  });

  // 주주명부에 등록된 총 주식 발행량 가져오기
  useEffect(() => {
    Axios.get("/api/upload")
      .then(result => {
        console.log(result);
        setValues({ totalStocks: result.data });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { totalStocks, tokenName, tokenSymbol } = values;

  // 스마트 컨트랙트 기본 정보 입력
  const ca = "0x2F775163C3E3EfA2a4184D23f8197a9882364fb1";

  // 스마트 컨트랙트 토큰 발행 실행
  const publishTokenFromContract = async () => {
    console.log(currentAccount);
    const option = {
      from: currentAccount,
      gasPrice: "20000000000"
    };
    const arg = [user.corporation, tokenName, tokenSymbol, 18, totalStocks];

    // default gas price in wei, 20 gwei in this case
    const tokenContract = new web3.eth.Contract(abi, option);
    tokenContract.options.data = byteCode;

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
      });

    console.log("abi: ", abi);

    console.log("토큰발행");
  };

  return loading === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <div>토큰 발행</div>
      {/* <div>
        현재 접속된 지갑 주소 :
        {values.web3Wallet ? (
          <div>{web3Wallet}</div>
        ) : (
          <div>
            지갑이 연동되지 않음
            <button
              type="button"
              onClick={e => {
                accessWallet(e);
              }}
            >
              web3 지갑 불러오기
            </button>
          </div>
        )}
      </div> */}
      <div>
        등록된 지갑 주소 :
        {user.walletAddress ? (
          <div>
            {user.walletAddress.map(address => (
              <li key={address}>{address}</li>
            ))}
          </div>
        ) : (
          <div>등록된 지갑 없음</div>
        )}
      </div>
      {/* <div>
        주주명부에 등록된 총 주식 발행량 :
        {totalStocks ? (
          <div>{totalStocks}개</div>
        ) : (
          <div>발행되지 않았습니다</div>
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
              value={`${user.corporation}`}
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
        <button type="submit" className="btn btn-primary">
          발행하기
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={publishTokenFromContract}
        >
          테스트 콘솔
        </button>
      </form>
    </div>
  );
};

PublishToken.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PublishToken);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

const PublishToken = ({ auth: { user } }) => {
  const [values, setValues] = React.useState({
    corporation: user.corporation,
    web3Wallet: null,
    totalStocks: null
  });

  useEffect(() => {
    web3.eth.getAccounts().then(function(result) {
      console.log(result);
      setValues({ web3Wallet: result });
    });
  }, []);

  const { corporation, web3Wallet, totalStocks } = values;

  // 지갑 불러오기
  const accessWallet = () => {
    console.log("지갑 불러오기");
  };

  return (
    <div>
      <div>토큰 발행</div>
      <div>
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
      </div>
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

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVote } from '../actions/vote';
import { Result } from 'express-validator';
import Web3 from 'web3';
import { abi, bytecode } from '../contracts/Token.json'; // 컴파일된 Token 컨트랙트에서 abi값과 bytecode값을 가져온다.
import { voteAbi } from '../contracts/Vote.json'; // 컴파일된 Token 컨트랙트에서 abi값과 bytecode값을 가져온다.
import Axios from 'axios';
import { setAlert } from '../actions/alert';
import { ethers } from 'ethers';

// import Spinner from "../components/Spinner";
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');

const Vote = ({ auth: { user, currentAccount, loading } }) => {
  useEffect(() => {
    getVote().then(data => {
      setValues({
        data: data.contents,
        tokenCA: data.tokenCA
      });
      console.log(data.tokenCA);

      Axios.get('/api/users').then(result => {
        console.log(result);
        const voteCA = result.data.corporation.voteCA;

        console.log(voteCA);
        setVoteCA(voteCA);
      });

      if (currentAccount) {
        const option = {
          from: currentAccount,
          gasPrice: '20000000000'
        };

        const tokenContract = new web3.eth.Contract(abi, data.tokenCA);

        tokenContract.methods
          .balanceOf(currentAccount)
          .call(option)
          .then(result => {
            console.log(result);
            setTokenAmount(result);
          });
      }
    });
  }, [currentAccount]);

  const [voteCA, setVoteCA] = React.useState('');
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [values, setValues] = React.useState({
    data: null,
    tokenCA: null
  });
  console.log(tokenAmount);
  console.log(voteCA);

  const summitVote = () => {
    const option = {
      from: currentAccount,
      gasPrice: '20000000000'
    };
    // let proposals = [];

    // for (let i = 0; i < values.data.length; i++) {
    //   proposals.push(ethers.utils.formatBytes32String(values.data[i]));
    //   console.log(proposals);
    // }

    const votedResult = [true, false];

    const voteContract = new web3.eth.Contract(voteAbi, voteCA);
    voteContract.methods
      .voting(votedResult)
      .send(option)
      .then(receipt => {
        console.log(receipt);

        setAlert(`투표가 완료되었습니다`, 'success');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return values.data === null ? (
    'loading ...'
  ) : (
    <>
      <h1>투표 기능</h1>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>전자 투표권자명</th>
              <th scope='col'>주주 구분</th>
              {/* <th scope='col'>지갑 주소</th> */}
              <th scope='col'>보유 주식 수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.username}</td>
              <td>일반 투표권자</td>
              {/* <td>{currentAccount}</td> */}
              <td>{`${tokenAmount}주`}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      <table className='table'>
        <thead>
          <tr>
            <th>의안 번호</th>
            <th>의안 내용</th>
            <th>의견</th>
          </tr>
        </thead>
        <tbody>
          {values.data.map((data, index) => (
            <tr key={index}>
              <td align='center'>{index + 1}</td>
              <td>{data}</td>
              <td>
                <select
                  id={`result${index}`}
                  className='browser-default custom-select'
                >
                  <option defaultValue>찬성/반대</option>
                  <option value='agree'>찬성</option>
                  <option value='disagree'>반대</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='button'>
        <p className='text-right'>
          {/* <button type='button' className='btn btn-primary'>
            초기화
          </button>{' '}
          &nbsp; &nbsp; */}
          <button
            type='button'
            onClick={summitVote}
            className='btn btn-primary'
          >
            제출
          </button>
        </p>
      </div>
    </>
  );
};

Vote.propTypes = {
  auth: PropTypes.object.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Vote);

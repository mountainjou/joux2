import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { makeVote } from '../actions/vote';
import Alert from '../Alert';
import Spinner from '../components/Spinner';
import Axios from 'axios';
import Web3 from 'web3';

import { voteAbi, bytecode } from '../contracts/Vote.json'; // 컴파일된 Vote 컨트랙트에서 abi값과 bytecode값을 가져온다.
import { ethers } from 'ethers';

// import { getValues } from "jest-validate/build/condition";

// fname: 주주총회 이름, cname: 주주총회 진행 대상회사, options:안건 배열로 나열
const MakeVote = ({
  setAlert,
  makeVote,
  isAuthenticated,
  auth: { user, loading, currentAccount }
}) => {
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');

  useEffect(() => {
    Axios.get('/api/auth').then(result => {
      const tokenCA = result.data.corporation.tokenCA;
      console.log(tokenCA);
      setmeeting({ tokenCA });
    });
  }, []);

  // let contents = [ {cNum, content} ]
  const [meeting, setmeeting] = React.useState({
    tokenCA: '',
    corp: '',
    cNum: '',
    contents: [],
    token: '',
    char: '',
    place: '',
    date: ''
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setmeeting({ ...meeting, [name]: event.target.value });
  };

  const { tokenCA, corp, token, char, place, date } = meeting;

  console.log(corp);

  // 투표 입력 실행
  const onSubmit = async e => {
    e.preventDefault();
    const corpName = document.getElementById('corp').value;

    let contents = rows.map(n => {
      return n.context;
    });
    // makevote 액션을 실행한다.
    // db에 투표 내용 입력하기
    makeVote({
      tokenCA: tokenCA,
      corp: corpName,
      contents,
      token,
      char,
      place,
      date
    });

    console.log(contents);

    let proposals = [];

    for (let i = 0; i < contents.length; i++) {
      proposals.push(ethers.utils.formatBytes32String(contents[i]));
      console.log(proposals);
    }

    const option = {
      from: currentAccount,
      gasPrice: '20000000000'
    };

    const arg = [proposals, tokenCA];

    // default gas price in wei, 20 gwei in this case
    const VoteContract = new web3.eth.Contract(voteAbi, option);
    VoteContract.options.data = bytecode;
    console.log(VoteContract);

    VoteContract.deploy({ arguments: arg })
      .send(
        {
          from: currentAccount
        },
        (err, transactionHash) => {
          // console.log(transactionHash);
        }
      )
      .on('error', err => {})
      .on('transactionHash', transactionHash => {})
      .on('receipt', receipt => {
        // console.log(receipt.contractAddress); // contains the new contract address
      })
      .on('confirmation', (confirmationNumber, receipt) => {})
      .then(newContractInstance => {
        // console.log(newContractInstance.options.address); // instance with the new contract address
        const voteAddress = newContractInstance.options.address;
        console.log(voteAddress);

        const url = '/api/users/registervotecontractaddress';
        const data = {
          email: user.email,
          voteCA: newContractInstance.options.address
        };
        const config = {
          headers: {
            'Content-Type': 'application/json'
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

    // 토큰 컨트랙트 발생시키기
  };

  console.log(meeting);

  const [rows, setRows] = React.useState([]);

  const changeText = id => e => {
    const tempRows = rows.map(row => {
      if (row.id === id + 1) {
        row['context'] = e.target.value;
      }
      return row;
    });
    setRows(tempRows);
  };
  const addRow = () => {
    if (rows.length > 9) return;
    let data = {
      id: rows.length + 1,
      context: ''
    };
    setRows([...rows, data]);
  };
  const deleteRow = id => () => {
    let tempRows = rows.filter(row => {
      return row.id !== id;
    });
    setRows(tempRows);
  };

  return loading === null ? (
    <Spinner />
  ) : (
    <div className='container'>
      <h1>전자투표 등록</h1>
      <br />
      <form onSubmit={e => onSubmit(e)}>
        <div className='bg-dark text-white' style={{ padding: 10 }}>
          <span style={{ fontSize: '1.5rem' }}>주주총회 정보</span>
        </div>
        <table className='table'>
          <tbody>
            <tr>
              <th>회사명</th>
              <td>
                <input
                  className='form-control'
                  type='text'
                  id='corp'
                  readOnly
                  value={user.corporation ? user.corporation.name : ''}
                />
              </td>
              <th>
                <label htmlFor='char'>주주총회성격</label>
              </th>
              <td>
                <input
                  className='form-control'
                  type='text'
                  name='char'
                  id='char'
                  value={meeting.char}
                  onChange={handleChange('char')}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor='date'>주주총회일시</label>
              </th>
              <td>
                <input
                  className='form-control'
                  // type="date"
                  name='date'
                  id='date'
                  value={meeting.date}
                  onChange={handleChange('date')}
                />
              </td>
              <th>
                <label htmlFor='place'>주주총회장소</label>
              </th>
              <td>
                <input
                  className='form-control'
                  type='text'
                  name='place'
                  id='place'
                  value={meeting.place}
                  onChange={handleChange('place')}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <div className='bg-dark text-white' style={{ padding: 10 }}>
          <span style={{ fontSize: '1.5rem' }}>전자투표 의안</span>
          <button
            type='button'
            className='btn btn-light float-right'
            onClick={addRow}
          >
            의안 추가
          </button>
        </div>

        <table className='table table-striped'>
          <colgroup>
            <col width='100px' />
            <col />
            <col width='50px' />
          </colgroup>
          <thead align='center'>
            <tr>
              <th>순번</th>
              <th colSpan='2'>의안 내용</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d, i) => (
              <tr key={i}>
                <td align='center'>{i + 1}</td>
                <td>
                  <input
                    className='form-control'
                    type='text'
                    name='contents'
                    id='contents'
                    onChange={changeText(i)}
                    value={d.context}
                  />
                </td>
                <td>
                  <div onClick={deleteRow(i + 1)}>
                    <i className='fas fa-backspace'></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button type='submit' className='btn btn-primary float-right'>
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
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, { setAlert, makeVote })(MakeVote);

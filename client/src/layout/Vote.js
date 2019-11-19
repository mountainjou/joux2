import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getVote } from "../actions/vote";
import { async } from "rxjs/internal/scheduler/async";
import { get } from "http";
// import { async } from "rxjs/internal/scheduler/async";
// import Spinner from "../components/Spinner";

const Vote = ({ auth: { user, currentAccount, loading } }) => {
  useEffect(() => {
    getVote().then(data => {
      setValues({data:data.data.contents})
    })
  }, [getVote]);

  const [values, setValues] = React.useState({
    redirectRegisterCorporation: false,
    data: null
  });
  console.log(user);
  console.log(values.data)
  let arr =[1,2,3,4,5]

  return (
    values.data === null ? ( "loading ..." ) : (
    <>
      <h1>투표 기능</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>전자투표권자명</td>
              <td>주주 구분</td>
              <td>지갑 주소</td>
              <td>보유 주식 수</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.username}</td>
              <td>일반 투표권자</td>
              <td>{currentAccount}</td>
              <td>524주</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      <table className="table">
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
              <td align="center">{index + 1}</td>
              <td>{data}</td>
              <td>
                <select className="browser-default custom-select">
                  <option defaultValue>찬성/반대</option>
                  <option value="agree">찬성</option>
                  <option value="disagree">반대</option>
                </select>
              </td>
            </tr>
          ))}

          {/* <tr>
            <td>1</td>
            <td>사장 교체의 건</td>
            <td>
              <select className="browser-default custom-select">
                <option defaultValue>찬성/반대</option>
                <option value="agree">찬성</option>
                <option value="disagree">반대</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>1 - 2</td>
            <td>대표이사 선임의 건</td>
            <td>
              <select className="browser-default custom-select">
                <option defaultValue>찬성/반대</option>
                <option value="agree">찬성</option>
                <option value="disagree">반대</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>1 - 3</td>
            <td>임원급 직원 승진의 건</td>
            <td>
              <select className="browser-default custom-select">
                <option defaultValue>찬성/반대</option>
                <option value="agree">찬성</option>
                <option value="disagree">반대</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>합작투자 유치에 관한 건</td>
            <td>
              <select className="browser-default custom-select">
                <option defaultValue>찬성/반대</option>
                <option value="agree">찬성</option>
                <option value="disagree">반대</option>
              </select>
            </td>
          </tr> */}
        </tbody>
      </table>

      <div className="button">
        <p className="text-right">
          <button type="button" className="btn btn-primary">
            초기화
          </button>{" "}
          &nbsp; &nbsp;
          <button type="button" className="btn btn-primary">
            제출
          </button>
        </p>
      </div>
    </>
    )
  )
};

Vote.propTypes = {
  auth: PropTypes.object.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Vote);

import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
// import BulletinWaggu from "./BulletinWaggu";
import { getGongsi } from "../actions/bulletin";
import PropTypes from "prop-types";

const Bulletin = ({ getGongsi, bulletin }) => {

const [gongsi, setGongsi] = useState(null)

useEffect(() => {
  getGongsi()
  console.log("useEffect 정상작동")
}, [])

// const gonggong = bulletin.gongsi.array;
const test = JSON.stringify(bulletin.gongsi);

const gongsiList = bulletin.gongsi.map(list => (<a key={list._id}>{JSON.stringify(list)}</a>))
const jak = bulletin.gongsi.map(list => (<a key={list._id}>{JSON.stringify(list.uname)}</a>))
console.log(jak)

console.log(test);
// const gongsiList = test.map((list) => (<li key={list._id}>{JSON.stringify(list)}</li>));

// {bulletin.gongsi.map(file => {
//   <li key={file._id}>{file}</li>
// })}

  return (
    <div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th>번호</th>
            <th>공시대상회사</th>
            <th>보고서명</th>
            <th>제출일자</th>
            <th>제출인</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <th>{jak}</th>
            {/* <th>1</th>
            <th>{bulletin.uname}</th>
            <th><a href="/BulletinWaggu">{bulletin.rname}</a></th>
            <th>{bulletin.date}</th>
            <th>{bulletin.uname}</th> */}
          </tr>
        </tbody>
      </table>
      <a type="button" className="btn btn-primary float-right" href="/writing">공시 작성</a>
    </div>
  );
};

Bulletin.propTypes = {
  bulletin: PropTypes.object.isRequired,
  getGongsi: PropTypes.func.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
  bulletin: state.bulletin
});

export default connect(
  mapStateToProps,
  { getGongsi }
)(Bulletin);


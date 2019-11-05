import React, { useEffect } from "react";
// import { Redirect } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
// import BulletinWaggu from "./BulletinWaggu";
import { getGongsi } from "../actions/bulletin";
import PropTypes from "prop-types";

const Bulletin = ({ getGongsi, bulletin }) => {
  // const [gongsi, setGongsi] = useState(null);
  useEffect(() => {
    getGongsi();
    console.log("useEffect 정상작동");
  }, [getGongsi]);

  // const gonggong = bulletin.gongsi.array;
  const test = JSON.stringify(bulletin.gongsi);

  let index = bulletin.gongsi.length;
  const gongsiList = bulletin.gongsi.map(list => (
    <tr key={list._id}>
      <td>{index--}</td>
      <td>{list.uname}</td>
      <td>
        <a href={"/bulletinWaggu/" + list._id}>{list.rname}</a>
      </td>{" "}
      {/* /bulletinWaggu/{list._id} */}
      <td>{moment(list.date).format("L")}</td>
      <td>{list.uname}</td>
    </tr>
  ));

  // console.log(jak)
  console.log(test);
  // const gongsiList = test.map((list) => (<li key={list._id}>{JSON.stringify(list)}</li>));

  // {bulletin.gongsi.map(file => {
  //   <li key={file._id}>{file}</li>
  // })}
  // const goToWriting = () => {
  //   console.log("리다이렉트하자");
  //   return <Redirect to="/writing" />;
  // };

  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>번호</th>
            <th>공시대상회사</th>
            <th>보고서명</th>
            <th>제출일자</th>
            <th>제출인</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr> */}
          {gongsiList}
          {/* <th>1</th>
            <th>{bulletin.uname}</th>
            <th><a href="/BulletinWaggu">{bulletin.rname}</a></th>
            <th>{bulletin.date}</th>
            <th>{bulletin.uname}</th> */}
          {/* </tr> */}
        </tbody>
      </table>
      <a href="/writing">
        <button type="button" className="btn btn-primary float-right">
          공시 작성
        </button>
      </a>
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

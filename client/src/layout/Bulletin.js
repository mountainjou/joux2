import React from "react";

const Bulletin = () => {
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
            <th>1</th>
            <th>주식회사 곽철용</th>
            <th><a href="/BulletinWaggu">올림픽대교 정체와 마포대교는 무너줫냐 이쉐키야?</a></th>
            <th>2019-10-15</th>
            <th>고니</th>
          </tr>
        </tbody>
      </table>
      <a type="button" className="btn btn-primary float-right" href="/writing">공시 작성</a>
    </div>
  );
};

export default Bulletin;

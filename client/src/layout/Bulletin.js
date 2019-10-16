import React from "react";
import { Table } from "reactstrap";

const Bulletin = () => {
  return (
    <div>
      <Table>
        <thead>
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
                <th>올림픽대교 정체와 마포대교는 무너줫냐 이쉐키야?</th>
                <th>2019-10-15</th>
                <th>고니</th>
            </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Bulletin;
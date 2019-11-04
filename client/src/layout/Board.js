import React from "react";

const Board = () => {
  return (
    <div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th>게시번호</th>
            <th>작성자</th>
            <th>제목</th>
            <th>조회</th>
            <th>작성일</th>
            <th>추천</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>호구사장</th>
            <th>예림이 그패봐봐</th>
            <th>4885</th>
            <th>2012-12-12</th>
            <th>10</th>
          </tr>
        </tbody>
      </table>
      <a type="button" className="btn btn-primary float-right" href="/writing">글쓰기</a>
    </div>
  );
};

export default Board;
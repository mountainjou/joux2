import React, { useState, Fragment } from "react";
import "./voteStyle.css";

const Vote = () => {


  return (
   <Fragment>
    <div>새로 시작</div>
  
    <h1>투표 기능</h1>

<div className="tables">
    <table className="table">
        <tr>
            <th>전자투표권자명</th>
            <th>주주 구분</th>
            <th>지갑 번호</th>
            <th>보유 주식 수</th>
        </tr>
        <tr>
            <td> - </td>
            <td>일반 투표권자</td>
            <td>0x ...</td>
            <td>524주</td>
        </tr>
    </table>
</div>
    <br />

    <table className="table">
      {/* <table style="text-align:center"> */}
            <tr>
                <th>의안 번호</th>
                <th>의안 내용</th>
                <th>의견</th>
            </tr>
            <tr>
                <td>1</td>
                <td>사장 교체의 건</td>
                <td>
                <div className="dropdown">
                  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="ture" aria-expanded="false">
                  찬성
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#">찬성</a>
                    <a class="dropdown-item" href="#">반대</a>
                  </div>
                </div>
                </td>
            </tr>
            <tr>
                <td>1 - 2</td>
                <td>대표이사 선임의 건</td>
                <td>
                <div class="dropdown">
                  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    찬성
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#">찬성</a>
                    <a class="dropdown-item" href="#">반대</a>
                  </div>
                </div>
                </td>
            </tr>
            <tr>
                <td>1 - 3</td>
                <td>임원급 직원 승진의 건</td>
                <td>
                <div class="dropdown">
                  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    찬성
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#">찬성</a>
                    <a class="dropdown-item" href="#">반대</a>
                  </div>
                </div>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>합작투자 유치에 관한 건</td>
                <td>
                  <div class="dropdown">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      찬성
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a class="dropdown-item" href="#">찬성</a>
                      <a class="dropdown-item" href="#">반대</a>
                    </div>
                  </div>
                </td>
            </tr>
        </table>

        <div className="button">
          <p class="text-right">
            <button type="button" class="btn btn-primary">초기화</button> &nbsp;
            &nbsp;
            <button type="button" class="btn btn-primary">제출</button></p>
        </div> 
     </Fragment>
  )
}

export default Vote;
import React, { useState } from "react";
import { Table } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from "reactstrap";
import './voteStyle.css';

const Vote = (props) => {
  const {
    buttonLabel,
    className
  } = props;

const [modal, setModal] = useState(false);

const toggle = () => setModal(!modal);

  return (
    <div className="Form">
    <div className="Container">

    {/* // html
    <div class="wrapper">
      <div class="box"> 
        <div>저는 세로 중앙에 위치할 예정입니다. :D</div>
      </div>
    </div>

    // css
    <div class="box">
    .wrapper {
      display:table;
    }
    .box {
      display:table-cell;
      vertical-align:middle;
    }
    </div> */}

    <div class="docs-vote">
      <h1>투표기능</h1>

      <table className="table">
      <thead>
        <tr>
          <th>전자투표권자명</th>
          <th>주주 구분</th>
          <th>지갑 번호</th>
          <th>보유 주식 수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">-</th>
          <td>일반 투표권자</td>
          <td>0x ...</td>
          <td>524주</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <br/>

    <table className="Table">
      <thead>
        <tr>
          <th>의안 번호</th>
          <th>의안 내용</th>
          <th>의견</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{paddingBottom:"0.5em"}}>
          <td>1</td>
          <td>사장 교체의 건</td>
          <td>
          <div className="FormGroup">
            <div className="Input" className="align-middle" type="select" name="select" id="exampleSelect">
              <option>찬성</option>
              <option>반대</option>
            </div>
          </div></td>
        </tr>
        <tr>
          <td scope="row">1 - 2</td>
          <td>대표이사 선임의 건</td>
          <td>
          <FormGroup className="FormGroup">
            <div className="Input" type="select" name="select" id="exampleSelect">
              <option>찬성</option>
              <option>반대</option>
            </div>
        </div></td>
        </tr>
        <tr>
          <td scope="row">1 - 3</td>
          <td>임원급 직원 승진의 건</td>
          <td>
          <div className="FormGroup">
            <div className="Input" type="select" name="select" id="exampleSelect">
              <option>찬성</option>
              <option>반대</option>
            </div>
          </div></td>
        </tr>
        <tr>
          <td scope="row">2</td>
          <td>합작투자 유치에 관한 건</td>
          <td>
          <div className="FormGroup">
            <div className="Input" type="select" name="select" id="exampleSelect">
              <option>찬성</option>
              <option>반대</option>
            </div>
          </div></td>
        </tr>
      </tbody>
    </div>

    <br/>

    <div>
    <div className="Row">
    <div className="Button" onClick={toggle}>초기화{buttonLabel}</div>
    <div className="Col" xs="10"> </div>
    <div className="Modal" isOpen={modal} toggle={toggle} className={className}>
      <div className="ModalHeader" toggle={toggle}>초기화</div>
      <div className="ModalBody">
      투표를 초기화하겠습니까?
      </div>
      <div className="ModalFooter">
        <div className="Button" color="primary" onClick={toggle}>선택</div>{' '}
        <div className="Button" color="secondary" onClick={toggle}>취소</div>
      </div>
    </div>

    <div className="Button" onClick={toggle}>제출{buttonLabel}</div>
    <div className="Col" xs="4"> </div>
    <div className="Modal" isOpen={modal} toggle={toggle} className={className}>
      <div className="ModalHeader" toggle={toggle}>제출</div>
      <div className="ModalBody">
      제출하시겠습니까?
      </div>
      <div className="ModalFooter">
        <div className="Button" color="primary" onClick={toggle}>선택</div>{' '}
        <div className="Button" color="secondary" onClick={toggle}>취소</div>
      </div>
    </div>
    </div>
    </div>

    
    </div>
    </div>
  );
}

export default Vote;

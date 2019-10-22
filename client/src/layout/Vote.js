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
    <Form>
    <Container>

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

      <Table striped>
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
    </Table>
    <br/>

    <Table striped >
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
          <FormGroup>
            <Input className="align-middle" type="select" name="select" id="exampleSelect">
              <option>찬성</option>
              <option>반대</option>
            </Input>
          </FormGroup></td>
        </tr>
        <tr>
          <td scope="row">1 - 2</td>
          <td>대표이사 선임의 건</td>
          <td>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option>찬성</option>
              <option>반대</option>
            </Input>
        </FormGroup></td>
        </tr>
        <tr>
          <td scope="row">1 - 3</td>
          <td>임원급 직원 승진의 건</td>
          <td>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option>찬성</option>
              <option>반대</option>
            </Input>
          </FormGroup></td>
        </tr>
        <tr>
          <td scope="row">2</td>
          <td>합작투자 유치에 관한 건</td>
          <td>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option>찬성</option>
              <option>반대</option>
            </Input>
          </FormGroup></td>
        </tr>
      </tbody>
    </Table>

    <br/>

    <div>
    <Row>
    <Button onClick={toggle}>초기화{buttonLabel}</Button>
    <Col xs="10"> </Col>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>초기화</ModalHeader>
      <ModalBody>
      투표를 초기화하겠습니까?
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>선택</Button>{' '}
        <Button color="secondary" onClick={toggle}>취소</Button>
      </ModalFooter>
    </Modal>

    <Button onClick={toggle}>제출{buttonLabel}</Button>
    <Col xs="4"> </Col>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>제출</ModalHeader>
      <ModalBody>
      제출하시겠습니까?
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>선택</Button>{' '}
        <Button color="secondary" onClick={toggle}>취소</Button>
      </ModalFooter>
    </Modal>
    </Row>
    </div>

    <Table striped>
      <thead>
        <tr>
          <td></td>
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
    </Table>
    <br/>
    </div>
    <br/>
        <Button>초기화</Button>
        <Button>제출</Button>
    </Container>
    </Form>
  );
}

export default Vote;

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { appendRow } from "../actions/appendRow";
import classNames from "classnames";
import "./Mkvote.css"

const Mkvote = ({ auth: { user, currentAccount, loading }
    }, onClick, context) => {
        let btnClass = classNames('btn', 'btn-primary', 'add', 'float-right')
    return (
        <div className="main">
            <h1>전자투표 등록</h1><br />
            <p>주주 총회 정보</p>
            <table className="table">
                <thead></thead>
                <tbody>
                <tr>
                    <th className="fix">회사명</th>
                    <td className="input"><input type="text" className="comname" /></td>
                    <th className="fix">주주총회구분</th>
                    <td className="input"><input type="text" className="confdiv" /></td>
                </tr>
                <tr>
                    <th className="fix">주주총회일시</th>
                    <td className="input"><input type="date" className="confdate" /></td>
                    <th className="fix">주주총회장소</th>
                    <td className="input"><input type="text" className="confloc" /></td>
                </tr>
                </tbody>
            </table><br />

            <p>전자투표 의안
            <button type="button" className={btnClass}
                onClick={onClick}>의안 추가</button>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>의안 내용</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* <tr>
                        <td>1</td>
                        <td><input type="text" className="sug" /></td>
                        <td></td>
                    </tr> */}
                    {context}
                    </tbody>
                </table><br />

            <p>의안관련자료
                <button type="button" className={btnClass}>파일 추가</button>
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>제목</th>
                        <th>파일명</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* <Row /> */}
                        <td>1</td><td></td><td></td><td></td>
                    </tr>
                </tbody>
            </table>
        <button type="button" className="btn btn-primary float-right">제출</button>
        </div>
)};

Mkvote.propTypes = {
    auth: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    context: PropTypes.string.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
    auth: state.auth,
    context: state.context
});

const mapDispatchToProps = dispatch => ({
    appendRow : text => dispatch(appendRow(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Mkvote);
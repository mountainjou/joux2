import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Mkvote.css"
let btnClass = classNames('btn', 'btn-primary', 'small', 'float-right')

const Mkvote = ({ auth: { user, currentAccount, loading } }) => {
    // 전자투표 의안
    const [rows, setRows] = useState([]);

    const changeText = id => e => {
        const {
            target: { value }
        } = e;
        const tempRows = rows.map(row => {
            if (row.id === id + 1) {
                row["context"] = value;
            }
            return row;
        });
        setRows(tempRows);
    }
    const addRow = () => {
        if(rows.length > 9) return;
        let data = {
            id: rows.length + 1,
            context: ""
        };
        setRows([...rows, data]);
    };
    const deleteRow = id => () => {
        let tempRows = rows.filter(row => {
            return row.id !== id + 1;
        });
        setRows(tempRows);
    }

    return (
        <>
        <h1>전자투표 등록</h1><br />
        <div>
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
                    onClick={addRow}>의안 추가</button>

            </p>
            <table className="table table-striped">
                <colgroup>
                    <col width="100px" />
                    <col />
                    <col width="50px"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>순번</th>
                        <th colSpan='2'>의안 내용</th>
                    </tr>
                </thead>
                <tbody id="mbti">

                {rows.map((d, i) => (
                        <tr key={i}>
                            <td align="center">{i + 1}</td>
                            <td><input type="text" onChange={changeText(i)} value={d.context} /></td>
                            <td><div onClick={deleteRow(i)}>
                                <i className="fas fa-backspace"></i>
                                </div></td>
                        </tr>
                    ))}
                </tbody>
            </table><br />
            <button type="button" className="btn btn-primary float-right">제출</button>
    </div>
    </>
)};

Mkvote.propTypes = {
    auth: PropTypes.object.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Mkvote);
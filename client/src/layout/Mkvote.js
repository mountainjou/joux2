import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// const Row = ({id}) => {
//     <tr>
//         <td>
//             <td></td>
//             <td><input type="text" className="sug" /></td>
//         </td>
//         </tr>
// };

const Vote = ({ auth: { user, currentAccount, loading } }) => {
    return (
        <div>
            <h1>전자투표 등록</h1><br />
            <p>주주 총회 정보</p>
            <table className="table">
                <tr>
                    <td>회사명</td>
                    <td><input type="text" className="comname" /></td>
                    <td>주주총회구분</td>
                    <td><input type="text" className="confdiv" /></td>
                </tr>
                <tr>
                    <td>주주총회일시</td>
                    <td><input type="date" className="confdate" /></td>
                    <td>주주총회장소</td>
                    <td><input type="text" className="confloc" /></td>
                </tr>
            </table><br />

            <p>의안
            <button type="button" className="btn btn-primary float-right">의안 추가</button>
            </p>
            <table className="table">
                    <tr>
                        <th>의안 번호</th>
                        <th>의안 내용</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td><input type="text" className="sug" /></td>
                    </tr>
                </table>

    <button type="button" className="btn btn-primary float-right">초기화</button>
    <button type="button" className="btn btn-primary float-right">제출</button>

        </div>
)};

Vote.propTypes = {
    auth: PropTypes.object.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Vote);

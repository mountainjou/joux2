import React, { useEffect, useState } from "react";
import moment from 'moment';
import { connect } from "react-redux";
import { getGongsiDetail } from "../actions/bulletin";
import PropTypes from "prop-types";


const BulletinWaggu = ({ match, getGongsiDetail, bulletin }) => {

    const id = match.params.id;
    console.log(id)
    // const testtest = moment().format('L');
    // console.log(testtest);
    useEffect(() => {
        getGongsiDetail(id)
        console.log("useEffect 정상작동")
    }, [])

    const test = JSON.stringify(bulletin.gongsiDetail);

    console.log(test);

    return (
        <div className="container" style={{ width: 800, marginTop: 50 }}>
            {/* 제목 */}
            <div className="border-bottom border-dark">
                <h3 className="font-weight-bold">제목</h3><br />
                <h6 className="text-right">날짜 / 작성인</h6>
            </div>
            {/* 컨텐츠 */}

            <div className="justify-content-center" style={{ marginTop: 50, width: 600 }}>
                <a className="text-wrap text-center">입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨입숨</a>
            </div>


            {/* 목록 회귀 / 오늘의 띵언 */}
            <div className="border-top border-dark" style={{ marginTop: 50, width: 775 }}>
                <div>
                    <a className="btn btn-dark fa fa-bars" type="button" href="/bulletin"></a>
                </div>
                <div className="text-right">
                    <p>한 끗에 오억을 태워?</p>
                </div>
            </div>
        </div>
    );
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
    bulletin: state.bulletin
  });

export default connect(
    mapStateToProps,
    { getGongsiDetail }
  )(BulletinWaggu);
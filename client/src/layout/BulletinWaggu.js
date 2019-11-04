import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { getGongsiDetail } from "../actions/bulletin";
import PropTypes from "prop-types";

const BulletinWaggu = ({
  match,
  getGongsiDetail,
  bulletin: { gongsiDetail, loading }
}) => {
  const id = match.params.id;
  console.log(id);
  useEffect(() => {
    getGongsiDetail(id);
    console.log("useEffect 정상작동");
  }, [getGongsiDetail]);

  //  const test = JSON.stringify(gongsiDetail);

  console.log(gongsiDetail);
  //  console.log(rname, uname, report, date);

  //  const Detail = test.map ( detail => (
  //     <div className="container" style={{ width: 800, marginTop: 50 }} key={detail._id}>
  //         <div className="border-bottom border-dark">
  //             <h3 className="font-weight-bold">{detail.rname}</h3><br />
  //             <h6 className="text-right">{moment(detail.date).format('L')} / {detail.uname}</h6>
  //         </div>
  //         <div className="justify-content-center" style={{ marginTop: 50, width: 600 }}>
  //             <a className="text-wrap text-center">{detail.report}</a>
  //         </div>
  //         <div className="border-top border-dark" style={{ marginTop: 50, width: 775 }}>
  //             <div className="row">
  //                 <div className="col-sm">
  //                     <a className="btn btn-dark fa fa-bars" type="button" href="/bulletin" style={{ marginTop: 20 }}>목록</a>
  //                 </div>
  //                 <div className="col-sm">
  //                     <p className="text-right" style={{ marginTop: 25 }}>오늘의 명언 : 한 끗에 오억을 태워?</p>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // )
  // );

  return loading === null ? (
    <div>로딩중</div>
  ) : (
    <div>
      <div className="container" style={{ width: 800, marginTop: 50 }}>
        {/* 제목 */}
        <div className="border-bottom border-dark">
          <h3 className="font-weight-bold">{gongsiDetail.rname}</h3>
          <br />
          <h6 className="text-right">
            {moment(gongsiDetail.date).format("L")} / {gongsiDetail.uname}
          </h6>
        </div>
        {/* 컨텐츠 */}

        <div
          className="justify-content-center"
          style={{ marginTop: 50, width: 600 }}
        >
          <a className="text-wrap text-center">{gongsiDetail.report}</a>
        </div>

        {/* 목록 회귀 / 오늘의 띵언 */}
        <div
          className="border-top border-dark"
          style={{ marginTop: 50, width: 775 }}
        >
          <div className="row">
            <div className="col-sm">
              <a href="/bulletin">
                <button
                  type="button"
                  className="btn btn-dark fa fa-bars"
                  type="button"
                  style={{ marginTop: 20 }}
                >
                  목록
                </button>
              </a>
            </div>
            <div className="col-sm">
              <p className="text-right" style={{ marginTop: 25 }}>
                오늘의 명언 : 한 끗에 오억을 태워?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BulletinWaggu.propTypes = {
  bulletin: PropTypes.object.isRequired,
  getGongsiDetail: PropTypes.func.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
  bulletin: state.bulletin
});

export default connect(
  mapStateToProps,
  { getGongsiDetail }
)(BulletinWaggu);

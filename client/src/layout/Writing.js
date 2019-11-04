import React from "react";
import {Redirect} from "react-router-dom"
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const Writing = ({auth : {  user, loading }}) => {

    var d = new Date();
    var ISOData = d.toISOString();
    var ISODate = ISOData.split("T", 1);

    const [values, setValues] = React.useState({
        rname: "",
        report: "",
        file: "",
        isWritten: false
    });

    // 폼에서 입력되는 값을 상태값에 지정
    const handleChange = name => event => {
    
        setValues({ ...values, [name]: event.target.value });
    };
    const { rname, report, file, isWritten } = values;

    // console.log(values)
    // console.log(user.username)

    const forTest = async (e) => {
        e.preventDefault();
        values.uname = user.username
        console.log(values);
        axios.post(
            '/api/bulletin',
            {values}
        )
        .then(res => {
            console.log(res);
            setValues({isWritten: true});
        })
        .catch(err => {
        console.log(err);
        });
    }

    if(isWritten){
        return <Redirect to="/bulletin" />
    }

    return loading === null ? (<div>로딩중</div>): (

        <div className="container">

            <div>
                <h2>공시 작성</h2>
                <p>등록할 공시를 양식에 맞춰 작성해주십시오.</p>
            </div>

            <form className="was-validated" id="gongsi" name="gongsi" onSubmit={e => { forTest(e) }}>

                <div className="form-group">
                    <label htmlFor="rname">보고서명</label>
                    <input type="text" className="form-control" id="rname" placeholder="보고서명 입력" name="rname" value={values.rname} onChange={handleChange('rname')} required />
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">보고서명을 입력해 주세요</div>
                </div>

                <div className="form-group">
                    <label htmlFor="uname">등록인</label>
                    <input type="text" className="form-control" disabled id="uname" name="uname" value={user.username} onChange={handleChange('uname')} required />
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">등록인을 입력해 주세요</div><br />
                </div>

                <div className="form-group">
                    <label htmlFor="report">공시 내용</label>
                    <textarea type="text" className="form-control" rows="10" id="report" name="report" value={values.report} onChange={handleChange('report')} required></textarea>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">내용을 추가해 주세요</div>
                </div>

                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile02" value={values.file} onChange={handleChange('file')} />
                            <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                        </div>
                    </div>
                </div>
                <p className="text-right"><i>{ISODate}</i></p>
                <button type="summit" className="btn btn-primary float-right" data-toggle="modal" data-target="values">제출</button>

            </form>

        </div>

    );
};

Writing.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  // 상태값 변수에 대입
  const mapStateToProps = state => ({
    auth: state.auth
  });


export default connect(mapStateToProps)(Writing);
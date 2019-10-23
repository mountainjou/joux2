import React from "react";

const Writing = () => {

    var d= new Date(); 		 			
    var ISOData = d.toISOString();           
    var ISODate = ISOData.split("T",1); 

    const submitBtn = () => {
        console.log('되었음')
    }

    return (

        <div className="container">

            <div>
                <h2>공시 작성</h2>
                <p>등록할 공시를 양식에 맞춰 작성해주십시오.</p>
            </div>

            <form className="was-validated">

                <div className="form-group">
                    <label for="rname">보고서명</label>
                    <input type="text" className="form-control" id="rname" placeholder="보고서명 입력" name="rname" required />
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">보고서명을 입력해 주세요</div>
                </div>

                <div className="form-group">
                    <label for="uname">등록인</label>
                    <input type="text" className="form-control" id="uname" placeholder="등록인 입력" name="uname" required />
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">등록인을 입력해 주세요</div><br />
                </div>

                <div className="form-group">
                    <label for="report">공시 내용</label>
                    <textarea type="text" className="form-control" rows="10" id="report" name="report" required></textarea>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">내용을 추가해 주세요</div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">파일 업로드</button>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback"></div>
                    <p className="text-right"><i>{ISODate}</i></p>
                </div>

                <button type="button" className="btn btn-primary float-right" onClick={submitBtn}>제출</button>

            </form>

        </div>

    );
  };

export default Writing;
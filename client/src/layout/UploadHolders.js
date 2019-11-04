import React, { useMemo } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../Alert";
import { setAlert } from "../actions/alert";
import Spinner from "../components/Spinner";

// dropzone 스타일 설정
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

// UploadHolders 함수형 컴포넌트 작성
const UploadHolders = ({ setAlert, auth: { user, loading } }) => {
  // 오피스 엑셀 파일 수락을 위한 파일 옵션
  // text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept:
      "text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const uploadList = async () => {
    // console.log(user);
    // console.log(acceptedFiles[0]);
    const file = acceptedFiles[0];
    // 만약 파일이 첨부되지 않았다면 setAlert() 액션을 실행한다.
    if (!file) {
      return setAlert("파일이 첨부되지 않았습니다", "danger");
    }
    const url = "/api/upload/holderlist";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", JSON.stringify(user));
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    // uploadStockHoldersList();
    // const res = await axios.post(url, formData, config);
    axios
      .post(url, formData, config)
      .then(res => {
        // response된 데이터를 setAlert 액션으로 넘겨준다.
        console.log(res);
        setAlert(res.data.msg, res.data.alertType);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return loading === null ? (
    <Spinner />
  ) : (
    // <Form onSubmit={e => onSubmit(e)}>
    <div className="container">
      <div
        {...getRootProps({
          className: "dropzone",
          style
        })}
      >
        <input {...getInputProps()} />
        <p>
          주주 명부 파일을 박스 안으로 끌어서 이동하거나 클릭하여 첨부하세요
        </p>
        <em>(엑셀 파일을 업로드 하세요)</em>
      </div>
      <div>
        <h4>첨부된 파일</h4>
        <ul>{acceptedFilesItems}</ul>
        {/* <h4>거부된 파일</h4>
        <ul>{rejectedFilesItems}</ul> */}
        <button className="btn btn-primary" onClick={uploadList}>
          업로드
        </button>
      </div>
      <br />
      {/* AlertMsg 컴포넌트 발생 */}
      <Alert />
    </div>
  );
};

UploadHolders.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(UploadHolders);

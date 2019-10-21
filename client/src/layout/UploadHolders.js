import React, { useState, useMemo } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
const UploadHolders = ({ auth: { user } }) => {
  // 오피스 엑셀 파일 수락을 위한 파일 옵션
  // text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept:
      "text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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

  // const rejectedFilesItems = rejectedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  const uploadList = async () => {
    // console.log(user);
    // console.log(acceptedFiles[0]);
    const file = acceptedFiles[0];
    const url = "/api/upload/holderlist";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", JSON.stringify(user));
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    // uploadStockHoldersList();
    const res = await axios.post(url, formData, config);
    console.log(res.data);
  };

  return (
    // <Form onSubmit={e => onSubmit(e)}>
    <section className="container">
      <div {...getRootProps({ className: "dropzone", style })}>
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop stockholder's list file here, or click to select file
        </p>
        {/* <em>(엑셀 파일을 업로드 하세요)</em> */}
      </div>
      <aside>
        <h4>Accepted file</h4>
        <ul>{acceptedFilesItems}</ul>
        {/* <h4>Rejected files</h4>
        <ul>{rejectedFilesItems}</ul> */}
        <Button color="primary" onClick={uploadList}>
          Upload
        </Button>
      </aside>
    </section>
  );
};

UploadHolders.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UploadHolders);

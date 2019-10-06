import React, { useState, useMemo } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import { useDropzone } from "react-dropzone";

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

const UploadHolders = props => {
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
      "text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // const uploadList = async e => {
  //   const formData = holderList;
  //   e.preventDefault();
  //   // uploadStockHoldersList();
  //   const res = await axios.post("/routes/api/upload/holderlist", formData, {
  //     headers: { "Content-Type": "multipart/form-data" }
  //   });
  //   console.log(res.data);
  // };

  return (
    // <Form onSubmit={e => onSubmit(e)}>
    <section className="container">
      <div {...getRootProps({ className: "dropzone", style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(엑셀 파일을 업로드 하세요)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFilesItems}</ul>
        <h4>Rejected files</h4>
        <ul>{rejectedFilesItems}</ul>
      </aside>
    </section>
  );
};

export default UploadHolders;

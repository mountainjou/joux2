import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const UploadHolders = () => {
  const onSubmit = async e => {
    e.preventDefault();
    // uploadStockHoldersList();
  };

  return (
    <Form onSubmit={e => onSubmit(e)}>
      <FormGroup>
        <Label for="uploadStockHoldersList">주주명부 업로드</Label>
        <Input type="file" name="file" id="uploadStockHoldersList" />
        <FormText color="muted">
          오피스 워드 파일 형식으로 주주명부 업로드
        </FormText>
      </FormGroup>
      <Button>업로드</Button>
    </Form>
  );
};

export default UploadHolders;

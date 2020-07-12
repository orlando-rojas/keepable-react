//import React from "react";
import styled from "@emotion/styled";

export const CreateNoteForm = styled.form`
  position: relative;
  margin: 20px auto 60px auto;
  width: 600px;
  height: 150px;
  background: #ffffff;
  box-shadow: 5px 5px 15px rgba(153, 155, 158, 0.85);
  border-radius: 8px;
  padding: 20px 20px 20px 20px;
`;

export const FormInput = styled.input`
  border: none;
  margin-bottom: 10px;
  height: 20px;
  width: 100%;
  background-color: inherit;
  &::placeholder {
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.25px;
  }
`;
export const FormBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 29px;
`;

export const ColorsWrapper = styled.div`
  background-color: #eee;
  height: 65px;
  width: 155px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  position: absolute;
  bottom: 30px;
  left: -60px;
`;

export const BtnKeepIt = styled.input`
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.25px;
  color: #000000;
  border: none;
  background: none;
`;

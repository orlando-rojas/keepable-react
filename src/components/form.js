/** @jsx jsx */
import { useState } from "react";
import "../App.css";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import paletteIcon from "../images/icons/color-picker.svg";
import { createNote } from "../api";
import { COLORES, COLORES_KEYS } from "../App";
import { Circle } from "./styles";

const CreateNoteForm = styled.form`
  position: relative;
  margin: 20px auto 60px auto;
  width: 600px;
  height: 150px;
  background: #ffffff;
  box-shadow: 5px 5px 15px rgba(153, 155, 158, 0.85);
  border-radius: 8px;
  padding: 20px 20px 20px 20px;
`;

const FormInput = styled.input`
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
const FormBottom = styled.div`
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

const BtnKeepIt = styled.input`
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.25px;
  color: #000000;
  border: none;
  background: none;
`;

function ColorCircle({ color, formData, setFormData, togglePalette }) {
  function handleColorChange() {
    setFormData({
      ...formData,
      color,
    });
    togglePalette();
  }

  return (
    <Circle
      onClick={handleColorChange}
      css={css`
        background-color: ${COLORES[color]};
      `}
    />
  );
}

export default function NewNoteForm({ setNotes, notes }) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    color: "",
  });

  const [showPalete, setShowPalete] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addNote(formData);
    e.target.reset();
  }

  async function addNote(formData) {
    try {
      const newNote = await createNote(formData);
      setNotes([...notes, newNote]);
    } catch (e) {
      alert("There as a problem accessing the comments. Please try again");
    }
  }

  function togglePalette() {
    setShowPalete(!showPalete);
  }

  return (
    <CreateNoteForm
      onSubmit={handleSubmit}
      css={css`
      background-color: ${COLORES[formData.color]};
    }
  `}
    >
      <FormInput
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
      />
      <FormInput
        type="text"
        placeholder="Take a note"
        name="body"
        onChange={handleChange}
      />
      <FormBottom>
        {showPalete ? (
          <ColorsWrapper>
            {COLORES_KEYS.map((color) => {
              return (
                <ColorCircle
                  color={color}
                  formData={formData}
                  setFormData={setFormData}
                  togglePalette={togglePalette}
                />
              );
            })}
          </ColorsWrapper>
        ) : null}

        <img src={paletteIcon} alt="color picker" onClick={togglePalette} />
        <BtnKeepIt type="submit" value="Keep it!" />
      </FormBottom>
    </CreateNoteForm>
  );
}

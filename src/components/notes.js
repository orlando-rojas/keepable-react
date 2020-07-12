/** @jsx jsx */
import { useState } from "react";
import "../App.css";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import trashIcon from "../images/icons/trash.svg";
import paletteIcon from "../images/icons/color-picker.svg";
import recoveryIcon from "../images/icons/restore.svg";
import { getNotes, updateNote, deleteNote } from "../api";
import {ColorsWrapper} from "./form";
import {Circle} from "./styles";

const COLORES = {
  white: "#FFFFFF",
  salmon: "#F28B82",
  orange: "#FBBC04",
  yellow: "#FFF475",
  green: "#CCFF90",
  teal: "#A7FFEB",
  light_blue: "#CBF0F8",
  blue: "#AECBFA",
  purple: "#D7AEFB",
  pink: "#FDCFE8",
};

const COLORES_KEYS = Object.keys(COLORES);


export const Notes = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;

const CardBottom = styled.div` 
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 63px;
  justify-content: space-between;
`;

const Card = styled.div`
  width: 260px;
  height: 260px;
  margin-right: 20px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 5px 5px 15px rgba(153, 155, 158, 0.85);
  border-radius: 8px;
  padding: 20px;
  padding-bottom: 2px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
  background-color: #fff;
`;

const CardTitle = styled.h3`
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.25px;
  color: #000000;
`;

const NotesContainer = styled.div`
  display: flex;
  margin: 30px;
  flex-wrap: wrap;
`;

export default function NotesList({ section, notes, setNotes }) {
  return (
    <NotesContainer>
      {notes.map((note) =>
        typeof note.deleted_at === typeof section ? (
          <Note key={note.id} item={note} setNotes={setNotes} notes={notes} />
        ) : null
      )}
    </NotesContainer>
  );
}


function Note({ item, setNotes, notes }) {
  function handleDelete() {
    permanentDelete(item);
  }

  async function permanentDelete(item) {
    try {
      await deleteNote(item.id);
      //const newNotes = notes.filter((note) => item.id !== note.id);
      //setNotes(newNotes);
      getNotes().then((notes) => setNotes(notes));
    } catch (e) {
      alert("There as a problem deleting the comments. Please try again");
    }
  }

  async function handleRecover() {
    try {
      const newNote = await updateNote(item.id, { deleted_at: null });
      const newNotes = notes.map((note) => {
        if (note.id === item.id) {
          return newNote;
        } else {
          return note;
        }
      });
      setNotes(newNotes);
      //getNotes().then((notes) => setNotes(notes))
    } catch (e) {
      alert("There as a problem deleting the comments. Please try again");
    }
  }

  const [showPalete, setShowPalete] = useState(false);

  function togglePalete() {
    setShowPalete(!showPalete);
  }

  return (
    <Card
      css={css`
        background-color: ${COLORES[item.color]};
      `}
    >
      <div>
        <CardTitle>{item.title}</CardTitle>
        <CardText>{item.body}</CardText>
      </div>
      <CardBottom>
        {showPalete ? (
          < ColorsWrapper>
            {COLORES_KEYS.map((color) => {
              return <NoteCircle key={Date.now()} color={color} item={item} setNotes={setNotes} notes={notes} togglePalete={togglePalete}/>;
            })}
          </ ColorsWrapper>
        ) : null}
        <img
          src={paletteIcon}
          alt="palette"
          className={item.deleted_at === null ? "icon-paleta" : "hidden"}
          onClick={togglePalete}
        />
        <img src={trashIcon} alt="trash" onClick={handleDelete} />
        <img
          src={recoveryIcon}
          className={item.deleted_at === null ? "hidden" : ""}
          alt="recover"
          onClick={handleRecover}
        />
      </CardBottom>
    </Card>
  );
}

function NoteCircle({ color, setNotes, item, notes, togglePalete }) {
  
  async function handleChangeColor() {
    try {
      const newNote = await updateNote(item.id, { color });
      const newNotes = notes.map((note) => {
        if (note.id === item.id) {
          return newNote;
        } else {
          return note;
        }
      });
      setNotes(newNotes);
      togglePalete();
      //getNotes().then((notes) => setNotes(notes))
    } catch (e) {
      alert("There as a problem deleting the comments. Please try again");
    }
  }
  
  return (
    <Circle
      css={css`
        background-color: ${COLORES[color]};
      `}
      onClick={handleChangeColor}
    />
  );
}
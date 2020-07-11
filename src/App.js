/* @jsx jsx */
import React, { useState, useEffect } from "react";
import "./App.css";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import logo from "./images/logo.png";
import trashIcon from "./images/icons/trash.svg";
import bracesIcon from "./images/icons/code.svg";
import paletteIcon from "./images/icons/color-picker.svg";
import recoveryIcon from "./images/icons/restore.svg";
import { getNotes, createNote, updateNote, deleteNote } from "../src/api";

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

function Header() {
  return (
    <header>
      <img src={logo} height="138px" className="keepable-logo" alt="logo" />
      <p className="welcome-msg">Welcome to keepable.</p>
    </header>
  );
}

function Navbar({ setSection }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li
          className="nav-item active"
          onClick={() => {
            setSection(null);
          }}
        >
          <img src={bracesIcon} alt="curly braces" />
          <span>Notes</span>
        </li>
        <li
          className="nav-item"
          onClick={() => {
            setSection("trash");
          }}
        >
          <img src={trashIcon} alt="trash icon" />
          <span>Trash</span>
        </li>
      </ul>
    </nav>
  );
}

function NoteCircle({ color, setNotes, item, notes }) {
  
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
      //getNotes().then((notes) => setNotes(notes))
    } catch (e) {
      alert("There as a problem deleting the comments. Please try again");
    }
  }
  
  return (
    <div
      className="color"
      css={css`
      background-color: ${COLORES[color]};
      `}
      onClick={handleChangeColor}
    ></div>
  );
}

function ColorCircle({ color, formData, setFormData }) {
  function handleColorChange() {
    setFormData({
      ...formData,
      color,
    });
  }

  return (
    <div
      className="color"
      onClick={handleColorChange}
      css={css`
      background-color: ${COLORES[color]};
      }
    `}
    ></div>
  );
}

function NewNoteForm({ setNotes, notes }) {
  console.log(notes);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    color: "",
  });

  console.log(formData);

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
  }

  async function addNote(formData) {
    try {
      const newNote = await createNote(formData);
      setNotes([...notes, newNote]);
    } catch (e) {
      alert("There as a problem accessing the comments. Please try again");
    }
  }

  console.log(formData);

  const [showPalete, setShowPalete] = useState(false);

  function togglePalette() {
    setShowPalete(!showPalete);
  }

  return (
    <form
      id="new-note"
      className="new-note-form"
      onSubmit={handleSubmit}
      css={css`
      background-color: ${COLORES[formData.color]};
    }
  `}
    >
      <input
        type="text"
        placeholder="Title"
        className="new-note-input"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Take a note"
        className="new-note-input"
        name="body"
        onChange={handleChange}
      />
      <div className="form-bot">
        {showPalete ? (
          <div className="colors-wrapper">
            {COLORES_KEYS.map((color) => {
              return (
                <ColorCircle
                  color={color}
                  formData={formData}
                  setFormData={setFormData}
                />
              );
            })}
          </div>
        ) : null}

        <img
          src={paletteIcon}
          alt="color picker"
          className="icon-paleta"
          onClick={togglePalette}
        />
        <input type="submit" value="Keep it!" className="btn-keep-it" />
      </div>
    </form>
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
    <div
      className="card"
      css={css`
        background-color: ${item.color};
      `}
    >
      <div>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-text">{item.body}</p>
      </div>
      <div className="card-bottom">
        {showPalete ? (
          <div className="colors-wrapper">
            {COLORES_KEYS.map((color) => {
              return <NoteCircle color={color} item={item} setNotes={setNotes} notes={notes}/>;
            })}
          </div>
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
      </div>
    </div>
  );
}

function NotesList({ section, notes, setNotes }) {
  return (
    <div className="saved-notes">
      {notes.map((note) =>
        typeof note.deleted_at === typeof section ? (
          <Note item={note} setNotes={setNotes} notes={notes} />
        ) : null
      )}
    </div>
  );
}

function SavedNotes({ section, notes, setNotes }) {
  return (
    <div className="notes">
      {section === null ? (
        <NewNoteForm setNotes={setNotes} notes={notes} />
      ) : null}
      <NotesList section={section} notes={notes} setNotes={setNotes} />
    </div>
  );
}
export default function App() {
  const [section, setSection] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => getNotes().then((notes) => setNotes(notes)), []);

  return (
    <div>
      <Header />
      <main>
        <Navbar setSection={setSection} />
        <SavedNotes section={section} notes={notes} setNotes={setNotes} />
      </main>
    </div>
  );
}

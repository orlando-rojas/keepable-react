import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/logo.png";
import trashIcon from "./images/icons/trash.svg";
import bracesIcon from "./images/icons/code.svg";
import paletteIcon from "./images/icons/color-picker.svg";
import recoveryIcon from "./images/icons/restore.svg";
import { getNotes, createNote, updateNote, deleteNote } from "../src/api";

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

function NewNoteForm({ setNotes, notes }) {
  console.log(notes);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    color: "white",
  });

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

  return (
    <form id="new-note" className="new-note-form" onSubmit={handleSubmit}>
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
        <div className="colors-wrapper hidden">
          <div className="color blanco" data-color="#FFFFFF"></div>
          <div className="color coral" data-color="#F28B82"></div>
          <div className="color mostaza" data-color="#FBBC04"></div>
          <div className="color amarillo" data-color="#FFF475"></div>
          <div className="color verde" data-color="#CCFF90"></div>
          <div className="color turquesa" data-color="#A7FFEB"></div>
          <div className="color celeste" data-color="#CBF0F8"></div>
          <div className="color azul" data-color="#AECBFA"></div>
          <div className="color morado" data-color="#D7AEFB"></div>
          <div className="color rosado" data-color="#FDCFE8"></div>
        </div>
        <img src={paletteIcon} alt="color picker" className="icon-paleta" />
        <input type="submit" value="Keep it!" className="btn-keep-it" />
      </div>
    </form>
  );
}

function Note({ item, setNotes, notes }) {

  function handleDelete() {
    item.deleted_at === null ? goToTrash() : permanentDelete();
  }

  async function goToTrash() {
    try {
      const newNote = await updateNote(item.id, {deleted_at: "ga"});
      setNotes([...notes, newNote]);
    } catch (e) {
      alert("There as a problem deleting the comments. Please try again");
    }
  }
  

  async function permanentDelete() {
    try {
      const newNote = await deleteNote(item.id);
      //setNotes([...notes, newNote]);
    } catch (e) {
      alert("There as a problem deleting the comments. Please try again");
    }
  }  


  return (
    <div className="card">
      <div>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-text">{item.body}</p>
      </div>
      <div className="card-bottom">
        <img
          src={paletteIcon}
          alt="palette"
          className={item.deleted_at === null ? "icon-paleta" : "hidden"}
        />
        <img src={trashIcon} alt="trash" onClick={handleDelete} />
        <img
          src={recoveryIcon}
          className={item.deleted_at === null ? "hidden" : ""}
          alt="recover"
        />
      </div>
    </div>
  );
}

function NotesList({ section, notes, setNotes }) {
  return (
    <div className="saved-notes">
      {notes.length === 0 ? (
        <div className="no-saved-notes hidden">
          <p>Notes you add appear here</p>
        </div>
      ) : (
        notes
          .filter((note) => typeof note.deleted_at === typeof section)
          .map((item) => <Note item={item} setNotes={setNotes} notes={notes}/>)
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



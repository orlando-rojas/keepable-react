import React, {useState} from "react";
import "./App.css";
import logo from "./images/logo.png";
import trashIcon from "./images/icons/trash.svg";
import bracesIcon from "./images/icons/code.svg";
import paleteIcon from "./images/icons/color-picker.svg";
import { getNotes, createNote, updateNote, deleteNote } from "../src/api"

function Header() {
  return (
    <header>
      <img src={logo} height="138px" className="keepable-logo" alt="logo" />
      <p className="welcome-msg">Welcome to keepable.</p>
    </header>
  );
}

function Navbar({handleChangeSection}) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item active" onClick={handleChangeSection}>
          <img src={bracesIcon} alt="curly braces" />
          <span>Notes</span>
        </li>
        <li className="nav-item" onClick={handleChangeSection}>
          <img src={trashIcon} alt="trash icon" />
          <span>Trash</span>
        </li>
      </ul>
    </nav>
  );
}

function NewNoteForm() {
  return (
    <form id="new-note" className="new-note-form">
      <input type="text" placeholder="Title" className="new-note-input" />
      <input type="text" placeholder="Take a note" className="new-note-input" />
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
        <img src={paleteIcon} alt="color picker" className="icon-paleta" />
        <input type="submit" value="Keep it!" className="btn-keep-it" />
      </div>
    </form>
  );
}

function Note({note}) {
  return (
    <div className="card">
      <div>
        <h3 className="card-title">learn react</h3>
        <p className="card-text">This is the body for the note.</p>
      </div>
      <div className="card-bottom">
        <img src={paleteIcon} alt="#" className="icon-paleta" />
        <img src={trashIcon} alt="#" />
        <img src="images/icon-recover.svg" className="hidden" alt="#" />
      </div>
    </div>
  );
}

function NotesList({section, notes}) {
  return (
    <div className="saved-notes">
      { notes.length === 0 ? (
        <div className="no-saved-notes hidden">
          <p>Notes you add appear here</p>
        </div>
        ) :
        notes.filter((note) => typeof(note.deleted_at) === typeof(section) ? <Note note={note}/> : null)  
      }
    </div>
  );
}

function SavedNotes({section, notes}) {
  return (
    <div className="notes">
      {section ? <NewNoteForm /> : null}
      <NotesList section={section} notes={notes}/>
    </div>
  );
}
function App() {
  const [section, setSection] = useState(null);
  const [notes, setNotes] = useState([{"id": 10,
    "title": "Sugar",
    "body": "Alias nisi quod.\nId quam odio.\nEt enim quam.",
    "color": "green",
    "pinned": false,
    "deleted_at": null,
    "created_at": "2020-07-09T21:41:50.066Z",
    "updated_at": "2020-07-09T21:41:50.066Z"}, {"id": 10,
    "title": "Sugar",
    "body": "Alias nisi quod.\nId quam odio.\nEt enim quam.",
    "color": "green",
    "pinned": false,
    "deleted_at": null,
    "created_at": "2020-07-09T21:41:50.066Z",
    "updated_at": "2020-07-09T21:41:50.066Z"}]);

  function handleChangeSection() {
    setSection(section === null ? "true" : null);
  }



  return (
    <div>
      <Header />
      <main>
        <Navbar  handleChangeSection={handleChangeSection}/>
        <SavedNotes setNotes={setNotes} section={section} notes={notes}/>
      </main>
    </div>
  );
}

export default App;


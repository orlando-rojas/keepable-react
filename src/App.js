/** @jsx jsx */
import { useState, useEffect } from "react";
import "./App.css";
import { css, jsx } from "@emotion/core";
import logo from "./images/logo.png";
import trashIcon from "./images/icons/trash.svg";
import bracesIcon from "./images/icons/code.svg";
import paletteIcon from "./images/icons/color-picker.svg";
import { getNotes, createNote} from "./api";
import {
  CreateNoteForm,
  FormInput,
  FormBottom,
  ColorsWrapper,
  BtnKeepIt,
} from "./components/form";
import {
  WelcomeMsg,
  Head,
  Nav,
  NavItem,
  NavItemText,
  Circle,
} from "./components/styles";

import { Notes } from "./components/notes";
import NotesList from "./components/notes"; 

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
    <Head>
      <img src={logo} height="24px" alt="logo" />
      <WelcomeMsg>Welcome to keepable.</WelcomeMsg>
    </Head>
  );
}

function Navbar({ setSection, section }) {
  return (
    <Nav>
      <ul>
        <NavItem
          className={section === null ? "active" : null}
          onClick={() => setSection(null)}
        >
          <img src={bracesIcon} alt="curly braces" />
          <NavItemText>Notes</NavItemText>
        </NavItem>
        <NavItem
          className={section === "trash" ? "active" : null}
          onClick={() => setSection("trash")}
        >
          <img src={trashIcon} alt="trash icon" />
          <NavItemText>Trash</NavItemText>
        </NavItem>
      </ul>
    </Nav>
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
    <Circle
      onClick={handleColorChange}
      css={css`
        background-color: ${COLORES[color]};
      `}
    />
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

  const [showPalete, setShowPalete] = useState(false);

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

function SavedNotes({ section, notes, setNotes }) {
  return (
    <Notes>
      {section === null ? (
        <NewNoteForm setNotes={setNotes} notes={notes} />
      ) : null}
      <NotesList section={section} notes={notes} setNotes={setNotes} />
    </Notes>
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
        <Navbar setSection={setSection} section={section} />
        <SavedNotes section={section} notes={notes} setNotes={setNotes} />
      </main>
    </div>
  );
}

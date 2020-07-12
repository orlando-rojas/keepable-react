/** @jsx jsx */
import { useState, useEffect } from "react";
import "./App.css";
import { css, jsx } from "@emotion/core";
import logo from "./images/logo.png";
import trashIcon from "./images/icons/trash.svg";
import bracesIcon from "./images/icons/code.svg";
import { getNotes } from "./api";
import NewNoteForm from "./components/form";
import {
  WelcomeMsg,
  Head,
  Nav,
  NavItem,
  NavItemText,
} from "./components/styles";

import { Notes } from "./components/notes";
import NotesList from "./components/notes";

export const COLORES = {
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

export const COLORES_KEYS = Object.keys(COLORES);

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

  useEffect(() => {
    getNotes().then((notes) => setNotes(notes));
  }, []);

  return (
    <div>
      <Header />
      <main
        css={css`
          display: flex;
        `}
      >
        <Navbar setSection={setSection} section={section} />
        <SavedNotes section={section} notes={notes} setNotes={setNotes} />
      </main>
    </div>
  );
}

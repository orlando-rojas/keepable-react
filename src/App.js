import React from "react";
import "./App.css";
import logo from "./images/logo.png";
import trashIcon from "./images/icons/trash.svg";
import bracesIcon from "./images/icons/code.svg";
import paleteIcon from "./images/icons/color-picker.svg";

function App() {
  return (
    <div>
      <header>
        <img src={logo} height="138px" className="keepable-logo" alt="logo" />
        <p className="welcome-msg">Welcome to keepable.</p>
      </header>
      <main>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item active">
              <img src={bracesIcon} alt="curly braces" />
              <span>Notes</span>
            </li>
            <li className="nav-item">
              <img src={trashIcon} alt="trash icon" />
              <span>Trash</span>
            </li>
          </ul>
        </nav>
        <div className="notes">
          <form id="new-note" className="new-note-form">
            <input type="text" placeholder="Title" className="new-note-input" />
            <input
              type="text"
              placeholder="Take a note"
              className="new-note-input"
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
              <img
                src={paleteIcon}
                alt="color picker"
                className="icon-paleta"
              />
              <input type="submit" value="Keep it!" className="btn-keep-it" />
            </div>
          </form>
          <div id="saved-notes" className="saved-notes">
            <div className="no-saved-notes hidden">
              <p>Notes you add appear here</p>
            </div>
            <div id="model-card" className="card">
              <div>
                <h3 className="card-title">learn react</h3>
                <p className="card-text">This is the body for the note.</p>
              </div>
              <div className="card-bottom">
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
                <div className="icon-wrapper">
                  <img src={paleteIcon} alt="#" className="icon-paleta" />
                </div>
                <img src={trashIcon} alt="#" />
                <img src="images/icon-recover.svg" className="hidden" alt="#" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

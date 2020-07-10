const formNewNote = document.getElementById("new-note");
const noteModel = document.getElementById("model-card");
const savedNotes = document.getElementById("saved-notes");
const trash = document.getElementById("trash-notes");
var allNotes;
//var paletteColors = document.queryCommandValue(".colors-wrapper");

formNewNote.addEventListener("submit", createNote);

function setColors() {
  const allColors = document.querySelectorAll(".color");
  allColors.forEach((div) => {
    div.style.background = div.dataset.color;
    div.addEventListener("click", changeColor);
  });
}

setColors();

function openPalette() {
  paleta = document.querySelectorAll(".icon-paleta");
  paleta.forEach((paleta) => {
    paleta.addEventListener("click", showPalette);
  });
}

function showPalette() {
  colorsWrapper = this.parentElement.firstElementChild;
  console.log(colorsWrapper);
  colorsWrapper.classList.contains("hidden")
    ? colorsWrapper.classList.remove("hidden")
    : colorsWrapper.classList.add("hidden");
}

openPalette();

function changeColor() {
  console.log("llego");
  note = this.parentElement.parentElement.parentElement;
  console.log(note);
  newColor = this.style.background;
  note.style.background = newColor
  note.children[0].style.background = newColor;
}

function createNote() {
  //colorsWrapper = document.getElementById("new-note");
  newNoteContent = document.getElementById("note-content").value;
  newNote = noteModel.cloneNode(true);
  //colorWrp = newNote.children[1].children[];
  //console.log(colorWrp);
  newNote.classList.remove("hidden");
  newNote.firstElementChild.textContent = newNoteContent;
  newNote.style.background = formNewNote.style.background;
  paletaIcon = newNote.children[1].children[1];
  paletaIcon.addEventListener("click", showPalette);
  trashIcon = newNote.children[1].children[2];
  trashIcon.addEventListener("click", moveToTrash);
  savedNotes.prepend(newNote);
  checkIfSavedElements();
  formNewNote.reset();
  setColors();
}

function moveToTrash() {
  const currentNote = this.parentElement.parentElement;
  console.log(currentNote);
  const note = currentNote.cloneNode(true);
  console.log(note);
  const paletteIcon = note.children[1].children[1];
  console.log(paletteIcon);
  const deleteIcon = note.children[1].children[2];
  const recoverIcon = note.children[1].children[3];
  paletteIcon.classList.add("hidden");
  note.children[1].children[0].classList.add("hidden");
  recoverIcon.classList.remove("hidden");
  deleteIcon.addEventListener("click", deleteNote);
  recoverIcon.addEventListener("click", recoverNote);
  trash.prepend(note);
  currentNote.remove();
  checkIfSavedElements();
}

function recoverNote() {
  const currentNote = this.parentElement.parentElement;
  const recoveredNote = currentNote.cloneNode(true);
  const paletteIcon = recoveredNote.children[1].children[1];
  const trashIcon = recoveredNote.children[1].children[2];
  const recoverIcon = recoveredNote.children[1].children[3];
  paletteIcon.classList.remove("hidden");
  paletteIcon.addEventListener("click", showPalette)
  recoverIcon.classList.add("hidden");
  trashIcon.addEventListener("click", moveToTrash);
  savedNotes.prepend(recoveredNote);
  currentNote.remove();
  checkIfSavedElements();
  setColors();
}

function deleteNote() {
  const currentNote = this.parentElement.parentElement;
  currentNote.remove();
}

const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((x) => {
      x.classList.remove("active");
    });
    this.classList.add("active");
    let divClass = this.textContent.trim().toLowerCase();
    if (divClass == "trash") {
      document.querySelector(".notes").style.display = "none";
      document.querySelector(".trash").style.display = "flex";
    } else {
      document.querySelector(".trash").style.display = "none";
      document.querySelector(".notes").style.display = "flex";
    }
  });
});

const checkIfSavedElements = () => {
  const savedNotes = document.querySelector(".saved-notes");
  if (savedNotes.childElementCount <= 2)
    document.querySelector(".no-saved-notes").style.display = "flex";
  else document.querySelector(".no-saved-notes").style.display = "none";
};

checkIfSavedElements();

const apiKey = "fe8b6b3e90864740ab311327201906";

function processCoords(position) {
  let weather = document.querySelector(".weather");
  let location = {};
  let currentLocation = {};
  currentLocation["latitude"] = position.coords.latitude;
  currentLocation["longitude"] = position.coords.longitude;
  getData(currentLocation).then((data) => {
    location["city"] = data.location.name;
    location["region"] = data.location.region;
    location["country"] = data.location.country;
    location["temperature"] = data.current.temp_c;
    location["condition"] = data.current.condition.text;
    weather.textContent = `Today's Forecast for ${location["city"]}, ${location["region"]} Province, ${location["country"]}: ${location["temperature"]}°, ${location["condition"]}`;
  });
}

navigator.geolocation.getCurrentPosition(processCoords);

function getData(location) {
  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=fe8b6b3e90864740ab311327201906&q=${location.latitude},${location.longitude}`
  ).then((response) => {
    return response.json();
  });
}

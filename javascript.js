const container = document.querySelector(".container");
const gridSelect = document.querySelector("#grid");

const dimensiuneBord = 480;
let nrPixeli = gridSelect.value;
let dimensiunePixel = dimensiuneBord / nrPixeli;
let currentColor = "#ffb2ce";


//Grid size
function changeResolution() {
    nrPixeli = gridSelect.value;
    dimensiunePixel = dimensiuneBord / nrPixeli;
    makeGrid();
}

function makeGrid() {
    container.innerHTML = ""; // Șterge grila anterioară

    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.width = `${dimensiuneBord}px`;
    container.style.height = `${dimensiuneBord}px`;

    for (let i = 0; i < nrPixeli * nrPixeli; i++) {
        const cell = document.createElement("div");
        cell.style.width = `${dimensiunePixel}px`;
        cell.style.height = `${dimensiunePixel}px`;
        cell.classList.add("cell");
        container.appendChild(cell);
    }
}


//Drawing
let isDrawing = false;
let isPicking = false;
let isRainbow = false;


container.addEventListener("mousedown", (event) => {
    if (isPicking && event.target && event.target.classList.contains("cell")) {
        currentColor = window.getComputedStyle(event.target).backgroundColor;
        isDrawing = true;
        isPicking = false;
        return;
    }
    if (event.target && event.target.classList.contains("cell")) {
        isDrawing = true;
        changeCellColor(event.target);
    }
});

container.addEventListener("mouseover", (event) => {
    if (isDrawing && event.target && event.target.classList.contains("cell")) {
        changeCellColor(event.target);
    }
});

document.addEventListener("mouseup", () => {
    isDrawing = false;
});

function changeCellColor(cell) {
    if (isErasing) {
        cell.style.backgroundColor = "white"; // Culoarea "ștearsă"
    }
    if (isDrawing) {
        cell.style.backgroundColor = currentColor;
    }
    if (isRainbow) {
        cell.style.backgroundColor = randomColors();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomColors() {
    const value1 = getRandomInt(255);
    const value2 = getRandomInt(255);
    const value3 = getRandomInt(255);

    return `rgb(${value1}, ${value2}, ${value3}, 0.6)`;
}

document.addEventListener("DOMContentLoaded", function () {
    makeGrid();
});


//Color select
const colorPalette = document.querySelector(".color-palette");

colorPalette.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains("color")) {
        const bgColor = window.getComputedStyle(event.target).backgroundColor;
        currentColor = bgColor;
    }
});

document.querySelector(".color-input").addEventListener("input", function () {
    this.parentElement.style.backgroundColor = this.value;
    currentColor = this.value;
});


//Tools
let isErasing = false;

function eraser() {
    isErasing = true;
    isPicking = false;
}

function pencil() {
    isErasing = false;
    isPicking = false;
}


function picker() {
    isPicking = true;
}


function rainbow() {
    isRainbow = true;
}













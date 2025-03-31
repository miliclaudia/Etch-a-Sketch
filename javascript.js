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
let isErasing = false;


container.addEventListener("mousedown", (event) => {
    if (isPicking && event.target && event.target.classList.contains("cell")) {
        currentColor = window.getComputedStyle(event.target).backgroundColor;
        isDrawing = true;
        isPicking = false;

        const picker = document.querySelector("#picker");
        const pencil = document.querySelector("#pencil");

        picker.classList.remove('active');
        pencil.classList.add('active');
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
        return;
    }
    if (isDrawing && !isRainbow) {
        cell.style.backgroundColor = currentColor;
        return;
    }
    if (isRainbow) {
        cell.style.backgroundColor = randomColors();
        return;
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


function eraser() {
    isErasing = true;
    isPicking = false;
    isRainbow = false;
}

function pencil() {
    isErasing = false;
    isPicking = false;
    isRainbow = false;
}


function picker() {
    isPicking = true;
    isErasing = false;
    isRainbow = false;
}


function rainbow() {
    isRainbow = true;
    isErasing = false;
    isPicking = false;
}

function setActive(clickedButton) {
    // Elimină clasa "active" de la toate butoanele
    const buttons = document.querySelectorAll('.tools button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Adaugă clasa "active" butonului apăsat
    clickedButton.classList.add('active');
}

function refresh(){
    makeGrid()
}











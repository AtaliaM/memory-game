let cardsFllipd = 0;
let firstFlippedCard;
let secondFlippedCard;
let correctGuesses = 0;
let numCards;
const wrongGuesses = document.querySelector(".counter");
const cardsContainer = document.querySelector(".cards-container");
const screenContainer = document.querySelector(".screen-container");
const winPopUp = document.querySelector(".pop-up");

document.querySelectorAll('.new-game-btn').forEach(item => { 
        {
            item.addEventListener('click', startGame);
        }
    });

function startGame(event) {
    console.log("yay");
    if (event.currentTarget.parentElement === winPopUp) { //if the start button we clicked on was the one on the popup
        winPopUp.style.display = "none";
    }
    cardsContainer.innerHTML = "";
    clockContainer.innerHTML = "";
    wrongGuesses.textContent = 0;
    correctGuesses = 0;
    const gameBoard = creatingBoard(3, 4);
    creatingCards(gameBoard, pics);
}

//creating the timer//
const timerContainer = document.querySelector(".timer");
const clockContainer = document.createElement("div");
clockContainer.classList.add("clock-container");
const clock = document.createElement("div");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;

startBtn.addEventListener("click", myInterval);
stopBtn.addEventListener("click", stopTimer);

function startTimer() {

    milliseconds += 10;

    if (milliseconds === 1000) {
        seconds++;
        milliseconds = 0;
    }
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes === 60) {
        clearInterval(timer);
    }

    if (milliseconds < 10) {
        if (seconds < 10) {
            clock.textContent = `0${minutes}:0${seconds}:00${milliseconds}`;
        }
        else {
            clock.textContent = `0${minutes}:${seconds}:00${milliseconds}`;
        }
    }
    else if (milliseconds < 100) {
        if (seconds < 10) {
            clock.textContent = `0${minutes}:0${seconds}:0${milliseconds}`;
        }
        else {
            clock.textContent = `0${minutes}:${seconds}:0${milliseconds}`;
        }
    }
    else {
        if (seconds < 10) {
            clock.textContent = `0${minutes}:0${seconds}:${milliseconds}`;
        }
        else {
            clock.textContent = `0${minutes}:${seconds}:${milliseconds}`;
        }
    }
}

function myInterval() {
    timer = setInterval(startTimer, 10);
}

function stopTimer() {
    clearInterval(timer);
}

clockContainer.appendChild(clock);
timerContainer.appendChild(clockContainer);

//////////////////////////////////////////////////////////////////////////
//creating the cards&game board//

const pics = [{ src: "./photos/black-widow.jpg", display: 0 }, { src: "./photos/cap.jpg", display: 0 },
{ src: "./photos/hulk.jpg", display: 0 }, { src: "./photos/iron-man.jpg", display: 0 },
{ src: "./photos/scarlet.jpg", display: 0 },
{ src: "./photos/thor.png", display: 0 }];

//creating 3X4 board//
function creatingBoard(cols, rows) {
    numCards = cols*rows;
    let gameBoard = [];

    for (let i = 0; i < cols; i++) {
        gameBoard.push([]);
        for (let j = 0; j < rows; j++) {
            gameBoard[i].push(i);
        }
    }

    return gameBoard;
}

const gameBoard = creatingBoard(3, 4);

function creatingCards(gameBoard, picArray) {

    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card-container");
            const cardFront = document.createElement("div");
            cardFront.classList.add("flip-card-front");
            const cardImg = document.createElement("img");
            const cardBack = document.createElement("div");
            cardBack.classList.add("flip-card-back");

            cardFront.appendChild(cardImg);
            cardContainer.appendChild(cardBack);
            cardContainer.appendChild(cardFront);
            cardsContainer.appendChild(cardContainer);
        }
    }

    //entering the pictures in random to the cards
    let domImgIndex = 0;
    const allImgs = document.querySelectorAll("img");
    for (let k = 0; k < 2; k++) {

        for (let i = picArray.length - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = picArray[i];
            picArray[i] = picArray[j];
            picArray[j] = temp;

            allImgs[domImgIndex].src = picArray[i].src;
            allImgs[domImgIndex].parentElement.previousElementSibling.addEventListener("click", flipCard);
            picArray[i].display++;
            domImgIndex++;
        }
    }
    console.log(pics);

}

creatingCards(gameBoard, pics);

function flipCard(event, checkingCardsfunc = checkIfCardsEqual) { //default paraneter of the checkingifCardEqual
    console.log("in func");
    if (cardsFllipd < 2) { //if there are less than 2 cards currently flipped
        cardsFllipd++;
        if (firstFlippedCard) { //if the current card is the second one to be flipped
            secondFlippedCard = event.currentTarget; //the current card is the second
            secondFlippedCard.style.display = "none";
            // console.log("before settimeout");
            setTimeout(() => checkingCardsfunc(firstFlippedCard, secondFlippedCard), 1000);
            // console.log("after settimeout");

        }
        else {
            firstFlippedCard = event.currentTarget;
            firstFlippedCard.style.display = "none";
            // console.log(firstFlippedCard);
        }
    }
}

function checkIfCardsEqual(firstCard, secondCard) {
    // console.log(firstCard.nextElementSibling.firstElementChild.src);
    if (firstCard.nextElementSibling.firstElementChild.src !== secondCard.nextElementSibling.firstElementChild.src) {
        firstCard.style.display = "block"; //if guess is wrong
        secondCard.style.display = "block";
        wrongGuesses.textContent++;
    }
    else {
        correctGuesses++;
        if (correctGuesses === numCards/2) { //if all pairs found
            winPopUp.style.display = "block";
        }
    }

    cardsFllipd = 0;
    firstFlippedCard = 0;
    secondFlippedCard = 0;
}

// Iteration 2: Generating two random numbers (0 to 100) and displaying the same in the game.html

// Iteration 3: Creating variables required to make the game functional
const firstNumberElement = document.getElementById("number1");
const secondNumberElement = document.getElementById("number2");
const resultElement = document.getElementById("number3");
const addButton = document.getElementById("plus");
const subtractButton = document.getElementById("minus");
const multiplyButton = document.getElementById("mul");
const divideButton = document.getElementById("divide");
const modulusButton = document.getElementById("modulus");
const countdownElement = document.getElementById("timer");

let score = 0;
let questionCount = 0;
const maxRounds = 10;
let countdownInterval;


// Iteration 4: Creating a variable for number 3 and a variable for storing the html element with the Id "number3"
const result = document.getElementById("number3");
let expectedAnswer;

// Iteration 5: Creating a randomise function to make the game functional
function generateQuestion() {
    if (questionCount >= maxRounds) {
        // alert(`Game over! Your score is ${score}/${maxRounds}`);
        window.location.href = "gameover.html";
        clearInterval(countdownInterval);
        return;
    }

    questionCount++;
    const num1 = Math.floor(Math.random() * 101);
    const num2 = Math.floor(Math.random() * 101);
    const operations = ['+', '-', '*', '/'];
    const selectedOperation = operations[Math.floor(Math.random() * operations.length)];

    switch (selectedOperation) {
        case '+':
            expectedAnswer = num1 + num2;
            break;
        case '-':
            expectedAnswer = num1 - num2;
            break;
        case '*':
            expectedAnswer = num1 * num2;
            break;
        case '/':
            if (num2 === 0) num2 = 1; // Avoid division by zero
            expectedAnswer = Math.floor(num1 / num2); // Integer division
            break;
        default:
            break;
    }

    firstNumberElement.innerHTML = num1;
    secondNumberElement.innerHTML = num2;
    resultElement.innerHTML = expectedAnswer;

    initiateCountdown();
}

// Iteration 6: Making the Operators (button) functional
function evaluateAnswer(operation) {
    const num1 = parseInt(firstNumberElement.innerHTML);
    const num2 = parseInt(secondNumberElement.innerHTML);
    const actualAnswer = parseInt(resultElement.innerHTML);
    let correct = false;

    switch (operation) {
        case 'add':
            correct = (num1 + num2 === actualAnswer);
            break;
        case 'subtract':
            correct = (num1 - num2 === actualAnswer);
            break;
        case 'multiply':
            correct = (num1 * num2 === actualAnswer);
            break;
        case 'divide':
            correct = (Math.floor(num1 / num2) === actualAnswer);
            break;
        case 'modulus':
            correct = (num1 % num2 === actualAnswer);
            break;
    }

    if (correct) {
        score++;
        localStorage.setItem('score', score);
    }

    generateQuestion(); // Generate new numbers and expression
}

addButton.onclick = function() { evaluateAnswer('add'); };
subtractButton.onclick = function() { evaluateAnswer('subtract'); };
multiplyButton.onclick = function() { evaluateAnswer('multiply'); };
divideButton.onclick = function() { evaluateAnswer('divide'); };
modulusButton.onclick = function() { evaluateAnswer('modulus'); };

generateQuestion(); // Initial call to set up the first question

// Iteration 7: Making Timer functional
function initiateCountdown() {
    let timeRemaining = 10;
    countdownElement.innerHTML = timeRemaining;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        timeRemaining--;
        countdownElement.innerHTML = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            generateQuestion();
        }
    }, 1000);
}

generateQuestion(); // Initial call to set up the first question

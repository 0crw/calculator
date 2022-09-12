let firstOp = ''
let secondOp = ''

let currentOperation = null;
let resetDisplay = false;

//get operator & numbers
const numBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');

//get display
const prevDisplay = document.getElementById('prevOp');
const currDisplay = document.getElementById('currOp');

//get buttons
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const dotBtn = document.getElementById('dotBtn');
const equalBtn = document.getElementById('equalBtn');

//addEventListener buttons
deleteBtn.addEventListener('click', deleteNumber); //delete single number
clearBtn.addEventListener('click', clear); // delete number & operator || set value to default value 
equalBtn.addEventListener('click', calculate); //start calculate on click

numBtns.forEach((button) =>
    button.addEventListener('click', () => displayNumber(button.textContent)) //display number on click
);

operatorBtns.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent)) //display operato on click
);

//function take operator , 2operand
function operate(operator, a, b) {

    a = Number(a);
    b = Number(b);
    
    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return sub(a,b);
        case 'x':
            return multiply(a,b);
        case '÷':
            return divide(a,b);
        default:
            return null
    };
};

function add(a, b) {
    return a + b;
};

function sub(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function clear() {
    firstOp = '';
    secondOp = '';
    currentOperation = null;
    currDisplay.textContent = '';
    prevDisplay.textContent = '';
};

function resetScreen() {
    currDisplay.textContent = '';
    resetDisplay = false;
};

function deleteNumber() {
    currDisplay.textContent = currDisplay.textContent.toString().slice(0, -1);
};

function displayNumber(number) {
    if (currDisplay.textContent === '0' || resetDisplay)
        resetScreen();
    currDisplay.textContent += number;
};

function setOperation(operator) {
    if (currentOperation !== null)
    calculate();
    firstOp = currDisplay.textContent;
    currentOperation = operator;
    prevDisplay.textContent = `${firstOp} ${currentOperation}`;
    resetDisplay = true;
};

function calculate() {
    if (currentOperation === null || resetDisplay){
        return;
    } else if (currentOperation === '÷' && currDisplay.textContent === '0') {  //u can't divide number by 0, return function
        return; 
    };

    secondOp = currDisplay.textContent;
    currDisplay.textContent = operate(currentOperation, firstOp, secondOp);
    prevDisplay.textContent = `${firstOp} ${currentOperation} ${secondOp}`;
    currentOperation = null;
};
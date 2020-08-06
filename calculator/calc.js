const numericKeys = Array.from(document.querySelectorAll(".numeric"));
const operatorKeys = Array.from(document.querySelectorAll(".operator"));
const numericDisplay = document.querySelector(".calc-readout");
const clearButton = document.querySelector(".clear");
const plusMinButton = document.querySelector(".plusmin");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal");

let currentOperand = 0;
let inputStack = [];
let operandStack = [];
let operatorStack = [];

function inputValue(e) {
  inputStack.push(e.target.textContent);
  let numericValue = inputStack.join("");
  currentOperand = parseFloat(numericValue);
  updateDisplay(numericValue);
}

function storeOperations(e) {
  operatorStack.push(e.target.textContent);
  operandStack.push(currentOperand);
  inputStack.length = 0;
}

function executeOperation() {
  if (operatorStack.length > 0) {
    operandStack.push(currentOperand);
    updateDisplay(currentOperand);
    inputStack.length = 0;

    if (operandStack.length >= 2) {
      let currentOperator = operatorStack.pop();
      let operandTwo = operandStack.pop();
      let operandOne = operandStack.pop();

      switch (currentOperator) {
        case "+":
          currentOperand = operandOne + operandTwo;
          updateDisplay(currentOperand);
          break;
        case "-":
          currentOperand = operandOne - operandTwo;
          updateDisplay(currentOperand);
          break;
        case "x":
          currentOperand = operandOne * operandTwo;
          updateDisplay(currentOperand);
          break;
        case "÷":
          currentOperand = operandOne / operandTwo;
          updateDisplay(currentOperand);
          break;

        default:
          console.log("not implemented");
      }
    }
  }
}

function updateDisplay(numericValue) {
  let stringValue = numericValue.toString();
  if (stringValue.indexOf(".") > 0) {
    stringValue = parseFloat(numericValue).toFixed(4);
  }
  numericDisplay.value = stringValue;
  //console.log(operatorStack);
  //console.log(operandStack);
}

function clearAll() {
  currentOperand = 0;
  inputStack.length = 0;
  updateDisplay(currentOperand);
}

function changeSign() {
  currentOperand = currentOperand * -1;
  updateDisplay(currentOperand);
}

function addDecimal() {
  if (numericDisplay.value.indexOf(".") < 0) {
    inputStack.push(".");
  }
}

updateDisplay(currentOperand);

clearButton.addEventListener("click", clearAll);
plusMinButton.addEventListener("click", changeSign);
decimalButton.addEventListener("click", addDecimal);
equalButton.addEventListener("click", executeOperation);

numericKeys.forEach((key) => {
  key.addEventListener("click", inputValue);
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", storeOperations);
});

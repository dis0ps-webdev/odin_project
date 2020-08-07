const allKeys = Array.from(document.querySelectorAll(".calc-button"));
const numericKeys = Array.from(document.querySelectorAll(".numeric"));
const operatorKeys = Array.from(document.querySelectorAll(".operator"));
const numericDisplay = document.querySelector(".calc-readout");
const clearButton = document.querySelector(".clear");
const plusMinButton = document.querySelector(".plusmin");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal");
const backspaceButton = document.querySelector(".backspace");

let currentOperand = 0;
let isErrorState = false;
let inputStack = [];
let operandStack = [];
let operatorStack = [];

function inputValue(e) {
  if (inputStack.length < 14) {
    inputStack.push(e.target.textContent);
    let numericValue = inputStack.join("");
    currentOperand = parseFloat(numericValue);
    updateDisplay(numericValue);
  }
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
        case "*":
          currentOperand = operandOne * operandTwo;
          updateDisplay(currentOperand);
          break;
        case "÷":
          if (operandTwo == 0) {
            isErrorState = true;
          } else {
            currentOperand = operandOne / operandTwo;
          }
          updateDisplay(currentOperand);
          break;

        default:
          console.error("Operator Not Implemented");
      }
    }
  }
}

function updateDisplay(numericValue) {
  if (isErrorState) {
    numericDisplay.value = "Great Odin's Raven!";
    setTimeout(() => {
      numericDisplay.value = "Error";
    }, 1000);
  } else {
    let stringValue = numericValue.toString();
    if (stringValue.indexOf(".") > 0) {
      if (stringValue.split(".")[1].length > 4) {
        stringValue = parseFloat(numericValue).toFixed(4);
      }
    }
    numericDisplay.value = stringValue;
  }
}

function clearAll() {
  isErrorState = false;
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
    updateDisplay(inputStack.join(""));
  }
}

function deleteDigit() {
  if (numericDisplay.value.length == 1) {
    updateDisplay(0);
  } else {
    inputStack.pop();
    let numericValue = inputStack.join("");
    currentOperand = parseFloat(numericValue);
    updateDisplay(numericValue);
  }
}

function highlightClick(e) {
  let targetKey = e.target;
  targetKey.classList.add("clicked");
  setTimeout(() => {
    targetKey.classList.remove("clicked");
  }, 200);
}

function initializeKeyHandlers() {
  allKeys.forEach((key) => {
    key.addEventListener("click", highlightClick);
  });

  clearButton.addEventListener("click", clearAll);
  plusMinButton.addEventListener("click", changeSign);
  decimalButton.addEventListener("click", addDecimal);
  equalButton.addEventListener("click", executeOperation);
  backspaceButton.addEventListener("click", deleteDigit);

  numericKeys.forEach((key) => {
    key.addEventListener("click", inputValue);
  });

  operatorKeys.forEach((key) => {
    key.addEventListener("click", storeOperations);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      equalButton.click();
    }
    if (e.key == "Backspace") {
      backspaceButton.click();
    }
    allKeys.forEach((keyElement) => {
      if (e.key == keyElement.textContent) {
        keyElement.click();
      }
    });
  });
}

initializeKeyHandlers();
updateDisplay(currentOperand);

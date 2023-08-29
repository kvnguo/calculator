const display = document.getElementById("display");
const num = document.querySelectorAll(".num");
const negateBtn = document.getElementById("negate");
const decimalBtn = document.getElementById("decimal");
const clearBtn = document.getElementById("clear");
const percentBtn = document.getElementById("percent");
const inputsDisplay = document.getElementById("inputs");
const operators = document.querySelectorAll(".op");
const equalsBtn = document.getElementById("equals");

let inputs = "";

function displayInputs() {
    num.forEach(button => {
        button.addEventListener("click", () => {
           if(display.textContent.length < 12) {
                let currentInput = display.textContent;
                let newInput = currentInput + button.textContent;
                display.textContent = newInput;
    
           }
        });
    });
}

function negateInput() {
    negateBtn.addEventListener("click", () => {
        if(display.textContent.length > 0) {
            let currentInput = parseFloat(display.textContent);
            display.textContent = -1 * currentInput;
        }
    });
}

function addDecimal() {
    decimalBtn.addEventListener("click", () => {
        let currentInput = display.textContent;
        if (!currentInput.includes(".")) {
            let newInput = currentInput + ".";
            display.textContent = newInput;
        }
    });
}

function clearDisplay() {
    clearBtn.addEventListener("click", () => {
        display.textContent = "";
        inputs = ""; 
        inputsDisplay.textContent = inputs;
    });
}

function toPercent() {
    percentBtn.addEventListener("click", ()=> {
        let currentInput = parseFloat(display.textContent);
        display.textContent = .01 * currentInput;
    });
}

function pushOperation() {
    operators.forEach(operator => {
        operator.addEventListener("click", ()=> {
            inputs += display.textContent + operator.textContent;
            const overflow = overflowDisplay(inputs, true); 
            inputsDisplay.textContent = overflow; 
            display.textContent = ""; 
        });
    });
}

function calculate(left, op, right) {
    left = parseFloat(left);
    right = parseFloat(right); 

    switch (op) {
        case "+":
            return left + right; 
        case "-":
            return left - right;
        case "/":
            if(right != 0) {
                return left / right; 
            }
            return "Error";
        case "x":
            return left * right;
        default: 
            return "Error";
    }
}

function overflowDisplay(display, needEllip) {
    if(display.length > 22 && needEllip) {
        return display.substring(0, 22) + "..."; 
    }
    else if(display.length > 13 && !needEllip) {
        return display.substring(0, 13);
    }
    else {
        return display; 
    }
}

function findIndex(a, b, arr) {
    const first = arr.indexOf(a);
    const second = arr.indexOf(b); 
    if(first == -1 || second == -1) {
        return first > second ? first : second; 
    }
    return first < second ? first : second;
}

function reduceArr(signOne, signTwo, arr) {
    while(arr.includes(signOne) || arr.includes(signTwo)) {
        const index = findIndex(signOne, signTwo, arr);
        const solution = calculate(arr[index - 1], arr[index], arr[index + 1]);
        arr.splice(index - 1, 3, solution);
    }
    return arr;
}

function pemdas() {
    let inputsArr = inputs.split(" ");
    inputsArr.pop();
    inputsArr = reduceArr("x", "/", inputsArr); 
    inputsArr = reduceArr("+", "-", inputsArr); 
    
    if(isNaN(inputsArr)) {
        return "Error";
    }
    
    if(inputsArr[0] > 999999999999 || inputsArr[0] < 0.0000000001) {
        inputsArr[0] = inputsArr[0].toExponential(7); 
    }

    return overflowDisplay(inputsArr[0].toString(), false);
}

function equals() {
    equalsBtn.addEventListener("click", () => {
        inputs += display.textContent + " =";
        inputsDisplay.textContent = overflowDisplay(inputs);
        display.textContent = pemdas();
        inputs = "";
    }); 
}

displayInputs();
negateInput();
addDecimal();
clearDisplay();
toPercent();
pushOperation();
equals();


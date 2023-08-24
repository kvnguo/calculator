const display = document.getElementById("display");
const num = document.querySelectorAll(".num");
const negateBtn = document.getElementById("negate");
const decimalBtn = document.getElementById("decimal");
const clearBtn = document.getElementById("clear");

function displayInputs() {
    num.forEach(button => {
        button.addEventListener("click", () => {
            console.log("Number button clicked");
            let currentInput = display.textContent;
            let newInput = currentInput + button.textContent;
            display.textContent = newInput;
        });
    });
}

function negateInput() {
    negateBtn.addEventListener("click", () => {
        let currentInput = parseFloat(display.textContent);
        display.textContent = -1 * currentInput;
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
    });
}

displayInputs();
negateInput();
addDecimal();
clearDisplay();



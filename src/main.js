import Calculator from "./calculator/calculator.js";

const calculator = new Calculator();

// Event listener for angle mode toggle
const angleModeBtn = document.getElementById('angleMode');
angleModeBtn.addEventListener('click', () => {
    calculator.toggleAngleMode();
    angleModeBtn.innerHTML = "<span>" + calculator.angleMode + "</span><sub>" + (calculator.angleMode === "DEG" ? "/RAD" : "/DEG") + "</sub>";
    angleModeBtn.dataset.value = calculator.angleMode === "DEG" ? "deg" : "red";
})

// show the input and set into the calculator expression
const input = document.getElementById('displayArea-input');
const previousExpression = document.getElementById('previousExpression')
const btns = document.querySelectorAll('.btn');

btns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const value = e.target.dataset.value;
        if(value === 'CE'){
            calculator.setExpression('0');
        }
        else if(value === 'DEL'){
            if(calculator.expression.length <= 1)
                calculator.setExpression('0')
            else
                calculator.setExpression(calculator.expression.slice(0, -1));
        }
        else if(value === '='){
            previousExpression.textContent = calculator.expression
            calculator.calculate();
            input.value = calculator.result;
        }
        else {
            if(calculator.expression === '0')
                calculator.setExpression('')
            calculator.setExpression(calculator.expression + value);
            input.scrollLeft = input.scrollWidth;
        }
    })
})

calculator.calculate();
console.log(calculator.result);
import Calculator from "./calculator.js";

const calculator = new Calculator();

// Event listener for angle mode toggle
const angleModeBtn = document.getElementById('angleMode');
angleModeBtn.addEventListener('click', () => {
    calculator.toggleAngleMode();
    angleModeBtn.innerHTML = "<span>" + calculator.angleMode + "</span><sub>" + (calculator.angleMode === "DEG" ? "/RAD" : "/DEG") + "</sub>";
})

// show the input and set into the calculator expression
const input = document.getElementById('displayArea-input');
const btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const value = e.target.dataset.value;
        if(value === 'CE'){
            calculator.setExpression('0');
        }
        else if(value === 'DEL'){
            calculator.setExpression(calculator.expression.slice(0, -1));
        }
        else if(value === '='){
            calculator.calculate();
            input.value = calculator.result;
        }
        else {
            calculator.setExpression(calculator.expression + value);
        }
    })
})

calculator.calculate();
console.log(calculator.result);
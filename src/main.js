import Calculator from "./calculator/calculator.js";

const calculator = new Calculator();

// Event listener for angle mode toggle
const angleModeBtn = document.getElementById('angleMode');
angleModeBtn.addEventListener('click', () => {
    calculator.toggleAngleMode();
    angleModeBtn.innerHTML = calculator.angleMode + "<sub>" + (calculator.angleMode === "DEG" ? "/RAD" : "/DEG") + "</sub>";
    angleModeBtn.dataset.value = calculator.angleMode === "DEG" ? "deg" : "red";
})

// show the input and set into the calculator expression
const input = document.getElementById('displayArea-input');
const previousExpression = document.getElementById('previousExpression')
const btns = Array.from(document.getElementsByClassName('btn'));

btns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        console.log(e.currentTarget.dataset.value)
        const button = e.currentTarget
        if(!button) 
            return;

        const value = button.dataset.value;
        handleInput(value)
    })
})

function handleInput(value){
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
        calculator.setExpression(calculator.result);
    }
    else {
        if((calculator.expression === '0' && value !== '.') || calculator.expression === 'Error')
            calculator.setExpression('')
        calculator.setExpression(calculator.expression + value);
    }
    render();
}

function render(){
    input.value = calculator.expression;
    input.scrollLeft = input.scrollWidth;
}
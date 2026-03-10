import Calculator from "./calculator/calculator.js";

const calculator = new Calculator();

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
        updateExpression('0');
    }
    else if(value === 'DEL'){
        if(calculator.expression.length <= 1)
            updateExpression('0')
        else
            updateExpression(calculator.expression.slice(0, -1));
    }
    else if(value === '='){
        previousExpression.textContent = calculator.expression
        calculator.calculate();
        updateExpression(calculator.expression);
    }
    else if(value === 'deg' || value === 'rad'){
        const angleModeBtn = document.getElementById('angleMode');
        calculator.toggleAngleMode();
        angleModeBtn.innerHTML = calculator.angleMode + "<sub>" + (calculator.angleMode === "DEG" ? "/RAD" : "/DEG") + "</sub>";
        angleModeBtn.dataset.value = calculator.angleMode === "DEG" ? "deg" : "rad";
    }
    else if(value === 'Ans'){
        if(calculator.expression === '0' || calculator.hasError){
            updateExpression('')
            calculator.hasError=false;
        }
        updateExpression(calculator.expression + `${calculator.result}`)
    }
    else {
        if(calculator.expression === '0' && value==='00')
            return;
        if((calculator.expression === '0' && value !== '.') || calculator.hasError){
            updateExpression('')
            calculator.hasError=false;
        }
        updateExpression(calculator.expression + value);
    }
    render();
}

function render(){
    input.value = calculator.expression;
    input.scrollLeft = input.scrollWidth;
}

function updateExpression(exp) {
    calculator.expression = exp;
    document.getElementById('displayArea-input').value = exp;
}
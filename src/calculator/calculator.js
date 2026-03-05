import tokenizer from "./tokenizer.js";

export default class Calculator {
    constructor() {
        this.expression = '';
        this.result = 0;
        this.angleMode = "DEG";
    }

    toggleAngleMode() {
        this.angleMode = this.angleMode === "DEG" ? "RAD" : "DEG";
    }

    setExpression(expr) {
        this.expression = expr;
        document.getElementById('displayArea-input').value = expr;
    }

    calculate(){
        try {
            let tokens = tokenizer(this.expression);
            console.log(tokens)
            let postfixExp = postfix(tokens); 
            console.log(postfixExp)
            // this.result = evaluate(postfixExp);
            // this.expression = this.result;
        } catch (e) {
            this.result = 'Error';
        }
    }
}

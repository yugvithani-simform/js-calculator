import evaluatePostfix from "./evaluatePostfix.js";
import postfix from "./postfix.js";
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
            let tokens = tokenizer(this.expression); // return arr
            let postfixExp = postfix(tokens); // return stack
            this.result = evaluatePostfix(postfixExp)
            this.expression = this.result;
        } catch (e) {
            this.result = 'Error';
            this.expression = this.result
        }
    }
}

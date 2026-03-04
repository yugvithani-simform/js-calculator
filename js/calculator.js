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
            this.result = eval(this.expression);
        } catch (e) {
            this.result = 'Error';
        }
    }
}

import evaluatePostfix from "./evaluatePostfix.js";
import postfix from "./postfix.js";
import tokenizer from "./tokenizer.js";

export default class Calculator {
    #expression = '0';
    #result = '0';
    #angleMode = "DEG";
    #hasError = false;

    constructor() {}

    get expression(){
        return this.#expression;
    }

    set expression(exp){
        this.#expression = exp;
    }

    get result(){
        return this.#result;
    }

    set result(res){
        this.#result = res;
    }

    get angleMode(){
        return this.#angleMode;
    }

    set angleMode(mode){
        this.#angleMode = mode; 
    }

    get hasError(){
        return this.#hasError
    }

    set hasError(hasError){
        this.#hasError = hasError;
    }

    addInput(val){
        this.#expression += val;
    }

    toggleAngleMode() {
        this.#angleMode = this.#angleMode === "DEG" ? "RAD" : "DEG";
    }

    calculate(){
        try {
            let tokens = tokenizer(this.#expression); // return arr
            let postfixExp = postfix(tokens); // return stack
            this.#result = evaluatePostfix(postfixExp, this.#angleMode);
            this.#expression = `${this.#result}`;
            this.#hasError = false;
        } catch (e) {
            this.#expression = e.message ?? 'Error';
            this.#hasError = true;
        }
    }
}

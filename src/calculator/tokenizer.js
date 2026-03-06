import { constants, operators, functions } from "./operations.js";

export default function tokenizer(exp){
    const tokens = [];
    let i = 0, len = exp.length;
    while(i<len){
        let currentInput = '';
        if(isDigit(exp[i])){
            while(i<len && isDigit(exp[i])){
                currentInput += exp[i++];
            }
        } 
        // else if(isConstant(exp[i])){
        //     currentInput += constants[exp[i++]].value
        // }
        else if(isOperator(exp[i])){
            currentInput += operators[exp[i++]].tokenString
        }
        // else if(isLetter(exp[i])){
            
        // }
        tokens.push(currentInput);
    }
    return tokens;
}

function isDigit(x){
    return /[0-9.]/.test(x);
}

function isConstant(x){
    return /[πe]/.test(x);
}

function isOperator(x){
    return /[+\-*/%^()]/.test(x);
}

function isLetter(x){
    return /[a-zA-Z]/.test(x);
}

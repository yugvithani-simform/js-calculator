import { showError } from "../utils/showError.js";
import { constants, operators, functions } from "./operations.js";

export default function tokenizer(exp){
    const tokens = [];
    let i = 0, len = exp.length;
    let bracketCount = 0;
    let lastTokenIsConstant = false;
    while(i<len){
        let currentInput = '';
        let currIsConstant = false;
        if(isDigit(exp[i])){
            while(i<len && isDigit(exp[i])){
                currentInput += exp[i++];
            }
        }
        else if(isConstant(exp[i])){
            currIsConstant = true;
            currentInput += constants[exp[i++]].value
        }
        else if(isLetter(exp[i])){
            while(i<len && isLetter(exp[i])){
                currentInput += exp[i++];
            }
        }
        else if(isOperator(exp[i])){
            //update the No of bracket
            if(exp[i] === '('){
                bracketCount++;
            }
            else if(exp[i] === ')'){
                bracketCount--;
            }

            currentInput += operators[exp[i++]].tokenString
        }
        //handle implicit multiplication
        let lastToken = tokens.length > 0 ? tokens[tokens.length-1] : null;
        let implicitMultiplication = lastToken && (
            ([
                operators[')'].tokenString,
                functions['!'].tokenString,
            ].includes(lastToken)) ||
            !(isNaN(lastToken)) ||
            (lastTokenIsConstant)
        ) &&
        (
            ([
                operators['('].tokenString,
                functions['sin'].tokenString,
                functions['cos'].tokenString,
                functions['tan'].tokenString,
                functions['log'].tokenString,
                functions['ln'].tokenString,
                functions['√'].tokenString
            ].includes(currentInput)) ||
            (currIsConstant)
        );
        if(lastToken && implicitMultiplication){
            tokens.push('*');
        }

        lastTokenIsConstant = currIsConstant;

        tokens.push(currentInput);
    }
    if(bracketCount !== 0){
        showError("Mismatched brackets");
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

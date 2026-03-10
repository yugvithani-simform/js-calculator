import { showError } from "../utils/showError.js";
import { constants, operators, functions } from "./operations.js";

export default function tokenizer(exp){
    const tokens = [];
    let i = 0, len = exp.length;
    let bracketCount = 0;
    while(i<len){
        let currentInput = '';
        if(isDigit(exp[i])){
            while(i<len && isDigit(exp[i])){
                currentInput += exp[i++];
            }
        }
        else if(isConstant(exp[i])){
            currentInput += constants[exp[i++]].value
        }
        else if(isLetter(exp[i])){
            while(i<len && isLetter(exp[i])){
                currentInput += exp[i++];
            }
        }
        else if(exp[i] === '!' || exp[i] === '√'){
            currentInput += functions[exp[i++]].tokenString;
        }
        else if(isOperator(exp[i])){
            // unary operator handler
            let lastToken = tokens.length > 0 ? tokens[tokens.length-1] : null;
            let isUnary = ((exp[i] === '-' || exp[i] === '+') &&        // check current expression is the unary or not
                (
                    !tokens.length ||       // in starting       
                    (lastToken!==')' && isOperator(lastToken)) ||        // lastToken is operator
                    (lastToken === '(')     // lastToken is '('
                )
            );
            if(isUnary){
                i++;        //skip '-' or '+' and ignore the + sign as unary
                if(exp[i-1] === '-'){
                    if(lastToken === '^'){      // extra condition ((i<len && isDigit(exp[i])) || )
                        let num = '-';
                        while(i<len && isDigit(exp[i])){
                            num += exp[i++];
                        }
                        tokens.push(num);
                    }
                    else{
                        tokens.push('-1');
                        tokens.push('*')
                    }
                }
                continue;
            }
            
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
        let implicitMultiplication = 
        (lastToken && 
            (
                ([
                    operators[')'].tokenString,
                    functions['!'].tokenString,
                ].includes(lastToken)) ||
                !(isNaN(lastToken)) ||
                (Object.values(constants).some(x => `${x.value}` === lastToken))
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
                (Object.values(constants).some(x => `${x.value}` === currentInput))
            )
        ) ||
        (
            lastToken === ')' &&
            isDigit(currentInput[0])
        );
        if(lastToken && implicitMultiplication){
            tokens.push('*');
        }

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

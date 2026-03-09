import Stack from '../utils/stack.js';
import { operators, functions } from './operations.js';

export default function postfix(tokens){
    const stack = new Stack();
    const temp = [];
    for(let token of tokens){
        if(!isNaN(token))
            stack.push(token);
        else if(token === '(')
            temp.push(token);
        else if(token === ')'){
            while(temp.length && temp[temp.length-1] !== '(')
                stack.push(temp.pop());
            temp.pop()
        }
        else{
            let curr = operators[token] ?? functions[token];
            let top = operators[temp[temp.length-1]] ?? functions[temp[temp.length-1]] ?? {precedence: -1};
            while(temp.length && top.precedence >= curr.precedence && token!=='^'){
                stack.push(temp.pop());
                top = operators[temp[temp.length-1]] ?? functions[temp[temp.length-1]] ?? {precedence: -1};
            }
            temp.push(token);
        }
    }
    while(temp.length){
        stack.push(temp.pop())
    }
    return stack;
}
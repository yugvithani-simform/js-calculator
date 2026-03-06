import Stack from '../utils/stack.js';
import { operators } from './operations.js';

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
            while(temp.length && operators[temp[temp.length-1]].precedence >= operators[token].precedence){
                stack.push(temp.pop());
            }
            temp.push(token);
        }
    }
    while(temp.length){
        stack.push(temp.pop())
    }
    return stack.toArray();
}
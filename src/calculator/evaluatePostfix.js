import Stack from "../utils/stack.js";
import { operators } from "./operations.js";

export default function evaluatePostfix(stack){
    let outputStack = new Stack()
    stack.doReverse();
    while(!stack.isEmpty()){
        if(!isNaN(stack.peek())){
            outputStack.push(stack.pop());
        }
        else if(operators[stack.peek()].arity === 2){
            let op2 = Number(outputStack.pop());
            let op1 = Number(outputStack.pop());
            outputStack.push(operators[stack.pop()].execute(op1, op2));
        }
        else if(operators[stack.peek()].arity === 1){
            let op = Number(outputStack.pop());
            outputStack.push(operators[stack.pop()].execute(op));
        }
    }
    return outputStack.pop();
}
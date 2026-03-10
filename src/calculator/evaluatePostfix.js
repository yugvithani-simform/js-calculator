import { showError } from "../utils/showError.js";
import Stack from "../utils/stack.js";
import { operators, functions } from "./operations.js";

export default function evaluatePostfix(stack, angleMode){
    let outputStack = new Stack()
    stack.doReverse();
    while(!stack.isEmpty()){
        if(!isNaN(stack.peek())){
            outputStack.push(stack.pop());
        }
        else{
            let op2 = Number(outputStack.pop());
            let currOperation = operators[stack.peek()] ?? functions[stack.peek()];
            stack.pop();
            if(currOperation.arity === 2){
                let op1 = Number(outputStack.pop());
                outputStack.push(currOperation.execute(op1, op2));
            }
            else if(currOperation.arity === 1){
                outputStack.push(currOperation.execute(op2, angleMode));
            }
        }
    }
    if(['undefined', 'NaN', 'null'].includes(outputStack.peek()))
        showError("Error")
    return outputStack.pop();
}
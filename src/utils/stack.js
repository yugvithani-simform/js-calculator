import { showError } from "./showError.js";

export default class Stack{
    #arr = [];

    push(ele){
        if(typeof ele !== 'string')
            showError('type of passed element is not string')
        this.#arr.push(ele);
    }

    pop(){
        if(this.#arr.length === 0)
            showError('stack is empty')
        let res = this.#arr.pop();
        return res;
    }

    peek(){
        if(this.#arr.length === 0)
            showError('stack is empty')
        let res = this.#arr.at(this.#arr.length - 1);
        return res;
    }

    toArray(){
        return this.#arr
    }

    isEmpty(){
        return !(this.#arr.length)
    }

    clear(){
        this.#arr = [];
    }
}
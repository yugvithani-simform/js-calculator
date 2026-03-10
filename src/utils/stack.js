import { showError } from "./showError.js";

export default class Stack{
    #arr = [];

    push(ele){
        this.#arr.push(ele);
    }

    pop(){
        if(this.#arr.length === 0)
            showError('Error')
        let res = this.#arr.pop();
        return res;
    }

    peek(){
        if(this.#arr.length === 0)
            showError('Error')
        let res = this.#arr.at(this.#arr.length - 1);
        return res;
    }

    toArray(){
        return this.#arr
    }

    isEmpty(){
        return !(this.#arr.length)
    }

    doReverse(){
        this.#arr.reverse();
        return;
    }

    clear(){
        this.#arr = [];
    }
}
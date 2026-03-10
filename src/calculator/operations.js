import { showError } from "../utils/showError.js"

const constants = {
    'π':{
        value: Math.PI
    },
    'e':{
        value: Math.E
    }
}

const operators = {
    '+':{
        precedence: 5,
        arity: 2,
        execute: (a,b) => a+b 
    },
    '-':{
        precedence: 5,
        arity: 2,
        execute: (a,b) => a-b
    },
    '*':{
        precedence: 6,
        arity: 2,
        execute: (a,b) => a*b
    },
    '/':{
        precedence: 6,
        arity: 2,
        execute: (a,b) => b==0 ? showError("Can't devide by zero") : a/b
    },
    '%':{
        precedence: 6,
        arity: 2,
        execute: (a,b) => a%b
    },
    '^':{
        precedence: 8,
        arity: 2,
        execute: (a,b) => Math.pow(a, b)
    },
    '(':{
        precedence: 1
    },
    ')':{
        precedence: 1
    }
}

const functions = {
    'sin':{
        precedence: 10,
        arity: 1,
        execute: function (a, mode) {
            let angle = (mode === 'DEG') ? (a*constants['π'].value/180) : a;
            let sinVal = Math.sin(angle) // in radians
            return (sinVal > -1e-7 && sinVal < 1e-7) ? 0 : sinVal;
        }
    },
    'cos':{
        precedence: 10,
        arity: 1,
        execute: function (a, mode) {
            let angle = (mode === 'DEG') ? (a*constants['π'].value/180) : a;
            let cosVal = Math.cos(angle) // in radians
            return (cosVal > -1e-7 && cosVal < 1e-7) ? 0 : cosVal;
        }
    },
    'tan':{
        precedence: 10,
        arity: 1,
        execute: function (a, mode) {
            let angle = (mode === 'DEG') ? (a*constants['π'].value/180) : a;
            let cosVal = Math.cos(angle);
            if(cosVal > -1e-7 && cosVal < 1e-7)
                showError('tan value goes infinte')
            return Math.tan(angle) // in radians
        }
    },
    'log':{
        precedence: 10,
        arity: 1,
        execute: function (a) {
            if(a<=0)
                showError('Please enter the valid number')
            return Math.log10(a);
        }
    },
    'ln':{
        precedence: 10,
        arity: 1,
        execute: function (a) {
            if(a<=0)
                showError('Please enter the valid number')
            return Math.log(a);
        }
    },
    '!':{
        precedence: 9,
        arity: 1,
        execute: function (a) {
            if((Math.floor(a) !== a) || a<=0)
                showError('Please enter the natural number')
            let fact = 1;
            for(let i=2; i<=a; i++){
                fact*=i;
            }
            return fact;
        }
    },
    '√':{
        precedence: 10,
        arity: 1,
        execute: function (a) {
            if(a<0)
                showError('please enter the valid number')
            return Math.sqrt(a);
        }
    }
}

export {constants, operators, functions}
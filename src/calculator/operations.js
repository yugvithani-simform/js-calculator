import { showError } from "../utils/showError.js"

const constants = {
    'pi':{
        value: 3.1415
    },
    'e':{
        value: 2.718
    }
}

const operators = {
    '+':{
        tokenString: '+',
        precedence: 5,
        airty: 2,
        execute: (a,b) => a+b 
    },
    '-':{
        tokenString: '-',
        precedence: 5,
        airty: 2,
        execute: (a,b) => a-b
    },
    '*':{
        tokenString: '*',
        precedence: 6,
        airty: 2,
        execute: (a,b) => a*b
    },
    '/':{
        tokenString: '/',
        precedence: 6,
        airty: 2,
        execute: (a,b) => b==0 ? showError("Can't devide by zero") : a/b
    },
    '%':{
        tokenString: '%',
        precedence: 6,
        airty: 2,
        execute: (a,b) => a%b
    },
    '^':{
        tokenString: '^',
        precedence: 7,
        arity: 2,
        execute: (a,b) => Math.pow(a, b)
    },
    '(':{
        tokenString: '(',
        precedence: 10
    },
    ')':{
        tokenString: ')',
        precedence: 10
    }
}

const functions = {
    '+/-':{
        tokenString: 'swapSign',
        precedence: 4,
        airty: 1,
        execute: function (a){
            return -a;
        }
    },
    '-':{
        tokenString: 'NEG',
    },
    'sin':{
        tokenString: 'sin',
        precedence: 9,
        arity: 1,
        execute: function (a, mode) {
            angle = mode === 'DEG' ? a*180/constants['pi'] : a;
            return Math.sin(angle) // in radians
        }
    },
    'cos':{
        tokenString: 'cos',
        precedence: 9,
        arity: 1,
        execute: function (a, mode) {
            angle = mode === 'DEG' ? a*180/constants['pi'] : a;
            return Math.cos(angle) // in radians
        }
    },
    'tan':{
        tokenString: 'tan',
        precedence: 9,
        arity: 1,
        execute: function (a, mode) {
            angle = mode === 'DEG' ? a*180/constants['pi'] : a;

            let cosVal = Math.cos(angle);
            if(cosVal < 1e-10)
                showError('tan value goes infinte')
            return Math.tan(angle) // in radians
        }
    },
    'log':{
        tokenString: 'log',
        precedence: 9,
        arity: 1,
        execute: function (a) {
            if((typeof a !== 'number') || a<0)
                showError('Please enter the valid number')
            return Math.log10(a);
        }
    },
    'ln':{
        tokenString: 'ln',
        precedence: 9,
        arity: 1,
        execute: function (a) {
            if((typeof a !== 'number') || a<0)
                showError('Please enter the valid number')
            return Math.log(a);
        }
    },
    '!':{
        tokenString: '!',
        precedence: 8,
        arity: 1,
        execute: (a) => {
            if((typeof a !== 'number') || (Math.floor(a) !== a) || a<=0)
                showError('Please enter the natural number')
            let fact = 1;
            for(let i=2; i<=a; i++){
                fact*=i;
            }
            return fact;
        }
    },
    '√':{
        tokenString: '√',
        precedence: 9,
        arity: 1,
        execute: (a) => {
            if((typeof a !== 'number') || a<0)
                showError('please enter the valid number')
            return Math.sqrt(a);
        }
    },
    '1/x':{
        tokenString: 'INV',
        arity: 1,
        execute: (a) => {
            if(a===0)
                showError("can't divide by zero")
            return 1/a;
        }
    }
}

export {constants, operators, functions}
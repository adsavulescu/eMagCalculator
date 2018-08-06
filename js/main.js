'use strict';

class Calculator {

    constructor() {
        //stores the inputs from the user to calculate later
        this.inputs = [];

        //string to store current input string
        this.totalString = '';

        //operators array for validation
        this.operators = ["+", "-", "/", "*","%","(",")"];
        this.acceptedFirstOperators = ["-"];
        this.parantheses = ["(",")"];
        //numbers for validation
        this.nums = [0,1,2,3,4,5,6,7,8,9];

        //memory number
        this.memoryNr = 0;

        //events array
        this.events = [
            {
                'id':'one',
                'type':'click',
                'function': function(){
                   calculator.addValue(1);
               }
            },
            {
                'id':'two',
                'type':'click',
                'function':function(){
                    calculator.addValue(2);
                }
            },
            {
                'id':'three',
                'type':'click',
                'function':function(){
                    calculator.addValue(3);
                }
            },
            {
                'id':'four',
                'type':'click',
                'function':function(){
                    calculator.addValue(4);
                }
            },
            {
                'id':'five',
                'type':'click',
                'function':function(){
                    calculator.addValue(5);
                }
            },
            {
                'id':'six',
                'type':'click',
                'function':function(){
                    calculator.addValue(6);
                }
            },
            {
                'id':'seven',
                'type':'click',
                'function':function(){
                    calculator.addValue(7);
                }
            },
            {
                'id':'eight',
                'type':'click',
                'function':function(){
                    calculator.addValue(8);
                }
            },
            {
                'id':'nine',
                'type':'click',
                'function':function(){
                    calculator.addValue(9);
                }
            },
            {
                'id':'zero',
                'type':'click',
                'function':function(){
                    calculator.addValue(0);
                }
            },
            {
                'id':'addition',
                'type':'click',
                'function':function(){
                    calculator.addValue('+');
                }
            },
            {
                'id':'subtraction',
                'type':'click',
                'function':function(){
                    calculator.addValue('-');
                }
            },
            {
                'id':'multiplication',
                'type':'click',
                'function':function(){
                    calculator.addValue('*');
                }
            },
            {
                'id':'division',
                'type':'click',
                'function':function(){
                    calculator.addValue('/');
                }
            },
            {
                'id':'reset',
                'type':'click',
                'function':function(){
                    calculator.reset();
                }
            },
            {
                'id':'total',
                'type':'click',
                'function':function(){
                    calculator.total();
                }
            },
            {
                'id':'openpar',
                'type':'click',
                'function':function(){
                    calculator.addValue('(');
                }
            },
            {
                'id':'closedpar',
                'type':'click',
                'function':function(){
                    calculator.addValue(')');
                }
            },
            {
                'id':'back',
                'type':'click',
                'function':function(){
                    calculator.back();
                }
            },
            {
                'id':'checkPrime',
                'type':'click',
                'function':function(){
                    calculator.checkPrime();
                }
            },
            {
                'id':'fibonacciNr',
                'type':'click',
                'function':function(){
                    calculator.getNthFibonacciNum();
                }
            },
            {
                'id':'factorialOfNr',
                'type':'click',
                'function':function(){
                    calculator.getPrimeNum();
                }
            },
            {
                'id':'squareRoot',
                'type':'click',
                'function':function(){
                    calculator.getSquareRootNum();
                }
            },
            {
                'id':'modulus',
                'type':'click',
                'function':function(){
                    calculator.addValue('%');
                }
            },
            {
                'id':'memplus',
                'type':'click',
                'function':function(){
                    calculator.addMemory();
                }
            },
            {
                'id':'memminus',
                'type':'click',
                'function':function(){
                    calculator.clearMemory();
                }
            }

        ];

        this.bindEvents(this.events);
    }

    bindEvents(events) {
        for (let i = 0; i < events.length; i++) {
            document.getElementById(events[i].id).addEventListener(events[i].type, events[i].function);
        }
        document.addEventListener("keydown", this.keyboardShortcuts, false);
    }

    keyboardShortcuts(e) {
        let keyCode = e.key;

        switch (keyCode) {
            case '1':
                calculator.addValue(1);
                break;
            case '2':
                calculator.addValue(2);
                break;
            case '3':
                calculator.addValue(3);
                break;
            case '4':
                calculator.addValue(4);
                break;
            case '5':
                calculator.addValue(5);
                break;
            case '6':
                calculator.addValue(6);
                break;
            case '7':
                calculator.addValue(7);
                break;
            case '8':
                calculator.addValue(8);
                break;
            case '9':
                calculator.addValue(9);
                break;
            case '0':
                calculator.addValue(0);
                break;
            case 'Backspace':
                calculator.back();
                break;
            case '+':
                calculator.addValue('+');
                break;
            case '-':
                calculator.addValue('-');
                break;
            case '*':
                calculator.addValue('*');
                break;
            case '/':
                calculator.addValue('/');
                break;
            case '(':
                calculator.addValue('(');
                break;
            case ')':
                calculator.addValue(')');
                break;
            case '=':
                calculator.getTotal();
                break;
            case 'Enter':
                calculator.getTotal();
                break;
            case '%':
                calculator.addValue('%');
                break;
        }
    }

    splitMulti(str, tokens){
        let tempChar = tokens[0]; // We can use the first token as a temporary join character
        for(let i = 0; i < tokens.length; i++){
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
    }

    numberLenIsValid() {

        if (this.inputs.length) {

            let numbers = this.getInputs();
            let billion = 1000000000;

            numbers = this.splitMulti(numbers, this.operators);

            let number = this.getLastEl(numbers);

            if (number !== null && number !== '') {
                return parseInt(number) < (billion - 1);
            }else {
                return true;
            }

        } else {
            return true;
        }

    }

    validateValue(input) {

        console.log(input);

        if (this.operators.includes(input)) {//check if operator
            if (!this.inputs.length) {//check if first element
                if (!this.operators.includes(input) || this.acceptedFirstOperators.includes(input)) {//allow only acceptedFirstOperators as first element
                    this.setValue(input);
                }
            } else {//rest of elements
                if (this.parantheses.includes(input)) {//check for parantheses
                    if (!this.inputs.includes(this.parantheses[0]) && input === this.parantheses[0] && this.operators.includes(this.getLastEl(this.inputs))) {//allow only opening parantheses first
                        this.setValue(input);
                    } else if(this.inputs.includes(this.parantheses[0]) && //check for existing open parantheses and
                              input === this.parantheses[1] && //check if current element is a closing paramenthesis and
                              (this.nums.includes(Number(this.getLastEl(this.inputs))) || !this.parantheses.includes(this.getLastEl(this.inputs))) && //check if last element is number or closing paranthesis and
                              !this.operators.includes(this.getLastEl(this.inputs)) //last element is not an operator
                             ){//allow only closing parantheses
                        this.setValue(input);
                    }
                } else if(!this.operators.includes(this.getLastEl(this.inputs)) || this.parantheses.includes(this.getLastEl(this.inputs))) {//allow each operator only once
                    this.setValue(input);
                }
            }
        } else if (this.nums.includes(Number(input))) {//check if number
            if (!this.inputs.length) {//check if first element
                if (input !== 0) {//don't allow 0 as first element
                    this.setValue(input);
                }
            } else {
                if(this.numberLenIsValid()) {//check if number length is valid
                    this.setValue(input);
                }
            }
        }

        this.update();
    }

    setValue(input) {
        this.inputs.push(input);
    }

    update(){
        this.totalString = this.getInputs();
        this.setOutputVal(this.totalString);
    }

    resetInputs() {
        this.inputs=[];
    }

    getTotal(){
        this.totalString = this.getInputs();
        this.setOutputVal(eval(this.totalString));
        this.resetInputs();
        this.inputs.push(eval(this.totalString));
    }

    reset() {
        this.resetInputs();
        this.update();
    }

    total() {
        this.getTotal();
    }

    addValue(val) {
        this.validateValue(val);
    }

    addMemory() {
        this.memoryNr = this.getInputs();
        this.setMemoryVal(this.memoryNr);
    }

    clearMemory() {
        this.setMemoryVal('');
    }

    getInputs() {
        return this.inputs.join("");
    }

    setOutputVal(val) {
        document.getElementById("output").value = val;
    }

    setMemoryVal(val) {
        document.getElementById("memory").value = val;
    }

    getLastEl(array) {
        return array[array.length-1];
    }

    back() {
        this.inputs.splice(-1,1);
        this.update();
    }

    validateSpecialOperation(num) {
        num = Number(num.join(""));

        if(!Number.isInteger(num)) {
            alert('Input must be number!');
            return false;
        } else {
            return num;
        }
    }

    checkPrime() {
        if (this.validateSpecialOperation(this.inputs)) {
            this.setOutputVal(this.isPrime(this.validateSpecialOperation(this.inputs)));
            this.resetInputs();
        }
    }

    getNthFibonacciNum() {
        if (this.validateSpecialOperation(this.inputs)) {
            this.setOutputVal(this.calcNthFibonacciNum(this.validateSpecialOperation(this.inputs)));
            this.resetInputs();
        }
    }

    getPrimeNum() {
        if (this.validateSpecialOperation(this.inputs)) {
            this.setOutputVal(this.factorialize(this.validateSpecialOperation(this.inputs)));
            this.resetInputs();
        }
    }

    getSquareRootNum() {
        if (this.validateSpecialOperation(this.inputs)) {
            this.setOutputVal(this.calcSquareRoot(this.validateSpecialOperation(this.inputs)));
            this.resetInputs();
        }
    }

    calcSquareRoot(num) {
        return Math.sqrt(num);
    }

    calcNthFibonacciNum(num, memo) {
        memo = memo || {};

        if (memo[num]) return memo[num];
        if (num <= 1) return 1;

        return memo[num] = this.calcNthFibonacciNum(num - 1, memo) + this.calcNthFibonacciNum(num - 2, memo);
    }

    isPrime(value) {
        for(let i = 2; i < value; i++) {
            if(value % i === 0) {
                return false;
            }
        }
        return value > 1;
    }

    factorialize(num) {
        if (num < 0){
            return -1;
        } else if (num === 0) {
            return 1;
        } else {
            return (num * this.factorialize(num - 1));
        }
    }
}

let calculator = new Calculator();
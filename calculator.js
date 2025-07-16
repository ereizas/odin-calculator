let num1;
let operator;
let num2;

function add(num1,num2){
    return +num1 + +num2;
}

function subtract(num1,num2){
    return +num1 - +num2;
}

function multiply(num1,num2){
    return +num1 * +num2;
}

function divide(num1,num2){
    if(+num2==0){
        return "Divide by 0 error";
    }
    return +num1 / +num2;
}
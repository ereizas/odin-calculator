let num1 = null;
let operator = null;
let num2 = "";
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

function operate(num1,operator,num2){
    switch(operator){
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1,num2);
        case "*":
            return multiply(num1,num2);
        case "/":
            return divide(num1,num2);
        default:
            return "Invalid operator";
    }
}

function isOperator(char){
    return ["+","-","*","/"].includes(char);
}

let display = document.querySelector("#display")
let btns = document.querySelector("#buttons")
btns.addEventListener("click", function(event){
    if(isOperator(event.target.textContent)){
        if(num1==null){
            num1 = "0";
        }
        else if(operator!=null && num2!=""){
            num1 = operate(num1,operator,num2);
            num2 = "";
            operator = event.target.textContent;
            display.textContent = num1;
        }
        operator = event.target.textContent
        display.textContent+=operator;
    }
    else if(event.target.textContent=="="){
        if(num1 && operator && num2)
        {
            num1 = operate(num1,operator,num2);
            display.textContent = num1;
        }
    }
    else if(event.target.textContent=="C"){
        display.textContent = "";
        num1 = null;
        operator = null;
        num2 = "";
    }
    else if(num1==null){
        num1=event.target.textContent;
        display.textContent=num1;
    }
    else if(operator==null){
        num1+=event.target.textContent;
        display.textContent+=event.target.textContent;
    }
    else{
        num2+=event.target.textContent;
        display.textContent+=event.target.textContent
    }
})
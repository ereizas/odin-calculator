const DIVIDE_BY_ZERO_MESSAGE = "Divide by 0 error";
let num1 = null;
let operator = null;
let num2 = "";
let equalsPrevPressed = false;
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
        return DIVIDE_BY_ZERO_MESSAGE;
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

function round(num){
    num = String(num);
    decimalInd = num.indexOf(".");
    if(decimalInd!=-1 && num.length>decimalInd+2){
        return num.slice(0,decimalInd+3);
    }
    else{
        return num;
    }
}

function isOperator(char){
    return ["+","-","*","/"].includes(char);
}

function clear(){
    display.textContent = "";
    num1 = null;
    operator = null;
    num2 = "";
}

let display = document.querySelector("#display")
let btns = document.querySelector("#buttons")
btns.addEventListener("click", function(event){
    if(equalsPrevPressed){
        clear();
        equalsPrevPressed = false;
    }
    if(display.textContent==DIVIDE_BY_ZERO_MESSAGE){
        clear();
        return;
    }
    if(isOperator(event.target.textContent)){
        if(num1==null){
            num1 = "0";
        }
        else if(operator!=null && num2!=""){
            num1 = operate(num1,operator,num2);
            display.textContent = round(num1);
            if(num1!=DIVIDE_BY_ZERO_MESSAGE){
                num2 = "";
            }
            else{
                return;
            }
        }
        else if(operator!=null){
            operator = event.target.textContent;
            display.textContent=display.textContent.slice(0,display.textContent.length-1)+operator;
            return
        }
        operator = event.target.textContent;
        display.textContent+=operator;
    }
    else if(event.target.textContent=="="){
        if(num1 && operator && num2)
        {
            num1 = operate(num1,operator,num2);
            display.textContent = round(num1);
            num2="";
            operator=null;
            equalsPrevPressed = true;
        }
    }
    else if(event.target.textContent=="C"){
        clear();
    }
    else if(num1==null){
        num1=event.target.textContent;
        display.textContent=num1;
    }
    else if(operator==null && (event.target.textContent!="." || !num1.includes("."))){
        num1+=event.target.textContent;
        display.textContent+=event.target.textContent; 
    }
    else if(event.target.textContent!="."||!num2.includes(".")){
        num2+=event.target.textContent;
        display.textContent+=event.target.textContent
    }
})
const DIVIDE_BY_ZERO_MESSAGE = "Divide by 0 error";
const BACKSPACE = "\u232B";
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
function handleBtnPress(key){
    if(equalsPrevPressed && !isOperator(key)){
        clear();
    }
    equalsPrevPressed = false;
    if(display.textContent==DIVIDE_BY_ZERO_MESSAGE){
        clear();
        return;
    }
    if(isOperator(key)){
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
            operator = key;
            display.textContent=display.textContent.slice(0,display.textContent.length-1)+operator;
            return
        }
        operator = key;
        display.textContent+=operator;
    }
    else if(key=="="){
        if(num1 && operator && num2)
        {
            num1 = operate(num1,operator,num2);
            display.textContent = round(num1);
            num2="";
            operator=null;
            equalsPrevPressed = true;
        }
    }
    else if(key=="C"){
        clear();
    }
    else if(key==BACKSPACE){
        if(num2!=""){
            num2=num2.slice(0,num2.length-1);
        }
        else if(operator!=null){
            operator=null;
        }
        else if(num1!=null){
            num1=num1.slice(0,num1.length-1);
            if(num1==""){
                num1=null;
            }
        }
        display.textContent = display.textContent.slice(0,display.textContent.length-1)
    }
    else if(num1==null){
        num1=key;
        display.textContent=num1;
    }
    else if(operator==null && (key!="." || !num1.includes("."))){
        num1+=key;
        display.textContent+=key; 
    }
    else if(key!="."||!num2.includes(".")){
        num2+=key;
        display.textContent+=key
    }
}

let display = document.querySelector("#display")
let keys = document.querySelector("#buttons")
keys.addEventListener("click", function(event){
    handleBtnPress(event.target.textContent);
})

document.addEventListener("keydown",function(event){
    if(!isNaN(Number(event.key))||isOperator(event.key)||event.key=="."||event.key=="="){
        handleBtnPress(event.key);
    }
    else if(event.key=="Backspace"){
        handleBtnPress(BACKSPACE);
    }
    else if(event.key=="c"||event.key=="C"){
        handleBtnPress("C");
    }
})
// This calculator stores data in an array. By clicking the buttons you fill the array. Equal calculates an array.

// Click animation
const BUTTONS = document.querySelectorAll('.btn');
BUTTONS.forEach((button) => {
    button.addEventListener('mousedown', tap);
    button.addEventListener('mouseup', untap);
});

function tap() {
    this.classList.add('tapped');
}

function untap() {
    this.classList.remove('tapped');
}

//buttons
const CLEAR = document.querySelector('#clear');
const DELETE = document.querySelector('#delete');
const MULTIPLE = document.querySelector('#multiple');
const DIVIDE = document.querySelector('#divide');
const SUBSTRACT = document.querySelector('#substract');
const ADD = document.querySelector('#add');
const EQUAL = document.querySelector('#equal');
const POINT = document.querySelector('#point');
const ZERO = document.querySelector('#zero');
const ONE = document.querySelector('#one');
const TWO = document.querySelector('#two');
const TRHEE = document.querySelector('#three');
const FOUR = document.querySelector('#four');
const FIVE = document.querySelector('#five');
const SIX = document.querySelector('#six');
const SEVEN = document.querySelector('#seven');
const EIGHT = document.querySelector('#eight');
const NINE = document.querySelector('#nine');
const OPERATIONS = document.querySelectorAll('.operations');

//screen value
const INPUT = document.querySelector('.input');
const HISTORY = document.querySelector('.history');

//digit buttons change the screen
const DIGITS = document.querySelectorAll('.digit');
DIGITS.forEach((button) => {
    button.addEventListener('click', clickDigit)
});


//operations buttons change the screen
OPERATIONS.forEach((button) => {
    button.addEventListener('click', clickOperations)
});

//point button changes the screen
POINT.addEventListener('click', toPoint);


// delete and clear  btn change the screen
DELETE.addEventListener('click', undo);

CLEAR.addEventListener('click', clear);

//dataArray stores all the inputs
let dataArray = [];

//clickDigit renew dataArray and refresh display in HTML
function clickDigit() {
    if (dataArray.length === 0) {
        dataArray.push(this.innerHTML);
    } else {
        switch (dataArray[dataArray.length - 1]) {
            case '-':
            case '+':
            case '*':
            case '/':
                dataArray.push(this.innerHTML);
                break;
            default:
                dataArray[dataArray.length - 1] = (dataArray[dataArray.length - 1]) + this.innerHTML;
        }
    }
    INPUT.innerHTML = dataArray.join('');
}

//Undo func delete last input
function undo() {
    if (dataArray.length > 0) {
        let lastNumber = dataArray[dataArray.length - 1].split('');
        switch (dataArray[dataArray.length - 1]) {
            case '-':
            case '+':
            case '*':
            case '/':
                dataArray.pop();
                break;
            default:
                if (dataArray[dataArray.length - 1].length == 1) {
                    dataArray.pop();
                } else {
                    lastNumber.pop();
                    dataArray[dataArray.length - 1] = lastNumber.join('');
                }
        }
        INPUT.innerHTML = dataArray.join('');
    }

}

//Clear delete all data from dataArray
function clear() {
    dataArray = [];
    INPUT.innerHTML = 'input';
    HISTORY.innerHTML = 'history';
}

//operations buttons 
function clickOperations() {

    switch (dataArray[dataArray.length - 1]) {
        case '-':
        case '+':
        case '*':
        case '/':

            dataArray[dataArray.length - 1] = this.innerHTML;

            break;
        default:
            switch (this.innerHTML) {
                case '-':
                case '+':
                    if (dataArray.length == 0) {
                        dataArray.push(this.innerHTML);
                    } else
                    if (dataArray[dataArray.length - 1].charAt(dataArray[dataArray.length - 1].length - 1) == '.') {
                        let lastNumber = dataArray[dataArray.length - 1].split('');
                        lastNumber.pop();
                        dataArray[dataArray.length - 1] = lastNumber.join('');
                    } else {
                        dataArray.push(this.innerHTML);
                    }
                    break;
                    default:
                        if (dataArray.length != 0) {
                            if (dataArray[dataArray.length - 1].charAt(dataArray[dataArray.length - 1].length - 1) == '.') {
                                let lastNumber = dataArray[dataArray.length - 1].split('');
                                lastNumber.pop();
                                dataArray[dataArray.length - 1] = lastNumber.join('');
                            } else {
                                dataArray.push(this.innerHTML);
                            }
                        }
            }


    }
    INPUT.innerHTML = dataArray.join('');
}

//point
function toPoint() {
    switch (dataArray[dataArray.length - 1]) {
        case '-':
        case '+':
        case '*':
        case '/':
            dataArray.push('0.');
            break;
        default:
            if (dataArray.length === 0) {
                dataArray.push('0.');
            } else if (dataArray[dataArray.length - 1].indexOf('.') == -1) {
                dataArray[dataArray.length - 1] = (dataArray[dataArray.length - 1]) + this.innerHTML;
            }
    }

    INPUT.innerHTML = dataArray.join('');
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiple(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


EQUAL.addEventListener('click', equal);

//equal btn
function equal() {
    cutOff(dataArray);
    if (dataArray[0] == '+' ||dataArray[0] == '-') {
        dataArray[1] = dataArray[0]+dataArray[1];
        dataArray.shift();
    }
    HISTORY.innerHTML = dataArray.join('');
    dataArray = dataArray.map(makeNumbers);
    operate();
    if (dataArray[0]== "Infinity") {
        dataArray=[];
        INPUT.innerHTML = `Error`;
    } else {
        INPUT.innerHTML = dataArray.join('');
    }
    
}

//transforms items of an array into numbers if possible
function makeNumbers(item) {
    if (item != "-" && item != '+' && item != '*' && item != '/') {
        return Number(item);
    } else {
        return item;
    }
}

//do calculations
function operate(){
    let placeOfMultiple = dataArray.indexOf("*");
    while (placeOfMultiple > 0) {
        dataArray[placeOfMultiple-1] = multiple(dataArray[placeOfMultiple-1], dataArray[placeOfMultiple+1]);
        dataArray.splice(placeOfMultiple,2);
        placeOfMultiple = dataArray.indexOf("*");
    }
    let placeOfDivide = dataArray.indexOf("/");
    while (placeOfDivide > 0) {
        dataArray[placeOfDivide-1] = divide(dataArray[placeOfDivide-1], dataArray[placeOfDivide+1]);
        dataArray.splice(placeOfDivide,2);
        placeOfDivide = dataArray.indexOf("/");
    }
    let placeOfAdd = dataArray.indexOf("+");
    while (placeOfAdd > 0) {
        dataArray[placeOfAdd-1] = add(dataArray[placeOfAdd-1], dataArray[placeOfAdd+1]);
        dataArray.splice(placeOfAdd,2);
        placeOfAdd = dataArray.indexOf("+");
        
    }
    let placeOfSubstract = dataArray.indexOf("-");
    while (placeOfSubstract > 0) {
        dataArray[placeOfSubstract-1] = substract(dataArray[placeOfSubstract-1], dataArray[placeOfSubstract+1]);
        dataArray.splice(placeOfSubstract,2);
        placeOfSubstract = dataArray.indexOf("-");
    }
    dataArray[0] = String(Math.round(dataArray[0]*1e7)/1e7);
}

// cuts off tails of the array
function cutOff(array) {
    switch (array[array.length-1]) {
        case '-':
        case '+':
        case '*':
        case '/':
            array.pop();
            break;
    }
    if (array[array.length-1].indexOf('.') == array[array.length-1].length-1) {
        let lastNumber = array[array.length-1].split('');
        lastNumber.pop();
        array[array.length-1] = lastNumber.join('');
    }
    
}


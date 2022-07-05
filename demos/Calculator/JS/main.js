// initialization
memory = [];
operation = [];
readout = "0";

// functions
// displays number in memory
function renderNum() {
    display = "";
    for (m in memory) {
        display = `${display}${memory[m]}`
    }
    document.getElementById("info").value = display;
    document.getElementById("readout").innerHTML = readout;
}

// adds given input to memory, prevents multiple decimals, and prevents attempting impossible addition
function memAdd(arg) {
    if (!operation.includes("r")) {
        if (arg == '.') {
            if (!memory.includes(".")) {
                memory.push(".");
            }
        }
        else {
            memory.push(arg);
        }
        renderNum();
    }
}

// clears most variables
function reset() {
    memory = [];
    operation = [];
    readout = "0";
    first = "";
    second = "";
    display = "";
    renderNum();
}

// takes user input, and parses it to be used in the calculate() function
function operate(type) {
    first = "";
    switch(true) {
        case !operation.includes("x") && (memory.length > 0):
            for (m in memory) {
                first = `${first}${memory[m]}`
            }
            first = parseFloat(first);
            memory = [];
            operation.push(type, "x")
            document.getElementById("info").value = type;
            break;
        case operation.includes("r"):
            operation = [type];
            document.getElementById("info").value = type;
            first = out;
    }
}

// displays the result of the calculation
function calculate() {
    second = "";
    for (m in memory) {
        second = `${second}${memory[m]}`
    }
    second = parseFloat(second);
    switch(true) {
        case operation[0] == "+":
            out = first + second;
            break;
        case operation[0] == "-":
            out = first - second;
            break;
        case operation[0] == "/":
            out = first / second;
            break;
        case operation[0] == "*":
            out = first * second;
            break;
        default:
            out = "0";
    }
    readout = out;
    memory = [];
    operation = ["r"];
    renderNum();
}
let currentPlayer = "X";
let playedSquares = [];

function play(location) {
    if (!playedSquares.some(element => element.includes(location))) {
        let select = document.getElementById(location);
        if (currentPlayer == "X") {
            select.style.backgroundImage = "url('media/images/x.png')";
        } else {
            select.style.backgroundImage = "url('media/images/o.png')";
        }
        playedSquares.push(location + currentPlayer);
        checkWinConditions();
        if (currentPlayer === "X") {
            currentPlayer = "O";
        }
        else {
            currentPlayer = "X";
        }
        audio("media/sound/place.mp3")
        if (currentPlayer === "O") {
            disableClick();
            setTimeout(function () { computersTurn(); }, 1000)
        }
        return true;
    }
    function computersTurn() {
        let success = false;
        let move;
        while(!success) {
            num = String(Math.floor(Math.random() * 9));
            if (play(num)) {
                play(num);
                success = true;
            }
        }
    }
}

function disableClick() {
    body.style.pointerEvents = "none";
    setTimeout(function() {body.style.pointerEvents = "auto";}, 1000);
}

function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

function checkWinConditions() {
    switch(true) {
        case arrayIncludes('0X', '1X', '2X'):
            drawWinLine(50, 100, 558, 100)
            break;
        case arrayIncludes('3X', '4X', '5X'):
            drawWinLine(50, 304, 558, 304) 
            break;
        case arrayIncludes('6X', '7X', '8X'):
            drawWinLine(50, 508, 558, 508) 
            break;
        case arrayIncludes('0X', '3X', '6X'):
            drawWinLine(100, 50, 100, 558) 
            break;
        case arrayIncludes('1X', '4X', '7X'):
            drawWinLine(304, 50, 304, 558) 
            break;
        case arrayIncludes('2X', '5X', '8X'):
            drawWinLine(508, 50, 508, 558) 
            break;
        case arrayIncludes('6X', '4X', '2X'):
            drawWinLine(100, 508, 510, 90) 
            break;
        case arrayIncludes('0X', '4X', '8X'):
            drawWinLine(100, 100, 520, 520) 
            break;
        case arrayIncludes('0O', '1O', '2O'):
            drawWinLine(50, 100, 558, 100) 
            break;
        case arrayIncludes('3O', '4O', '5O'):
            drawWinLine(50, 304, 558, 304) 
            break;
        case arrayIncludes('6O', '7O', '8O'):
            drawWinLine(50, 508, 558, 508) 
            break;
        case arrayIncludes('0O', '3O', '6O'):
            drawWinLine(100, 50, 100, 558) 
            break;
        case arrayIncludes('1O', '4O', '7O'):
            drawWinLine(304, 50, 304, 558) 
            break;
        case arrayIncludes('2O', '5O', '8O'):
            drawWinLine(508, 50, 508, 558) 
            break;
        case arrayIncludes('6O', '4O', '2O'):
            drawWinLine(100, 508, 510, 90) 
            break;
        case arrayIncludes('0O', '4O', '8O'):
            drawWinLine(100, 100, 520, 520)
            break;
        case playedSquares.length >= 9:
            audio("media/sound/tie.mp3");
            setTimeout(function () { resetGame(); }, 1000);
    }
    function arrayIncludes(squareA, squareB, squareC) {
        const a = playedSquares.includes(squareA);
        const b = playedSquares.includes(squareB);
        const c = playedSquares.includes(squareC);
        if (a === true && b === true && c === true) { return true; }
    }    
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById("game");
    const c = canvas.getContext("2d");
    let x1 = coordX1;
        y1 = coordY1;
        x2 = coordX2;
        y2 = coordY2;
        x = x1;
        y = y1;
    function animateLineDrawing() {
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        c.clearRect(0, 0, 608, 608);
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        c.lineWidth = 10;
        c.strokeStyle = "rgba(70, 255, 33, 0.8)";
        c.stroke();
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) { x += 10; } 
            if (y < y2) { y += 10; }
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }
    disableClick();
    audio("media/sound/win.mp3");
    animateLineDrawing();
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i))
        square.style.backgroundImage = "";
    }
    playedSquares = [];
}

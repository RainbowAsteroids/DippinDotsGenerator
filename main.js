var canvas;
var context;
var circleSize;
var canvasSize;
function drawCircle(x,y,size,color,stroke) {
    //draws a circle
    context.beginPath();
    context.arc(x,y,size,0,2*Math.PI);
    context.fillStyle = color;
    context.fill();
    if(stroke == true || stroke == undefined){context.stroke();}
    context.closePath();
}

function randomNum(num) {return Math.floor(Math.random()*num) + 1;}
function misc() {
    //does some stuff with the inputs
    circleSize = Number(document.getElementById("circleSize").value);
    canvasSize = Number(document.getElementById("canvasSize").value);
    document.getElementById("circleSize").max = (canvasSize-circleSize)
    if (canvas.width != canvasSize) {
        canvas.width = canvasSize;
        canvas.height = canvasSize;
    }
}

function randomCircle() {
    //draws a random circle
    misc(); //unreleated dynamic code
    //generate a random color
    const hexChars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var color = '#';
    for (var i = 0; i != 3; i++) {
        color += hexChars[randomNum(16)-1];
    }
    
    var size = randomNum(circleSize) //randomly generated circle size
    drawCircle(
        randomNum((canvas.width-size)-size)+size, //randomly generated x coord
        randomNum((canvas.height-size)-size)+size, //randomly generated y coord
        size, //size var
        color, //color var
        document.getElementById("outline").checked); //if the outline checkmark is checked, make an outline
}

function clearCanvas(){context.clearRect(0, 0, canvas.width, canvas.height);}

function isNumberKey(evt){ //definitely didn't steal this from stack overflow
    //makes sure the inputted text is number
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function setup() {
    canvas = document.getElementById("canvas"); //the canvas in the html
    context = canvas.getContext("2d") //the 2d drawing context
    circleSize = document.getElementById("circleSize") //the circle size input
    canvasSize = document.getElementById("canvasSize") //the canvas size input
    setInterval(randomCircle,50); //every 50 milisecs draw a random circle
}
setTimeout(setup, 350)

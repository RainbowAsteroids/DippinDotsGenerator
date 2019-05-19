var canvas;
var context;
var circleSize;
var canvasSize;
var fade;
var play = false;
function drawCircle(x,y,size,color) {
    //draws a circle
    context.beginPath();
    context.arc(x,y,size,0,2*Math.PI);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function randomNum(num) {return Math.floor(Math.random()*num) + 1;}
function misc() {
    //does some stuff with the inputs
    if (circleSize != document.getElementById("circleSize").value && fade) {fadeInit();}
    circleSize = Number(document.getElementById("circleSize").value);
    canvasSize = Number(document.getElementById("canvasSize").value);
    document.getElementById("circleSize").max = (canvasSize-circleSize)
    if (canvas.width != canvasSize) {
        if (fade) {fadeInit();}
        canvas.width = canvasSize;
        canvas.height = canvasSize;

    }
}

function randomColor() {
    //generate a random color
    const hexChars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var color = '#';
    for (var i = 0; i != 6; i++) {
        color += hexChars[randomNum(16)-1];
    } return color;
}

function randomCircle() {
    //draws a random circle
    var size = randomNum(circleSize)
    drawCircle(
        randomNum((canvas.width-size)-size)+size, //randomly generated x coord
        randomNum((canvas.height-size)-size)+size, //randomly generated y coord
        size, //randomly generated circle size
        randomColor() //random color
    );
}

function clearCanvas(){context.clearRect(0, 0, canvas.width, canvas.height);}
function isNumberKey(evt){ //definitely didn't steal this from stack overflow
    //makes sure the inputted text is number
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function distanceFormula(x,y) {return Math.floor(((y[0]-x[0])**2) + ((y[1]-x[1])**2)**.5)} //Distance formula

function fadeMode() {
    var maxDistance = distanceFormula([0, 0], [canvas.width/2, canvas.height/2]);
    var size = randomNum(circleSize)
    var position = [randomNum((canvas.width-size)-size)+size, randomNum((canvas.height-size)-size)+size]
    var distance = distanceFormula(position, [canvas.width/2, canvas.height/2]);
    var alpha = Math.floor((distance/maxDistance)*255).toString(16);
    drawCircle(
        position[0], //x coord
        position[1], //y coord
        size, //size var
        randomColor()+alpha //random color + transparency value
    );
}
function fadeInit() {drawCircle(canvas.width/2, canvas.height/2, circleSize, randomColor())}
function actionDelegator() {
    misc(); //dynamic var code
    if (document.getElementById("fade").checked != fade) {
        clearCanvas()
        if (document.getElementById("fade").checked == true) {fadeInit();}
    }
    fade = document.getElementById("fade").checked;
    //var fade = false;
    if (fade) {fadeMode();}
    else {randomCircle();}
}

function setup() {
    canvas = document.getElementById("canvas"); //the canvas in the html
    context = canvas.getContext("2d") //the 2d drawing context
    circleSize = document.getElementById("circleSize") //the circle size input
    canvasSize = document.getElementById("canvasSize") //the canvas size input
    setInterval(actionDelegator,50); //every 50 milisecs draw a random circle
}

setTimeout(setup, 350);

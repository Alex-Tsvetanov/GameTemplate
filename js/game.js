// Creating variables
var myX = 0;
var myY = 0;
var mouseX;
var mouseY;
function update() {
    myX = myX + (mouseX - myX) / 10;
    myY = myY + (mouseY - myY) / 10;
}
function draw() {
    // This is how you draw a rectangle
    context.fillRect(myX, myY, 30, 30);
}
function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
}
function mouseup(_mouseX, _mouseY) {
    mouseX = _mouseX;
    mouseY = _mouseY;
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
}

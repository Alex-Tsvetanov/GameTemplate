// Creating variables
var myX: number = 0;
var myY: number = 0;
var mouseX: number;
var mouseY: number;

function update () 
{
    myX = myX + (mouseX - myX) / 10;
    myY = myY + (mouseY - myY) / 10;
}

function draw () 
{
    // This is how you draw a rectangle
    context.fillRect (myX, myY, 30, 30);
}

function keyup (key: number) 
{
    // Show the pressed keycode in the console
    console.log ("Pressed", key);
}

function mouseup (_mouseX: number, _mouseY: number) 
{ 
    mouseX = _mouseX;
    mouseY = _mouseY;
    // Show coordinates of mouse on click
    console.log ("Mouse clicked at", mouseX, mouseY);
}

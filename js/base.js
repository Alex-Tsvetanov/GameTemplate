if (endlessCanvas === undefined) {
    var endlessCanvas = false;
}
var canvas = document.getElementsByTagName("canvas")[0];
if (endlessCanvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.onresize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
}
else {
    canvas.width = 800;
    canvas.height = 600;
}
var context = canvas.getContext("2d");
context.fillStyle = "#0000ff";
// global variables with mouse coordinates
mouseX = 0;
mouseY = 0;
// some keycodes
var key_left = 37;
var key_up = 38;
var key_right = 39;
var key_down = 40;
var key_a = 65;
var key_z = 90;
var isKeyPressed = [];
for (var i = 0; i < 256; ++i) {
    isKeyPressed.push(0);
}
var gridSize = undefined; //50
var reqAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        setTimeout(callback, 1000 / 30);
    };
function redraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    // draw grid
    //context.fillStyle = "#FF0000";
    context.font = "10px Arial";
    if (gridSize !== undefined && gridSize >= 25) {
        context.fillText("Any text", 0, 4, 10);
        context.beginPath();
        for (var i = gridSize; i < canvas.width; i += gridSize) {
            context.moveTo(i, 0);
            context.lineTo(i, canvas.height);
            context.fillText(i.toString(), i + 4, 10);
        }
        for (var i = gridSize; i < canvas.height; i += gridSize) {
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.fillText(i, 4, i + 10);
        }
        context.stroke();
    }
    draw(); // call progammer's draw() function
    reqAnimationFrame(redraw);
}
;
function callupdate() {
    update(); // call programmer's update() function
    setTimeout(callupdate, 10); // and 10 ms after that ...
}
;
function areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
    if (Bx <= Ax + Awidth) {
        if (Ax <= Bx + Bwidth) {
            if (By <= Ay + Aheight) {
                if (Ay <= By + Bheight) {
                    return true;
                }
            }
        }
    }
    return false;
}
;
function init() {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        isMobile = true;
        window.addEventListener("touchstart", function (e) {
            var touchobj = e.changedTouches[0];
            mouseX = parseInt(touchobj.pageX - canvas.offsetLeft);
            mouseY = parseInt(touchobj.pageY - canvas.offsetTop);
            mousedown();
        });
        window.addEventListener("touchend", function (e) {
            var touchobj = e.changedTouches[0];
            mouseX = parseInt(touchobj.pageX - canvas.offsetLeft);
            mouseY = parseInt(touchobj.pageY - canvas.offsetTop);
            mouseup();
        });
        window.addEventListener("touchmove", function (e) {
            var touchobj = e.changedTouches[0];
            mouseX = parseInt(touchobj.pageX - canvas.offsetLeft);
            mouseY = parseInt(touchobj.pageY - canvas.offsetTop);
        });
    }
    else {
        window.addEventListener("mousemove", function (e) {
            mouseX = e.pageX - canvas.offsetLeft;
            mouseY = e.pageY - canvas.offsetTop;
        });
        if (mousemove !== undefined) {
            window.addEventListener("mousemove", mousemove);
        }
        if (mouseup !== undefined) {
            window.addEventListener("mouseup", mouseup);
        }
        if (mousedown !== undefined) {
            window.addEventListener("mousedown", mousedown);
        }
        if (keydown !== undefined) {
            window.addEventListener("keydown", function (e) {
                isKeyPressed[e.keyCode] = 1;
                keydown(e.keyCode);
            });
        }
        else {
            window.addEventListener("keydown", function (e) {
                isKeyPressed[e.keyCode] = 1;
            });
        }
        if (keyup !== undefined) {
            window.addEventListener("keyup", function (e) {
                isKeyPressed[e.keyCode] = 0;
                keyup(e.keyCode);
            });
        }
        else {
            window.addEventListener("keyup", function (e) {
                isKeyPressed[e.keyCode] = 0;
            });
        }
    }
    if (draw === undefined) {
        redraw = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.globalAlpha = 1;
            context.fillStyle = "#FF0000";
            context.font = "20px Arial";
            context.fillText("Press <F12> for error info!", 40, 40);
        };
    }
    redraw();
    callupdate();
}
;

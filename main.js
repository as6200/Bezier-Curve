var canvas = document.getElementById("canvas"); // Gets canvas
const ctx = canvas.getContext("2d"); // Gets context
// Sets Width and Height
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var points = [];
ctx.fillStyle = '#add8e6';
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


function makePoint(e) {
	let getMousePos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
	};

	let pos = getMousePos(canvas, e);
	points.push([pos.x, pos.y]);
}


function drawPoint(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'black';
	ctx.stroke();
}


function drawLine(x1, y1, x2, y2) {
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';

	ctx.beginPath();
	ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


function main () {
	// Main loop
    function gameLoop () {
		for (let i = 0; i < points.length; i++) {
			drawPoint(points[i][0], points[i][1]);
		}

		for (let i = 0; i < points.length - 1; i++) {
			drawLine(points[i][0], points[i][1], points[i+1][0], points[i+1][1]);
		}

		window.requestAnimationFrame(gameLoop, canvas); // Loops it
        
    }

    window.requestAnimationFrame(gameLoop, canvas); // Starts loop
}

window.addEventListener("mousedown", makePoint, false);

main();
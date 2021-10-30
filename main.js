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

	let pos = getMousePos(canvas, e); // Gets mouse position

	if (pos.x > 20 && pos.y > 10 && pos.x < 100 && pos.y < 110) {
		makeCurve();
	} else {
		points.push([pos.x, pos.y]); // adds it to points
	}
	
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


function draw() {
	// Start Button
	ctx.beginPath();
	ctx.rect(20, 10, 80, 100);
	ctx.fillStyle = "#BF565A";
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(40, 20);
	ctx.lineTo(90, 55);
	ctx.lineTo(40, 95);
	ctx.lineTo(40, 20);
	ctx.fillStyle = '#800000';
	ctx.fill();
	ctx.strokeStyle = 'black';
	ctx.stroke();

	for (let i = 0; i < points.length; i++) {
		drawPoint(points[i][0], points[i][1]);
	}

	for (let i = 0; i < points.length - 1; i++) {
		drawLine(points[i][0], points[i][1], points[i+1][0], points[i+1][1]);
	}
}


function getPoints(x0, y0, x1, y1) {
	let subPoints = []
	for (let t = 0; t <= 1; t+= 0.01) {
		ctx.beginPath();
		let x = (1-t) * x0 + t * x1;
		let y = (1-t) * y0 + t * y1;
		subPoints.push([x, y]);
	}
	return subPoints;
}


function makeCurve() {
	let allPoints = [];
	for (let i = 0; i < points.length - 1; i++) {
		allPoints.push(getPoints(points[0+i][0], points[0+i][1], points[1+i][0], points[1+i][1]));
		for (let j = 0; j < allPoints[i].length; j++) {
			ctx.arc(allPoints[i][j][0], allPoints[i][j][1], 1, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'black';
			ctx.fill();
			ctx.lineWidth = 3;
			ctx.strokeStyle = 'black';
			ctx.stroke();
		}
	}
}


function main () {
	// Main loop
    function gameLoop () {
		draw();

		window.requestAnimationFrame(gameLoop, canvas); // Loops it
        
    }

    window.requestAnimationFrame(gameLoop, canvas); // Starts loop
}

window.addEventListener("mousedown", makePoint, false);
main();
var canvas = document.getElementById("canvas"); // Gets canvas
const ctx = canvas.getContext("2d"); // Gets context
// Sets Width and Height
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var points = [];
ctx.fillStyle = '#add8e6';
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
var showDetail = false;


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
		points.push({x:pos.x, y:pos.y}); // adds it to points
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
		drawPoint(points[i].x, points[i].y);
	}

	for (let i = 0; i < points.length - 1; i++) {
		drawLine(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
	}
}


function getPoint(t, sPoints) {
	let subPoints = [];
	if (sPoints.length > 1) {
		for (let i = 0; i < sPoints.length - 1; i++) {
			let x = sPoints[i].x + t * (sPoints[i + 1].x - sPoints[i].x);
			let y = sPoints[i].y + t * (sPoints[i + 1].y - sPoints[i].y);

			subPoints.push({x: x, y: y});
		}

		return getPoint(t, subPoints);
	} else {
		return sPoints[0];
	}

}


function makeCurve() {
	let BPoints = [];
	for (let t = 0; t < 1; t += 0.001) {
		BPoints.push(getPoint(t, points))
	}

	for (let i = 0; i < BPoints.length; i++) {
		ctx.beginPath();
		ctx.arc(BPoints[i].x, BPoints[i].y, 1, 0, 2 * Math.PI, false);
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'black';
		ctx.stroke();
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
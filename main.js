var canvas = document.getElementById("canvas"); // Gets canvas
const ctx = canvas.getContext("2d"); // Gets context
// Sets Width and Height
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var points = []; // User created points
var showCurve = false; // Bezier-Curve toggle (TODO)
var BPoints = []; // Points in Bezier Curve


// Handles mouseDown
function mouseDownHandler(e) {
	// Function to get mouse position
	let getMousePos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
	};

	let pos = getMousePos(canvas, e); // Gets mouse position
	if (e.which === 1) {
		if (pos.x > 20 && pos.y > 10 && pos.x < 100 && pos.y < 110) {
			// If start button is clicked, make curve
			BPoints = makeCurve();
		} else {
			// Else, adds mouse pos as a point
			points.push({x:pos.x, y:pos.y});
		}
	} else {
		for (let i = 0; i < points.length; i++) {
			if (pointInCircle(pos, points[i], 5)) {
				points.splice(i, 1)
				break
			}
		}
	}
}



// Checks if a point is in a circle
function pointInCircle(p1, p2, r) {
	return ((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) <= r * r); // Distance formula squared (so it's faster)
}


// Draw a point
function drawPoint(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'black';
	ctx.stroke();
}


// Draws a line
function drawLine(x1, y1, x2, y2) {
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';

	ctx.beginPath();
	ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


// Draws everything else
function draw() {
	// Background
	ctx.fillStyle = '#add8e6';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	// Start Button
	ctx.beginPath();
	ctx.rect(20, 10, 80, 100);
	ctx.fillStyle = "#BF565A";
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();

	// Start Button Box
	ctx.beginPath();
	ctx.moveTo(40, 20);
	ctx.lineTo(90, 55);
	ctx.lineTo(40, 95);
	ctx.lineTo(40, 20);
	ctx.fillStyle = '#800000';
	ctx.fill();
	ctx.strokeStyle = 'black';
	ctx.stroke();

	// Draws User Points
	for (let i = 0; i < points.length; i++) {
		drawPoint(points[i].x, points[i].y);
	}

	//Draws lines between points
	for (let i = 0; i < points.length - 1; i++) {
		drawLine(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
	}

	// Draws Bezier Curve
	for (let i = 0; i < BPoints.length - 1; i++) {
		ctx.beginPath();
		ctx.arc(BPoints[i].x, BPoints[i].y, 1, 0, 2 * Math.PI, false);
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'black';
		ctx.stroke();
	}
}


// Recursive function to get bezier curve points
function getPoint(t, sPoints) {
	let subPoints = [];
	if (sPoints.length > 1) {
		// Finds points for all lines made with points given
		for (let i = 0; i < sPoints.length - 1; i++) {

			// Bezier Formula: P0 + t(P1 - P0)
			let x = sPoints[i].x + t * (sPoints[i + 1].x - sPoints[i].x);
			let y = sPoints[i].y + t * (sPoints[i + 1].y - sPoints[i].y);

			// Adds to subpoints
			subPoints.push({x: x, y: y});
		}

		// passes subPoints for next points and recursion will give final point
		return getPoint(t, subPoints);
	} else {

		// This is the final point
		return sPoints[0];
	}

}


// Makes the Bezier Curve
function makeCurve() {
	somePoints = []; // idk

	// Gets all points for t and stores in somePoints
	for (let t = 0; t < 1; t += 0.001) {
		somePoints.push(getPoint(t, points))
	}
	return somePoints;
}


function main () {
	// Main loop
    function gameLoop () {
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		draw();

		window.requestAnimationFrame(gameLoop, canvas); // Loops it
        
    }

    window.requestAnimationFrame(gameLoop, canvas); // Starts loop
}

window.addEventListener("mousedown", mouseDownHandler, false); 
main();
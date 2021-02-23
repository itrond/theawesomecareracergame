
var MAX_SPEED = 3;

var roadAndGutter = new Path(
    [100, 700],
    [1050, 600],
    [1000, 150],
    [800, 100],
    [180, 100],
    [190, 400]
);
roadAndGutter.strokeColor = "black";
roadAndGutter.strokeWidth = "70";

roadAndGutter.closed = true;
roadAndGutter.smooth();

var road = roadAndGutter.clone();
road.strokeColor = "lightGrey";
road.strokeWidth = "66";

var yellowLine = road.clone();
yellowLine.strokeColor = "yellow";
yellowLine.strokeWidth = "4";
yellowLine.dashArray = [10, 12];


var carBody = new Path(
    [0, 2],
    [40, 2],
    [40, 20],
    [0, 20]
);
carBody.applyMatrix = false;
carBody.strokeColor = "red";
carBody.strokeWidth = "1";
carBody.fillColor = "lightblue";
carBody.strokeJoin = "round";
carBody.closed = true;


var wheelFL = new Path(
    [35, 0],
    [35, 4],
    [30, 4],
    [30, 0]
);
wheelFL.applyMatrix = false;
wheelFL.strokeColor = "black";
wheelFL.fillColor = "black";
wheelFL.strokeWidth = "2";
wheelFL.selected = false;
wheelFL.close = true;

var wheelFR = wheelFL.clone();
wheelFR.position += new Point(0, 18);

var wheelRL = wheelFL.clone();
wheelRL.position += new Point(-23, 0);

var wheelRR = wheelFL.clone();
wheelRR.position += new Point(-23, 18);



var car = new Group([carBody, wheelFL, wheelFR, wheelRL, wheelRR]);
car.applyMatrix = false;

car.position = new Point(100, 700);



var competition = car.clone();
competition.fillColor = "lightgreen";




var carVector = new Point(0, 0) + new Point(1, 0);
carVector.length = 1;



//roadLayer.addItem(road);

// On each frame...
function onFrame(event) {

    if (Key.isDown("left")) {
        carVector = carVector.rotate(-1);
        car.rotate(-1);
    }
    if (Key.isDown("right")) {

        carVector = carVector.rotate(1);
        car.rotate(1);
    }
    if ((Key.isDown("up") || Key.isDown("q"))
        && carVector.length < MAX_SPEED)
        carVector.length += 0.1;
    if ((Key.isDown("down") || Key.isDown("a"))
        && carVector.length > 1)
        carVector.length -= 0.1;



    car.position += carVector;



    // ...calculate the time of the animation between 0 and 1... 
    var slowness = 2000;
    var time = event.count % slowness / slowness;
    // ...and move the boat.
    moveCompetior(time);
}




function moveCompetior(time) {
    // Calculate the offset relatively to the road length.
    var offset = time * road.length;
    // Get point to position the boat.
    var point = road.getPointAt(offset);
    // Get tangent vector at this point.
    var tangent = road.getTangentAt(offset);
    // Move boat.
    competition.position = point; // new Point(300, 200); // point;
    // Rotate boat.
    competition.rotation = tangent.angle; //keyAngle; // tangent.angle;


    //    updateBoat(boat.rotation);



}




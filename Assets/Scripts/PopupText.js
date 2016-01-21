#pragma strict

// Movement speed in units/sec.
private var speed:Number = 50.0;

// Time when the movement started.
private var startTime:Number;
private var startPosition:Vector3;
private var endPosition:Vector3;

// Total distance between the markers.
private var journeyLength:Number = 50;	

private var maxTravelTime:Number = speed / journeyLength;

function Initialize(parent:Transform, text:String, startVector:Vector3) {
	this.transform.parent = parent;
	this.transform.localPosition = startVector;
	startPosition = startVector;
	endPosition = startVector;
	endPosition.y += journeyLength;
	// Keep a note of the time the movement started.
	startTime = Time.time;
}

function Start() {
}

// Follows the target position like with a spring
function Update () {
	// Distance moved = time * speed.
	var distCovered = (Time.time - startTime) * speed;
	
	// Fraction of journey completed = current distance divided by total distance.
	var fracJourney = distCovered / journeyLength;
	
	// Set our position as a fraction of the distance between the markers.
	transform.position = Vector3.Lerp(startPosition, endPosition, fracJourney);
}
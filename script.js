status = "";
objects = [];
function preload() {
    alarm = loadSound("alarm_r.mp3");
}
function setup() {
    canvas = createCanvas(640, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function draw() {
    image(video, 0, 0, 640, 500);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].label == "person") {
                alarm.stop();
                document.getElementById("status").innerHTML = "Status: Object Detected";
                document.getElementById("is_baby_there").innerHTML = "Baby Found";
            } else {
                alarm.play();
                document.getElementById("status").innerHTML = "Status: No Objects Detected";
                document.getElementById("is_baby_there").innerHTML = "Baby Not In Room";
            }
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
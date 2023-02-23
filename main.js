
objects = [];
Status = "";
video = "";

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
}

function preload() {
  video = createVideo('video.mp4');
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 380, 380);
  if(Status != ""){

  
  objectDetector.detect(video,gotResult);
  for(i = 0; i < objects.length; i++){
    document.getElementById("status").innerHTML = "status : object detected";
    document.getElementById("number_of_objects").innerHTML = "number of objects detected are " + objects.length;

    fill("#FF0000");
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
    noFill();
    stroke("#FF0000");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
  }
  } 
}
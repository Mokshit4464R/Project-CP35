//variables

var ballon,balloonImage1,balloonImage2;
var database, position;



function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }



function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  //ballon
  ballon=createSprite(250,450,150,150);
  ballon.addAnimation("hotAirBalloon",balloonImage1);
  ballon.scale=0.5;

  textSize(20); 

  var ballonPosition = database.ref("Ballon/Position");
    ballonPosition.on("value", readPosition, showError);
}

function draw() {

  background(bg);

  //movement
  if(keyDown(LEFT_ARROW)){
    ballon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
    ballon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    ballon.addAnimation ("hotAirBalloon", balloonImage2);
    ballon.scale=ballon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,10);
    ballon.addAnimation("hotAirBalloon",balloonImage2);
    ballon.scale=ballon.scale +0.005;
  }

  drawSprites();

  //text
  fill("red");
  stroke("white");
  textSize(25);
  text("/Use arrow keys to move the Hot Air Balloon!",40,40);
}

//Functions
function readPosition(data){
  Position = data.val();
  ballon.x = Position.x
  ballon.y = Position.y
}

function writePosition(x,y){
database.ref("Ballon/Position").set({
  "x": Position.x+x,
  "y": Position.y+y
})
}

function showError(){
  console.log("error :")
}

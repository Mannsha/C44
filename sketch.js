var runner;
var gameState;
var obstacles;
var playButton;
var frames;
var ground1, ground2;
var banana;
var slowDown, cloak, shoot;


//speed

function setup() {
  frames = 100;

  var canvas = createCanvas(400, 400);

  //the center of the sprite goes to coordinates listed
  runner = new Player(200, 200, 20, 20, "blue", 0, 0);
  ground1 = createSprite(200, 390, 800, 20);
  ground2 = createSprite(200, 10, 800, 20);

  //add starting gamestate (0) later, 1 is in play, and 2 is end
  gameState = 0;

  //creating the group
  obstacles = new Group();

  if (gameState === 0) {
    start();
  } 
}

function draw() {
  background(0);

  if (gameState === 1) {
    play();
  } else {
    if (gameState === 2) {
      end();
    }
  }

  //drawSprites();
}

//start function

function start() {

  //initializing button
  playButton = createButton("play");
  playButton.position(174, 200);

  playButton.mousePressed(() => {
    gameState = 1;
  });
}

function play() {
  playButton.hide();

  //movement
  runner.display();

  if (keyDown(UP_ARROW) && runner.sprite.y > 0) {
    runner.velocityY = -3;
  }

  if (keyDown(DOWN_ARROW)) {
    runner.velocityY = 3;
  }

  //every 100 frames, the frame speed will decrease
  if (frameCount % 100 === 0) {
    if (frames === 1) {
      //once the frame rate reaches 1, set the frame speed to 1
      //this way the game will never end, or you can make the game end at 1
      frames = 1;
    } else {
      frames = frames - 1;
    }
  }
  //gravity: runner.velocityY = runner.velocityY + 0.5;
  runner.sprite.collide(ground1);
  runner.sprite.collide(ground2);

  /*scroll
  ground.x = ground.x - 5;

  if (ground.x < 0) {
    ground.x = 200;
  }
*/
  makeObstacles();

  
  

  if (frameCount % (frames + 10) === 0) {
    powerUps();
  }

  drawSprites();
}





function end() {}

function makeObstacles() {
  
  //this creates the monsters FASTER, it does not change the SPEED of the monsters
  if (frameCount % frames === 0) {
    monster = new Obstacles(
      400,
      random(20, 380),
      15,
      15,
      "red",
      1,
      random(-1, 1)
    );
    obstacles.add(monster.sprite);
    monster.sprite.velocityX = -5;

    
    console.log(monster.sprite.velocityX)
  }
}


function powerUps() {
  var num = random(1, 1);

  if (num === 1) {
    slowDownBoost();
  } else {
    if (num === 2) {
      cloakBoost();
    } else {
      if (num === 3) {
        shootBoost();
      }
    }
  }
}
 

function slowDownBoost() {
  slowDown = new Player(400, random(20,380),100,100,"red",-6,0)
  slowDown.display()

  if(slowDown.sprite.overlap(runner.sprite))
  {
    console.log("yes")

    obstacles.setVelocityXEach(-3)
    setTimeout(monsterReset(),15000)


  }
 



}

function cloakBoost()
{
  if(monster.sprite.x<runner.sprite.x )
  {

  }

}

function monsterReset()
{
  obstacles.setVelocityXEach(-5)
}
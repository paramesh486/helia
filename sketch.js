var bulletG, jetG, heliG, jetG2;
var gameState = "play";
var score=0
function preload() {
  backgroundI = loadImage("backgorund.jpg");
  heliI = loadImage("Helicopter.gif");
  jetI = loadImage("Jetimage.png");
  jet2I = loadImage("jet2.png");
  restarti = loadImage("restarticon.jpg");
  
  dieS = loadSound("die.mp3");
  jumpS = loadSound("jump.mp3");
}

function setup() {
  createCanvas(500, 500);
  back = createSprite(300, 250, 700, 500);
  back.addImage(backgroundI);
  back.scale = 1.4;
  heliG = createGroup();
  heli = createSprite(100, 200, 50, 60);
  heli.addImage(heliI);
  heli.scale = 0.3;
  restart = createSprite(250, 250, 50, 50);
  restart.addImage(restarti);
  restart.scale = 0.3;
  gameOver = createSprite(250, 130, 50, 50);
  
  gameOver.scale = 0.3;
  bulletG = createGroup();
  jetG = createGroup();
  jetG2 = createGroup();
}

function draw() {
  background("purple");
  drawSprites();
 edges=createEdgeSprites()
 
  if (gameState == "play") {
    createOb();
    jetMaker();
     textSize(40)
  fill("lime")
  text("score="+score,350,50)
    heli.collide(edges)
    restart.visible = false;
    gameOver.visible = false;
    back.velocityX = -5;
    if (back.x < 100) {
      back.x = 400;
    }
    if (keyDown(UP_ARROW)) {
      heli.y = heli.y - 10;
    }
    if (keyDown(DOWN_ARROW)) {
      heli.y = heli.y + 10;
    }
    if (keyWentDown(RIGHT_ARROW)) {
      var bullet1 = createSprite(heli.x, heli.y, 7, 4);
      var bullet2 = createSprite(heli.x + 50, heli.y, 7, 4);
      bullet1.lifetime = 50;
      bullet2.liftime = 50;
      bulletG.add(bullet1);
      bulletG.add(bullet2);
      jumpS.play();
      bulletG.setVelocityXEach(15);
      //bulletG.x=rocket.x
    }
    if (bulletG.isTouching(jetG)) {
      jetG.destroyEach();
      score+=1
    }
    if (bulletG.isTouching(jetG2)) {
      jetG2.destroyEach();
       score+=1
    }
    if (heli.isTouching(jetG)) {
      heli.visible = false;
      dieS.play();
      gameState = "end";
    }
    if (heli.isTouching(jetG2)) {
      heli.visible = false;
      dieS.play();
      gameState = "end";
    }
  }
  if (gameState == "end") {
    back.velocityX = 0;
    gameOver.visible = true;
    if (mousePressedOver(restart)) {
      gameState = "restart";
      restart.visible = true;
    }
    restart.visible = true;
  }
  if (gameState == "restart") {
    restart.visible = false;
    gameOver.visible = false;
    heli.visible = true;
    jetG.destroyEach();
    jetG2.destroyEach();
    gameState = "play";
    score=0
  }

  
}

function createOb() {
  if (frameCount % 50 == 0) {
    jet = createSprite(700, random(30, 570), 50, 60);
    jet.addImage(jetI);
    jet.scale = 0.3;
    jet.velocityX = -7;
    jet.debug = true;
    jet.setCollider("rectangle", 0, 0, 320, 80);
    jet.lifetime = 250;
    jetG.add(jet);
  }
}
function jetMaker() {
  if (frameCount % 40 == 0) {
    jet2 = createSprite(700, random(30, 570), 50, 60);
    jet2.addImage(jet2I);
    jet2.scale = 0.3;
    jet2.velocityX = -7;
    jet2.lifetime = 250;
    jet2.debug = true;
    jet2.setCollider("rectangle", 0, 0, 320, 80);
    jetG2.add(jet2);
  }
}

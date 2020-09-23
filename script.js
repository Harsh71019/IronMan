var gameState = "PLAY";
var diamondScore = 0;
var gameOver, restart;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImage = loadImage("images/iron.png");
  platformImage = loadImage("images/platform.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
}

//  Controllers

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  ironMan = createSprite(200, 505, 20, 50);
  ironMan.addImage("running", ironImage);
  ironMan.scale = 0.3;
  ground = createSprite(200, 585, 400, 10);
  ground.visible = false;
  bricksGroup = new Group();
  diamondsGroup = new Group();
  spikesGroup = new Group();
  //gameStarted = false;
}

function draw() {
  background(247, 239, 231);

  generatePlatforms();

  if (keyDown("up")) {
    ironMan.velocityY = -10;
  }
  if (keyDown("left")) {
    ironMan.x = ironMan.x - 5;
  }
  if (keyDown("right")) {
    ironMan.x = ironMan.x + 5;
  }
  ironMan.velocityY = ironMan.velocityY + 0.5;

  for (var i = 0; i < bricksGroup.length; i++) {
    var temp = bricksGroup.get(i);

    if (temp.isTouching(ironMan)) {
      ironMan.collide(temp);
    }
  }
  drawSprites();
  generateDiamonds();
  generateSpikes();
  //  }
}

function generatePlatforms() {
  if (frameCount % 70 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 450);
    brick.addImage(platformImage);
    brick.scale = 0.5;
    brick.velocityY = 5;

    brick.lifetime = 250;
    bricksGroup.add(brick);
  }
}

function generateDiamonds() {
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200, 120, 40, 10);

    diamond.addAnimation("diamond", diamondImage);
    diamond.x = Math.round(random(80, 350));
    diamond.scale = 0.5;
    diamond.velocityY = 3;
    diamond.lifetime = 1200;
    diamondsGroup.add(diamond);
  }
}

function generateSpikes() {
  if (frameCount % 100 === 0) {
    var spikes = createSprite(1200, 90, 10, 40);

    spikes.addAnimation("spike", spikeImage);
    spikes.x = Math.round(random(50, 450));
    spikes.scale = 0.5;
    spikes.velocityY = 3;
    spikes.lifetime = 1200;
    spikesGroup.add(spikes);
  }
}

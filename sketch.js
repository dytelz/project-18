var banana, bananaImg, bananaGroup, obstacle, obstacleImg, obstacleGroup, score;
var monkey, monkeyImg;
var jungle,jungleImg;
var invisibleGround;

function preload() {
  bananaImg = loadImage("banana.png");
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  obstacleImg = loadImage("stone.png");
  jungleImg = loadImage("jungle.jpg");
}


function setup() {
  createCanvas(500, 300);
  
  //creating jungle
  jungle = createSprite(0,90,0,0);
  jungle.addImage("jungle",jungleImg);
  jungle.velocityX = -10;
  
  //creating the monkey
  monkey = createSprite(50,230);
  monkey.addAnimation("monkey",monkeyImg);
  monkey.scale = 0.13;
  
  invisibleGround = createSprite(250,277,500,20);
  invisibleGround.visible = false;
  
  score = 0;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(220);
  
  //infinite ground
  if (jungle.x < 0) {
    jungle.x = jungle.width /2; 
  }
  
  //makes monkey stand on ground

  monkey.velocityY = 2;
  
  //makes monkey jump
  if (keyDown("space") && monkey.y > 100) {
     monkey.velocityY = -8;
     }
  
  //bananas and obstacles
  spawnBanana();
  spawnObstacle();
  
    monkey.collide (invisibleGround);
  
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 5;
  }
  
  if (monkey.isTouching(obstacleGroup)) {
    score = score - 5;
  }
    
  switch(score) {
    case 10: monkey.scale=0.22;
         break;
    case 20: monkey.scale=0.24;
         break;
    case 30: monkey.scale=0.26;
         break;
    case 40: monkey.scale=0.28;
         break;
    case 50: monkey.scale=0.3;
         break;
    default: break;
  }
  drawSprites();
  
  fill("white");
  textSize(20);
  text("Score: " + score, 300, 50);
}

function spawnBanana() {
  if (frameCount % 80 === 0){
    banana = createSprite(500,160);
    banana.addImage(bananaImg);
    banana.y = Math.round(random (60,160));
    banana.scale = 0.05;
    banana.velocityX = -10;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }  
}

function spawnObstacle () {
 if (frameCount % 100 === 0) {
    obstacle = createSprite(500,240);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.velocityX = -10;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
     }
}
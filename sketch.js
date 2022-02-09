var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOverImg,boy_collided, donaSound;

//Game States (estados del juego)
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("nubes1.png");
  boyImg = loadAnimation("homero1.png","homero1.png");
  cashImg = loadImage("kryspi.png");
  diamondsImg = loadImage("kryspi.png");
  jwelleryImg = loadImage("kryspi.png");
  swordImg = loadImage("duff3.jpg");
  boy_collided = loadAnimation("homero5.png");
  gameOverImg = loadImage("donafinal.jpg")
  donaSound = loadSound("theme.wav");

 

}

function setup(){
  
  createCanvas(400,600);

  donaSound.loop();

//Mover fondo
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 2;
path.scale=0.4;


//crear sprite boy (niño) corriendo
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=.4;
boy.addAnimation("collided",boy_collided);
//boy.scale=0.03;

gameOver = createSprite(200,300);
gameOver.scale = 0.6;

gameOver.addImage(gameOverImg);

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();


}

function draw() {
  gameOver.visible = false

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar el fondo
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        gameOver.visible = true;

        boy.changeAnimation("collided", boy_collided);

        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(18);
  fill(0);
  text("Donas: "+ treasureCollection,50,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.05;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.05;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.05;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.2;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

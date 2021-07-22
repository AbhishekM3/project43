var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score =  0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  b_i = loadImage("banana.png")
  o_i = loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group();
  enemyGroup = new Group ();
  
  
}

function draw() { 
  background(backImage);

  stroke("black")
  textSize(20)
  fill("black")
  text("score: "+score,100,60)
  

  if(gameState===PLAY){

    Fruits();
    stones();
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if(foodGroup.isTouching(player)){
     
    foodGroup.destroyEach();
    score++
    player.scale += 0.1;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(enemyGroup.isTouching(player)){
      gameState = END;
    }

  }

  if(gameState === END){

    foodGroup.destroyEach();
    enemyGroup.destroyEach();
    player.visible = false;
   
    
    foodGroup.velocityX = 0;
    enemyGroup.velocityX = 0;
   
    textSize(30);
    fill(255);
    text("Game Over!",300,220)
 
    
  }

  drawSprites();
}

function Fruits(){
   
  if(frameCount%80 === 0){
    
    var banana = createSprite(400,200,20,20);
        banana.addImage(b_i);
        banana.y = Math.round(random(120,200));
        banana.velocityX = -4;
        banana.lifetime = 300
        banana.scale = 0.05;
        banana.lifetime = 300;
        player.depth = banana.depth+1;
        foodGroup.add(banana);  
  }
     
}

 function stones(){
   
   if(frameCount%300 === 0){
     
     var obstacle = createSprite(400,330,20,20);
         obstacle.addImage(o_i);
         obstacle.velocityX = -(5+score/4);
         obstacle.lifetime = 300;      
         obstacle.scale = 0.2;
     
     
         enemyGroup.add(obstacle);
     
     
     
   }
   
 }

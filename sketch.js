
var monkey , monkey_running,stopMonkey
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  stopMonkey=loadImage("sprite_0.png")
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  
  score=0
}




function setup() {


  var survivalTime=0;
  
 
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);

   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-6;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(255);
   

    monkey .setCollider("circle",10,100,200 );
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
   
    if(keyDown("space")&&monkey.y>310) {
      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY +  0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1); 
    
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/50) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(150,200);    
    banana.velocityX = -5;
    
 
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
   
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
 
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 230 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    
    obstacle.lifetime = 300;
    

    obstaclesGroup.add(obstacle);
  }
}

var PLAY = 1;
var END = 0;
var gameState = 1;
var mon,mon_img;
var survivalTime=0;
var monkey , monkey_running;
var banana ,bananaImage, rocks, rocksImage;
var FoodGroup, rocksGroup;
var score =0;
var gravity;
var end,end_img;
function preload(){
  
  end_img = loadImage ("Arcade_Sona_Game_Over_icon.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rocksImage = loadImage("obstacle.png");
  mon_img = loadImage("sprite_1.png");
}



function setup() {
  monkey=createSprite(77,316,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  monkey.velocityY=12;
  ground=createSprite(400,350,900,10);
  ground.velcityX=4;
  end = createSprite(200,200,10,10);
  end.addImage(end_img);
  end.visible = false;
  mon = createSprite(77,316,10,10);
  mon.scale=0.1;
  mon.addImage(mon_img);
  mon.visible = false;
  foodGroup = createGroup();
  rocksGroup = createGroup();
}


function draw() {
  background("white");
  
  drawSprites();
  if (gameState === PLAY){
   rocks(); 
   bananas();
    monkey.visible=true;
    mon.visible=false;
    end.visible=false;
  if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+1;
  }
    
  if (keyWentDown("space")){
  monkey.velocityY=-7; 
  }
    
  if (keyWentUp("space")){
  monkey.velocityY=7;  
  }
  
    fill("black");
    textSize(20)
  survivalTime = Math.ceil(frameCount/frameRate())
  text ("Survival Time:"+ survivalTime,240,20);
  } 
  
  if(rocksGroup.isTouching(monkey)){
    rocksGroup.destroyEach();  
     monkey.visible=false;
     foodGroup.destroyEach();
    gameState=END;
  }
  
  if (gameState === END){
  textSize(20);
  text("Press R To Restart",120,150);
//  FoodGroup.setVelocityXEach(0);
  score=0;
  survivalTime=0;
  //  framecount=0;
  if (keyDown("r")){
  gameState = PLAY;  
  }
  mon.visible = true;  
  end.visible = true;
  }
  textSize(19); 
  fill("black");
  text ("Banana Collected:"+score,10,20);
  monkey.collide(ground);
}



function rocks(){
 if (frameCount % 300 === 0) {
 rock = createSprite(390,330,10,10);
 rock.setCollider("rectangle",10,10,7,7);
 rock.debug=true;       
 rock.addImage(rocksImage);
 rock.scale = 0.1;
 rock.velocityX = -4;
 rocksGroup.add(rock);
 }
}

function bananas(){
 if (frameCount % 80 === 0) {
 banana = createSprite(200,200,10,10);
 banana.addImage(bananaImage);
 banana.scale=0.1
 banana.velocityX=-2;
 banana.y = Math.round(random(250,100))
 foodGroup.add(banana);
 }
}



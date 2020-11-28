class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1Image);
    car2 = createSprite(300,200);
    car2.addImage(car2Image);
    car3 = createSprite(500,200);
    car3.addImage(car3Image);
    car4 = createSprite(700,200);
    car4.addImage(car4Image);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(0);
      image(trackImage,0,0,4000,850);

      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y=20;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y =y + 150;
        //use data form the database to display the cars in y direction
        x = allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;


        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);

          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
         camera.position.x = cars[index-1].x
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
}
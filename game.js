export class Game extends Phaser.Scene{
	
	constructor(){
		super({key : "game"});
	}


	preload(){
		this.load.image("star", "ball.gif");
		this.load.image("ball", "ball.png");
		this.load.image("platform", "square2.png");
		this.load.image("limits", "platform.png");
		this.load.image("sky", "sky.png");
		this.load.image("bomb", "bomb.png");
		this.load.image("final", "final.png");

	}


	create(){


		this.add.image(400,250,"sky");

		this.physics.world.setBoundsCollision(false, false, true, true);





		this.star = this.physics.add.sprite(30,200,"star").setScale(0.9);
		this.star.setCollideWorldBounds(true);


		this.ball = this.physics.add.sprite(30,300, "ball");
		this.ball.setCollideWorldBounds(true);


		this.physics.add.collider(this.ball, this.star);






		this.bombsRed = this.physics.add.group({
            key: 'bomb',
            repeat: 20,
            setXY: { 
            	x: Phaser.Math.Between(3000, 4000), 
            	y: Phaser.Math.Between(200, 250),
            	stepX: 700
            }
         });


		 this.bombsGreen = this.physics.add.group({
            key: 'bomb',
            repeat: 20,
            setXY: { 
            	x: Phaser.Math.Between(3000, 4000), 
            	y: Phaser.Math.Between(200, 250),
            	stepX: 700
            }
         });

		let bombVelocity = 1000;

		  this.bombsRed.children.iterate(function (child) {
		  		child.setCollideWorldBounds(true);
                child.setVelocity(-5, bombVelocity);
                child.setBounce(0.8);
                child.setTint(0xff0000);

            });


			this.bombsGreen.children.iterate(function (child) {
				child.setCollideWorldBounds(true);
			  child.setVelocity(-5, bombVelocity);
			  child.setBounce(0.8);
			  child.setTint(0x43500);

		  });

		  this.physics.add.collider(this.bombsRed, this.bombsRed);

		  

  		this.physics.add.collider(this.ball, this.bombsRed,()=>{alert("THE RED IS THE WINNER"); this.scene.start("game")},null, this);
		this.physics.add.collider(this.star, this.bombsRed);
		  

		this.physics.add.collider(this.ball, this.bombsGreen);
		this.physics.add.collider(this.star, this.bombsGreen, ()=>{alert("THE GREEN IS THE WINNER"); this.scene.start("game")},null, this);


		  this.group1 = this.physics.add.group({
		  	setScale : {x:0.8, y:0.8},
		  	key : "platform",
		  	frameQuantity: Phaser.Math.Between(200, 300),
		  	gridAlign : {
  		        width: Phaser.Math.Between(50, 100), 
		        height: Phaser.Math.Between(50, 100), 
        		cellWidth: Phaser.Math.Between(200, 250), 
       			cellHeight: Phaser.Math.Between(50, 100), 
        		x: Phaser.Math.Between(1000, 1500), 
        		y: Phaser.Math.Between(0, 300)
		  	}
		  })

		  this.group1.setVelocityX(-100);

		  this.group1.children.iterate(function (child) {
			   child.setImmovable();
		});
				


			this.physics.add.collider(this.group1, this.star, ()=>{this.starVelocityX = 20},null,this);
			this.physics.add.collider(this.group1, this.ball, ()=>{this.ballVelocityX = 20},null,this);

		this.counter = 20;




		this.platform = this.physics.add.group({
		  	setScale : {x:1, y:1},
		  	key : "platform",
		  	frameQuantity: Phaser.Math.Between(60, 250),
		  	gridAlign : {
  		        width: Phaser.Math.Between(200, 350), 
		        height: Phaser.Math.Between(50, 100), 
        		cellWidth: Phaser.Math.Between(100, 250), 
       			cellHeight: Phaser.Math.Between(70, 100), 
        		x: Phaser.Math.Between(1500, 2500), 
        		y: Phaser.Math.Between(0, 300)
		  	}
		});



		  this.platform.setVelocityX(-100);

		  this.platform.children.iterate(function (child) {
			   child.setImmovable();
			   child.y = Phaser.Math.Between(0, 500);
		});


			this.physics.add.collider(this.platform, this.star, ()=>{this.starVelocityX = 20},null,this);
			this.physics.add.collider(this.platform, this.ball, ()=>{this.ballVelocityX = 20},null,this);
			this.physics.add.collider(this.bombsRed, this.platform);
			this.physics.add.collider(this.bombsGreen, this.platform);
			this.physics.add.collider(this.bombsRed, this.group1);
			this.physics.add.collider(this.bombsGreen, this.group1);
			
			this.physics.add.collider(this.platform, this.group1, (platform, group)=>{
				
				group.y = Phaser.Math.Between(200, 400);
				platform.y = Phaser.Math.Between(200, 400);

			}, null, this);


			this.platformVelocity = -100;




		this.limitsUp = this.physics.add.sprite(0, -100, "limits").setImmovable().setScale(10);
		this.physics.add.collider(this.limitsUp, this.star,()=>{this.starVelocityX = 10},null,this);
		this.physics.add.collider(this.limitsUp, this.ball,()=>{this.ballVelocityX = 10},null,this);








		this.limitsDown = this.physics.add.sprite(0, 600, "limits").setImmovable().setScale(10);
		this.physics.add.collider(this.limitsDown, this.star,()=>{this.starVelocityX = 10},null,this);
		this.physics.add.collider(this.limitsDown, this.ball,()=>{this.ballVelocityX = 10},null,this);







  		this.physics.add.collider(this.bombsRed, this.limitsUp);
  		this.physics.add.collider(this.bombsRed, this.limitsDown);

  		this.physics.add.collider(this.bombsGreen, this.limitsUp);
  		this.physics.add.collider(this.bombsGreen, this.limitsDown);






		this.manipulatedStar = 300;
		this.starVelocityX = 0;
		this.star.setVelocityY(200);
		this.touchingLeft = false;


		this.manipulatedBall = 300;
		this.ballVelocityX = 0;
		this.ball.setVelocityY(200);


		this.cursors = this.input.keyboard.createCursorKeys();
		console.log(this.cursors);





		this.final = this.physics.add.sprite(18000, 200, "final").setScale(5, 2);
		this.final.setVelocityX(-100);
 		

 		this.physics.add.collider(this.star, this.final,()=>{
 		//	alert("THE STAR IS THE WINNER");
 			this.scene.start("game");
 		}, null, this);


 		this.physics.add.collider(this.ball, this.final, ()=>{
 		//	alert("THE BALL IS THE WINNER");
 			this.scene.start("game");
 		}, null, this);






}


	update(){



		this.star.setVelocityY(this.manipulatedStar);
		this.star.setVelocityX(this.starVelocityX);

		this.ball.setVelocityY(this.manipulatedBall);
		this.ball.setVelocityX(this.ballVelocityX);

		this.platformVelocity -= 0.05;

		this.group1.setVelocityX(this.platformVelocity);
		this.platform.setVelocityX(this.platformVelocity);
		this.final.setVelocityX(this.platformVelocity);



		if (this.star.x < 20){
			this.scene.pause();
			if (this.star.x == this.ball.x){
			alert("YOU LOSE");
			this.scene.start("game");
			}else{
				alert("THE GREEN IS THE WINNER!!!");
				this.scene.start("game");
			}
		}

		/*if (this.ball.x < 20){
			this.scene.pause();
			alert("THE STAR IS THE WINNER!!!");
			this.scene.start("game");
		}
		*/



		if(this.cursors.space.isDown && this.star.body.touching.down){
			this.manipulatedStar *=	-1;
			this.star.setVelocityY(this.manipulatedStar);
			this.starVelocityX = 15;
			//this.star.setVelocityX(800);
		}
	

		else if(this.cursors.space.isDown && this.star.body.touching.up){
			this.manipulatedStar *=	-1;			
			this.star.setVelocityY(this.manipulatedStar);
			this.starVelocityX = 15;
			//this.star.setVelocityX(800);
		}

		if(this.star.body.touching.right){
			//this.starVelocityX = -100;
			this.touchingLeft = true;
		}

	




	if(this.cursors.up.isDown && this.ball.body.touching.down){
			this.manipulatedBall *=	-1;
			this.ball.setVelocityY(this.manipulatedBall);
			this.ballVelocityX = 15;
			//this.star.setVelocityX(800);
		}
	

		else if(this.cursors.up.isDown && this.ball.body.touching.up){
			this.manipulatedBall *=	-1;			
			this.ball.setVelocityY(this.manipulatedBall);
			this.ballVelocityX = 15;
		}

	



		if (this.ball.x > 600){
			this.ball.x = 600;
		}

		if (this.star.x > 600){
			this.star.x = 600;
		}





	}

}
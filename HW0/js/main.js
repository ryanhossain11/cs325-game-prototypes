"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        // Load an image and call it 'logo'.
        //game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image('background', 'assets/backgrounds/bg_snow.png')
        game.load.spritesheet('walkingChar', 'assets/sprites/character.png')
        game.load.image('car', 'assets/sprites/car.png')
        game.load.image('ball', 'assets/sprites/ball.png')
    }

    var bouncy;
    var carSprite;
    var background;

    var ballSprite;
    var numberOfLives;
    var numberOfLivesText
    var score;
    var scoreCountText;
    var gameOverText;
    var moveDownThisX; //have the  move down this X lane

    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //bouncy.anchor.setTo( 0.5, 0.5 );

        // Turn on the arcade physics engine for this sprite.
        //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.

        //hiding the game over text by displaying it off the screen, only solution i could think of


        background = game.add.image(60, 0, 'background');
        background.scale.x = 0.8;

        numberOfLives = 3;
        score = 0;

        var style = { font: "25px Verdana", fill: "#000000", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Dont get squished by SNOW!", style );
        numberOfLivesText = game.add.text( game.world.centerX - 280, 165, numberOfLives, style );
        numberOfLivesText.setText("Lives: " + numberOfLives);
        scoreCountText = game.add.text( game.world.centerX - 280, 200, score, style );
        scoreCountText.setText("Score: " + score);

        text.anchor.setTo( 0.5, 0.0 );

        carSprite = game.add.sprite(400, 600, 'car');
        game.physics.enable( carSprite, Phaser.Physics.ARCADE );
        carSprite.anchor.setTo(0.5, 1);
        carSprite.scale.setTo(0.08, 0.08);

        moveDownThisX = game.rnd.integerInRange(171, 570);
        ballSprite = game.add.sprite(moveDownThisX, 0, 'ball');
        //ballSprite.scale.setTo(2, 2);
        game.physics.enable( ballSprite, Phaser.Physics.ARCADE );
        ballSprite.anchor.setTo(0, 0);

        gameOverText = game.add.text( game.world.centerX, game.world.centerY, "You Is DEAD", style );

        gameOverText.visible = false;
    }

    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        if(numberOfLives > 0)
        {
          game.debug.inputInfo(350, 350);
          keepCarInBounds();
          ballStatus();
        }
        else
        {
            gameOverText.visible = true;
            ballSprite.kill();
            carSprite.kill();
        }
    }

    function keepCarInBounds()
    {
      if(carSprite.x > 200 && carSprite.x < 585)
      {
        game.physics.arcade.moveToXY(carSprite, game.input.mousePointer.x, 600, 300);
      }
      else if(carSprite.x >= 200)
      {
        game.physics.arcade.moveToXY(carSprite, 200, 600, 300);
      }
      else if(carSprite.x <= 585)
      {
        game.physics.arcade.moveToXY(carSprite, 585, 600, 300);
      }
    }

    //this function I got from this example https://phaser.io/examples/v2/text/update-text

    function decrementLives()
    {
      ballSprite.kill();
      spawnBall();
      numberOfLives--;

      numberOfLivesText.setText("Lives: " + numberOfLives);
    }

    function incrementScore()
    {
      score++;
      scoreCountText.setText("Score: " + score);
    }

    function spawnBall()
    {
      moveDownThisX = game.rnd.integerInRange(171, 570);
      ballSprite = game.add.sprite(moveDownThisX, 155, 'ball');
      game.physics.enable( ballSprite, Phaser.Physics.ARCADE );
      ballSprite.anchor.setTo(0, 0);
    }

    function ballStatus()
    {
      game.physics.arcade.collide(carSprite, ballSprite, decrementLives);

      if(ballSprite.y > 600)
      {
        ballSprite.kill();
        incrementScore(); //increment score as soon as ball passes player
        spawnBall();
      }

      game.physics.arcade.moveToXY(ballSprite, moveDownThisX, 800, 200);
    }
};

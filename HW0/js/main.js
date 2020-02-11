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
        game.load.image('background', 'assets/backgrounds/bg_highway.png')
        game.load.spritesheet('walkingChar', 'assets/sprites/character.png')
        game.load.image('car', 'assets/sprites/car.png')
        game.load.image('rock', 'assets/sprites/rock.png')
    }

    var bouncy;
    var carSprite;
    var background;
    var rockSprite;
    var numberOfLives;
    var numberOfLivesText
    var score;
    var scoreCountText;
    var gameOverText;
    var moveDownThisX; //have the rock move down this X lane

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

        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Dodge that rock!.", style );
        numberOfLivesText = game.add.text( game.world.centerX + 300, 15, numberOfLives, style );
        numberOfLivesText.setText("Lives: " + numberOfLives);
        scoreCountText = game.add.text( game.world.centerX + 280, 50, score, style );
        scoreCountText.setText("Score: " + score);

        text.anchor.setTo( 0.5, 0.0 );

        carSprite = game.add.sprite(400, 600, 'car');
        game.physics.enable( carSprite, Phaser.Physics.ARCADE );
        carSprite.anchor.setTo(0.5, 1);
        carSprite.scale.setTo(0.06, 0.06);

        moveDownThisX = game.rnd.integerInRange(171, 570);
        rockSprite = game.add.sprite(moveDownThisX, 0, 'rock');
        //rockSprite.scale.setTo(2, 2);
        game.physics.enable( rockSprite, Phaser.Physics.ARCADE );
        rockSprite.anchor.setTo(0, 0);

        gameOverText = game.add.text( game.world.centerX, game.world.centerY, "GAME OVER", style );

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
          game.debug.inputInfo(32, 32);
          keepCarInBounds();
          rockStatus();
        }
        else
        {
            gameOverText.visible = true;
            rockSprite.kill();
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
      rockSprite.kill();
      spawnRock();
      numberOfLives--;

      numberOfLivesText.setText("Lives: " + numberOfLives);
    }

    function incrementScore()
    {
      score++;
      scoreCountText.setText("Score: " + score);
    }

    function spawnRock()
    {
      moveDownThisX = game.rnd.integerInRange(171, 570);
      rockSprite = game.add.sprite(moveDownThisX, 0, 'rock');
      game.physics.enable( rockSprite, Phaser.Physics.ARCADE );
      rockSprite.anchor.setTo(0, 0);
    }

    function rockStatus()
    {
      game.physics.arcade.collide(carSprite, rockSprite, decrementLives);

      if(rockSprite.y > 600)
      {
        rockSprite.kill();
        incrementScore(); //increment score as soon as rock passes player
        spawnRock();
      }

      game.physics.arcade.moveToXY(rockSprite, moveDownThisX, 800, 200);
    }
};

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
<<<<<<< HEAD
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
    }
    
    var bouncy;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
=======

    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/sprites/phaser.png' );
        game.load.image('player1', 'assets/sprites/player1.png');
        game.load.image('player2', 'assets/sprites/player2.png');
        game.load.image('player1goal', 'assets/sprites/goal.png');
        game.load.image('player2goal', 'assets/sprites/goal.png');
        game.load.image('ball', 'assets/sprites/ball.png');
        game.load.image('obstacle1', 'assets/sprites/obstacle1.png');
        game.load.image('obstacle2', 'assets/sprites/obstacle2.png');
        game.load.image('obstacle3', 'assets/sprites/obstacle3.png');

        game.load.audio('hitsound', 'assets/sound/hitsound.mp3');
        game.load.audio('firstScore', 'assets/sound/firstscore.mp3');
        game.load.audio('twoInARow', 'assets/sound/twoInARow.mp3');
        game.load.audio('threeInARow', 'assets/sound/threeInARow.mp3');
        game.load.audio('fiveInARow', 'assets/sound/fiveInARow.mp3');
        game.load.audio('tenInARow', 'assets/sound/tenInARow.mp3');
        game.load.audio('scoreOnSelf', 'assets/sound/scoreOnSelf.mp3');
        game.load.audio('impressive', 'assets/sound/impressive.mp3');
    }

    var firstScore;
    var twoInARow;
    var threeInARow;
    var fiveInARow;
    var tenInARow;
    var scoreOnSelf;
    var impressive;

    var player1Spree = 0;
    var player2Spree = 0;

    var player1;
    var player2;

    var obstacle1;
    var obstacle2;
    var obstacle3;

    var totalScore = 0;

    var ball;

    var player1left;
    var player1right;
    var player1rotateLeft;
    var player1rotateRight;

    var player2left;
    var player2right;
    var player2rotateLeft;
    var player2rotateRight;

    var hitsound;

    var player1Score = 0;
    var player2Score = 0;

    var score1;
    var score2;

    var timerOn;

    var hitLast;

    var player1SpreeText;
    var player2SpreeText;


    function create() {

        firstScore = game.add.audio('firstScore');
        firstScore.volume = 0.3;
        twoInARow = game.add.audio('twoInARow');
        twoInARow.volume = 0.3;
        threeInARow = game.add.audio('threeInARow');
        threeInARow.volume = 0.3;
        fiveInARow = game.add.audio('fiveInARow');
        fiveInARow.volume = 0.3;
        tenInARow = game.add.audio('tenInARow');
        tenInARow.volume = 0.3;
        scoreOnSelf = game.add.audio('scoreOnSelf');
        scoreOnSelf.volume = 0.3;
        impressive = game.add.audio('impressive');
        impressive.volume = 0.3;

        hitsound = game.add.audio('hitsound');
        hitsound.volume = 0.3;

        player1left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        player1right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        player1rotateLeft = game.input.keyboard.addKey(Phaser.Keyboard.O);
        player1rotateRight = game.input.keyboard.addKey(Phaser.Keyboard.P);

        player2left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        player2right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        player2rotateLeft = game.input.keyboard.addKey(Phaser.Keyboard.F);
        player2rotateRight = game.input.keyboard.addKey(Phaser.Keyboard.G);

        // Create a sprite at the center of the screen using the 'logo' image.
        player1 = game.add.sprite( game.world.centerX, 50, 'player1' );
        player2 = game.add.sprite( game.world.centerX, 550, 'player2' );

        obstacle1 = game.add.sprite( game.world.centerX, game.world.centerY, 'obstacle1' );
        obstacle2 = game.add.sprite( game.world.centerX + 1100, game.world.centerY, 'obstacle2' );
        obstacle3 = game.add.sprite( game.world.centerX - 300, game.world.centerY, 'obstacle3' );

        obstacle1.anchor.setTo( 0.5, 0.5 );
        obstacle2.anchor.setTo( 0.5, 0.5 );
        obstacle3.anchor.setTo( 0.5, 0.5 );

        game.physics.enable( obstacle1, Phaser.Physics.ARCADE );
        game.physics.enable( obstacle2, Phaser.Physics.ARCADE );
        game.physics.enable( obstacle3, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.

        obstacle1.body.collideWorldBounds = true;
        obstacle2.body.collideWorldBounds = true;
        obstacle3.body.collideWorldBounds = true;

        obstacle1.body.immovable = true;
        obstacle2.body.immovable = true;
        obstacle3.body.immovable = true;

        obstacle2.angle = -34;
        obstacle3.angle = 34;


        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        player1.anchor.setTo( 0.5, 0.5 );
        player2.anchor.setTo( 0.5, 0.5 );

        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player1, Phaser.Physics.ARCADE );
        game.physics.enable( player2, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.

        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;

        player1.body.immovable = true;
        player2.body.immovable = true;

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var style2 = { font: "16px Verdana", fill: "#9999ff", align: "center" };

        player1SpreeText = game.add.text(760, 50, "Spree: " + player1Spree, style2);
        player1SpreeText.anchor.setTo(0.5, 0.5);
        player2SpreeText = game.add.text(760, 550, "Spree: " + player2Spree, style2);
        player2SpreeText.anchor.setTo(0.5, 0.5);

        score1 = game.add.text(760, 20, player1Score, style);
        score1.anchor.setTo(0.5, 0.5);

        score2 = game.add.text(760, 580, player2Score, style);
        score2.anchor.setTo(0.5, 0.5);

        game.physics.arcade.checkCollision.bottom = false;
        game.physics.arcade.checkCollision.top = false;

        //bouncy.body.gravity.y = 600;
        ball = game.add.sprite( game.world.centerX, game.world.centerY, 'ball' );
        game.physics.enable( ball, Phaser.Physics.ARCADE );
        ball.scale.setTo(0.1, 0.1);
        ball.anchor.setTo(0.5, 0.5);

        ball.body.collideWorldBounds = true;
        //countDown();
        game.time.events.add(Phaser.Timer.SECOND * 3, spawnBall, this);
    }

    var impressivePlayed = false;

    function update() {

>>>>>>> ed81f3ed5d6a058d3c9bf2d9a3a0eb32945493b6
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
<<<<<<< HEAD
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
=======
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        if(player1Score == 20 || player2Score == 20)
        {
          if(!impressivePlayed)
          {
            impressivePlayed = true;
            impressive.play();
          }
          var gameOver;
          var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
          if(player1Score == 20)
          {
            gameOver = game.add.text(game.world.centerX, game.world.centerY + 30, "Player 1 wins!", style);
          }
          else
          {
            gameOver = game.add.text(game.world.centerX, game.world.centerY + 30, "Player 2 wins!", style);
          }
        }
        else
        {
          ballOnSpriteCollision();
          ballOnObstacle();
          rotateObstacles();
          updateMovement();
          detectScore();
        }

        console.log(player1.angle);
    }

    function countDownToSpawn()
    {
      game.time.events.add(Phaser.Timer.SECOND * 2, spawnBall, this);
    }

    function spawnBall()
    {
      ball.kill();
      ball = game.add.sprite( 50, 50, 'ball' );
      game.physics.enable( ball, Phaser.Physics.ARCADE );
      ball.body.collideWorldBounds = true;

      ball.scale.setTo(0.1, 0.1);
      ball.anchor.setTo(0.5, 0.5);

      ball.body.velocity.setTo(400, 400);
      ball.body.bounce.setTo(1, 1);
    }

    function detectScore()
    {
      //if player hit ball last

      if(ball.y <= 15)
      {

                //
        totalScore++;
        player2Score++;
        player2Spree++;
        player1Spree = 0;
        score2.setText(player2Score);
        player2SpreeText.setText("Spree: " + player2Spree);
        score1.setText(player1Score);
        player1SpreeText.setText("Spree: " + player1Spree);

      if(totalScore == 1)
      {
        firstScore.play();
      }

      playerSpree();

      if(hitLast == 1)
      {
        scoreOnSelf.play();
      }

      spawnBall();
      }
      if(ball.y >= 585)
      {
        totalScore++;
        player1Score++;
        player1Spree++;
        player2Spree = 0;
        score1.setText(player1Score);
        player1SpreeText.setText("Spree: " + player1Spree);
        score2.setText(player2Score);
        player2SpreeText.setText("Spree: " + player2Spree);

        if(totalScore == 1)
        {
          firstScore.play();
        }

        playerSpree();

        if(hitLast == 2)
        {
          scoreOnSelf.play();
        }


        spawnBall();
      }
    }

    function updateMovement()
    {
      if(player1left.isDown)
      {
        player1.x -= 8;
      }
      if(player1right.isDown)
      {
        player1.x += 8;
      }
      if(player1rotateLeft.isDown && player1.angle > -60)
      {
        console.log("in here");
        player1.angle -= 5;
      }
      if(player1rotateRight.isDown && player1.angle < 60)
      {
        player1.angle += 5;
      }

      if(player2left.isDown)
      {
        player2.x -= 8;
      }
      if(player2right.isDown)
      {
        player2.x += 8;
      }
      if(player2rotateLeft.isDown && player2.angle > -60)
      {
        player2.angle -= 5;
      }
      if(player2rotateRight.isDown && player2.angle < 60)
      {
        player2.angle += 5;
      }
    }

    function ballOnSpriteCollision()
    {

      if(game.physics.arcade.collide(player1, ball))
      {
        hitsound.play();

        if(player1.angle > 0)
        {
          ball.body.velocity.x = Math.abs(ball.body.velocity.x)*-1;
        }
        if(player1.angle < 0)
        {
          ball.body.velocity.x = Math.abs(ball.body.velocity.x);
        }

        ball.body.velocity.y = Math.abs(ball.body.velocity.y);
        hitLast = 1;
      }
      if(game.physics.arcade.collide(player2, ball))
      {
        hitsound.play();

        if(player2.angle > 0)
        {
          ball.body.velocity.x = Math.abs(ball.body.velocity.x);
        }
        if(player2.angle < 0)
        {
          ball.body.velocity.x = Math.abs(ball.body.velocity.x)*-1;
        }

        ball.body.velocity.y = Math.abs(ball.body.velocity.y)*-1;
        hitLast = 2;
      }
    }

    function ballOnObstacle()
    {

      if(hitLast == 2 && (game.physics.arcade.collide(obstacle1, ball) || game.physics.arcade.collide(obstacle2, ball) || game.physics.arcade.collide(obstacle3, ball)))
      {
        hitsound.play();

        if(obstacle1.angle > 0)
        {
          ball.body.velocity.x = Math.abs(ball.body.velocity.x)*-1;
        }
        if(obstacle1.angle < 0)
        {
          ball.body.velocity.x = Math.abs(ball.body.velocity.x);
        }

        ball.body.velocity.y = Math.abs(ball.body.velocity.y);
      }
      if(hitLast == 1 && (game.physics.arcade.collide(obstacle1, ball) || game.physics.arcade.collide(obstacle2, ball) || game.physics.arcade.collide(obstacle3, ball)))
      {
        hitsound.play();

        if(obstacle1.angle > 0)
        {
          ball.body.velocity.x = Math.abs(ball.body.velocity.x);
        }
        if(obstacle1.angle < 0)
        {
          ball.body.velocity.x = Math.abs(ball.body.velocity.x)*-1;
        }

        ball.body.velocity.y = Math.abs(ball.body.velocity.y)*-1;
      }
    }

    function rotateObstacles()
    {
        obstacle1.angle += 2;
        obstacle2.angle += 2;
        obstacle3.angle += 2;
    }

    function playerSpree()
    {
      if(player1Spree == 2 || player2Spree == 2)
      {
        twoInARow.play();
      }
      if(player1Spree == 3 || player2Spree == 3)
      {
        threeInARow.play();
      }
      if(player1Spree == 5 || player2Spree == 5)
      {
        fiveInARow.play();
      }
      if(player1Spree == 10 || player2Spree == 10)
      {
        tenInARow.play();
      }
>>>>>>> ed81f3ed5d6a058d3c9bf2d9a3a0eb32945493b6
    }
};

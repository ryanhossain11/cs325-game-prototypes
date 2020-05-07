BasicGame.Stage3 = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */

    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
};


    var skyBg;
    var skyChar
    var fireballs;
    var fireBall;
    var shootTime;
    var book;
    var books;
    var left;
    var right;
    var shoot;
    var respawnBookTime;
    var score;
    var scoreText;
    var lifeCount;
    var lifeCountText;

    var fireballSound;
    var burnedSound;
    var oofSound;

    var tipText;

    var powerup;
    var powerups;

    var respawnPowerupTime;

BasicGame.Stage3.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Create a sprite at the center of the screen using the 'logo' image.
        //this.bouncy = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
        this.fireBall = null;
        this.shootTime = 0;
        this.respawnBookTime = 0;
        this.respawnPowerupTime = 0;

        this.score = 0;
        this.lifeCount = 3;

        this.skyBg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sky');
        this.skyBg.anchor.setTo(0.5, 0.5);

        this.skyChar = this.game.add.sprite(this.game.world.centerX, 550, 'skychar');
        this.skyChar.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.skyChar, Phaser.Physics.ARCADE);

        this.fireballs = this.game.add.group();
        this.fireballs.enableBody = true;
        this.fireballs.physicsBodyType = Phaser.Physics.ARCADE;
        this.fireballs.createMultiple(30, 'fireball');
        this.fireballs.setAll('anchor.x', 0.5);
        this.fireballs.setAll('anchor.y', 1);
        this.fireballs.setAll('outOfBoundsKill', true);
        this.fireballs.setAll('checkWorldBounds', true);

        this.books = this.game.add.group();
        this.books.enableBody = true;
        this.books.physicsBodyType = Phaser.Physics.ARCADE;
        this.books.createMultiple(30, 'book');
        this.books.setAll('anchor.x', 0.5);
        this.books.setAll('anchor.y', 1);
        this.books.setAll('outOfBoundsKill', true);
        this.books.setAll('checkWorldBounds', true);

        this.powerups = this.game.add.group();
        this.powerups.enableBody = true;
        this.powerups.physicsBodyType = Phaser.Physics.ARCADE;
        this.powerups.createMultiple(30, 'powerup');
        this.powerups.setAll('anchor.x', 0.5);
        this.powerups.setAll('anchor.y', 1);
        this.powerups.setAll('outOfBoundsKill', true);
        this.powerups.setAll('checkWorldBounds', true);

        this.fireballSound = this.game.add.audio('fireballsound');
        this.burnedSound = this.game.add.audio('burned');
        this.oofSound = this.game.add.audio('oof');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.

        // Turn on the arcade physics engine for this sprite.
        this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#000000", align: "center" };
        this.scoreText = this.game.add.text( 500, 15, "Score: " + this.score, style );
        this.scoreText.anchor.setTo( 0.5, 0.0 );

        this.lifeCountText = this.game.add.text( 500, 35, "Lives: " + this.lifeCount, style );
        this.lifeCountText.anchor.setTo( 0.5, 0.0 );


        this.tip();

        // When you click on the sprite, you go back to the MainMenu.
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        if(this.lifeCount > 0 && this.score <= 30)
        {
          if(this.shoot.isDown)
          {
            this.shootFireball();
          }

          this.movePlayer();
          this.incomingBooks();
          this.incomingPowerups();

          this.game.physics.arcade.overlap(this.books, this.fireballs, this.fireballHitsBook, null, this);
          this.game.physics.arcade.overlap(this.skyChar, this.books, this.bookHitsPlayer, null, this);
          this.game.physics.arcade.overlap(this.skyChar, this.powerups, this.powerupHitsPlayer, null, this);
        }
        else if(this.lifeCount < 1) {
          var style = { font: "25px Verdana", fill: "#000000", align: "center" };
          var gameOver = this.game.add.text( this.game.world.centerX, this.game.world.centerY, "Game over", style );
          gameOver.anchor.setTo( 0.5, 0.0 );
          this.time.events.add(Phaser.Timer.SECOND * 2, this.quitGame, this);
        }
        else if (this.score >= 30)
        {
          var style = { font: "25px Verdana", fill: "#000000", align: "center" };
          var winText = this.game.add.text( this.game.world.centerX, this.game.world.centerY, "Final stage complete! You win", style );

          winText.anchor.setTo( 0.5, 0.0 );

        }
    },

    tip: function(){
      var style = { font: "25px Verdana", fill: "#000000", align: "center" };
      this.tipText = this.game.add.text( this.game.world.centerX, this.game.world.centerY, "Final stage! DESTROY 30 books!", style );
      this.time.events.add(Phaser.Timer.SECOND * 2, this.removeTipText, this);
    },

    removeTipText: function(){
      this.tipText.setText("");
    },

    powerupHitsPlayer: function(powerup, skyChar){
      skyChar.kill();


      this.lifeCount += 1;

      this.lifeCountText.setText("Lives: " + this.lifeCount);
    },

    fireballHitsBook: function(book, fireball){
      book.kill();
      fireball.kill();

      this.burnedSound.play();

      this.score += 1;

      this.scoreText.setText("Score: " + this.score);
    },

    bookHitsPlayer: function(book, skyChar){
      skyChar.kill();

      this.oofSound.play();

      this.lifeCount -= 1;

      this.lifeCountText.setText("Lives: " + this.lifeCount);
    },

    movePlayer: function(){
      if(this.left.isDown)
      {
        this.skyChar.x -= 5;
      }
      if(this.right.isDown)
      {
        this.skyChar.x += 5;
      }
    },

    incomingBooks: function(){

      if(this.game.time.now > this.respawnBookTime)
      {
        this.book = this.books.getFirstExists(false);

        this.book.reset((this.game.rnd.integerInRange(40, 560)), 0);
        this.book.body.velocity.y = 150;

        this.respawnBookTime = this.game.time.now + 300;
      }
    },

    incomingPowerups: function(){

      if(this.game.time.now > this.respawnPowerupTime)
      {
        this.powerup = this.powerups.getFirstExists(false);

        this.powerup.reset((this.game.rnd.integerInRange(40, 560)), 0);
        this.powerup.scale.setTo(0.3, 0.3);
        this.powerup.body.velocity.y = 150;


        this.respawnPowerupTime = this.game.time.now + 1500;
      }
    },

    shootFireball: function () {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (this.game.time.now > this.shootTime)
        {
            this.fireballSound.play();
            //  Grab the first bullet we can from the pool
            this.fireBall = this.fireballs.getFirstExists(false);

          //  console.log(this.fireBall);

            //if (this.fireball)
            //{

                //  And fire it
                this.fireBall.reset(this.skyChar.x, this.skyChar.y + 8);
                this.fireBall.body.velocity.y = -500;
                this.shootTime = this.game.time.now + 250;
            //}
        }

    },

    nextStage: function(){
      this.state.start('Stage2');
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('GameClass');

    }

};

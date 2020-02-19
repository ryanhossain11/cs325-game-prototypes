"use strict";

BasicGame.MathFinal = function (game) {

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
    this.bouncy = null;
    this.question1 = null;
    this.question2 = null;
    this.question3 = null;

    var a;
    var b;
    var c;
    var d;

    var questionNum;

    //This variable is used to prevent answering next question right after giving input for previous question due to update constantly checking input
    var canAnswer = false;
};

BasicGame.MathFinal.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Create a sprite at the center of the screen using the 'logo' image.
        //this.bouncy = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );

        this.question1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'question1');
        this.question1.anchor.setTo(0.5, 0.5);


        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.

        // Turn on the arcade physics engine for this sprite.
        this.a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.b = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.c = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        this.d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = this.game.add.text( this.game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );

        this.questionNum = 1;

        // When you click on the sprite, you go back to the MainMenu.
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        console.log(this.questionNum);
        this.questionCheck();
    },

    questionCheck: function()
    {
        if(this.questionNum == 1)
        {
          if(this.a.isDown)
          {
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = this.game.add.text( this.game.world.centerX, this.game.world.centerY, "CORRECT!", style );
            text.anchor.setTo( 0.5, 0.0 );

            this.questionNum = 2;
            this.time.events.add(Phaser.Timer.SECOND * 1, this.loadQuestion2, this);
            //this.loadQuestion2();
          }
          if(this.b.isDown || this.c.isDown || this.d.isDown)
          {
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = this.game.add.text( this.game.world.centerX, this.game.world.centerY, "WRONG! Failed test", style );
            text.anchor.setTo( 0.5, 0.0 );
            this.time.events.add(Phaser.Timer.SECOND * 2, this.quitGame, this);
          }
        }
        if(this.questionNum == 2)
        {
          if(this.a.isDown && this.canAnswer)
          {
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = this.game.add.text( this.game.world.centerX, this.game.world.centerY, "CORRECT!", style );
            text.anchor.setTo( 0.5, 0.0 );

            this.canAnswer = false;
            this.questionNum = 3;
            this.time.events.add(Phaser.Timer.SECOND * 2, this.loadQuestion3, this);
            //this.loadQuestion3();
          }
          if(this.b.isDown || this.c.isDown || this.d.isDown)
          {
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = this.game.add.text( this.game.world.centerX, this.game.world.centerY, "WRONG! Failed test", style );
            text.anchor.setTo( 0.5, 0.0 );
            this.time.events.add(Phaser.Timer.SECOND * 2, this.quitGame, this);
          }
        }
        if(this.questionNum == 3 && this.canAnswer)
        {
          if(this.a.isDown || this.b.isDown || this.c.isDown)
          {
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = this.game.add.text( this.game.world.centerX, this.game.world.centerY, "WRONG! Failed test", style );
            text.anchor.setTo( 0.5, 0.0 );
            this.time.events.add(Phaser.Timer.SECOND * 2, this.quitGame, this);
          }

          if(this.d.isDown)
          {
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = this.game.add.text( this.game.world.centerX, this.game.world.centerY, "CORRECT! You passed the final!", style );
            text.anchor.setTo( 0.5, 0.0 );

            this.canAnswer = false;

            this.time.events.add(Phaser.Timer.SECOND * 2, this.quitGame, this);
          }
        }
    },

    loadQuestion2: function()
    {
      this.canAnswer = true;
      this.question1.kill();
      this.question2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'question2');
      this.question2.anchor.setTo(0.5, 0.5);
    },

    loadQuestion3: function()
    {
      this.canAnswer = true;
      this.question2.kill();
      this.question3 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'question3');
      this.question3.anchor.setTo(0.5, 0.5);
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MathClass');
    }

};

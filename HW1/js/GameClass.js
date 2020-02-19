"use strict";

BasicGame.GameClass = function (game) {

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
    this.mathClass = null;

    this.mathDoor = null;
    this.gameDoor = null;

    var left;
    var right;
    var up;
    var down;

    var walkUp;
    var walkDown;
    var walkLeft;
    var walkRight;

    var boy;

    var passedFinal = false;
};

BasicGame.GameClass.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Create a sprite at the center of the screen using the 'logo' image.


        this.gameClass = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gameclass');
        this.gameClass.anchor.setTo(0.5, 0.5);


        this.boy = this.game.add.sprite(635, 587, 'character');
        this.boy.frame = 0;
        this.boy.anchor.setTo(0.5, 1);
        this.boy.animations.add('walkDown', [0,1,2,3], 12, false);
        this.boy.animations.add('walkUp', [12,13,14,15], 12, false);
        this.boy.animations.add('walkRight', [4,5,6,7], 12, false);
        this.boy.animations.add('walkLeft', [11,10,9,8], 12, false);


        this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);

        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.


        // Turn on the arcade physics engine for this sprite.

        // Make it bounce off of the world bounds.


        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = this.game.add.text( this.game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );

        // When you click on the sprite, you go back to the MainMenu.
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        		this.game.debug.inputInfo(32, 32);

            this.updateMovement();

            this.leaveClass();

            if(!this.passedFinal)
            {
              this.enterGameClass();
            }

    },

    leaveClass: function()
    {
      if((this.boy.x < 640 && this.boy.x > 550) && this.boy.y > 594 && this.down.isDown)
      {
        this.state.start('Hallway');
      }
    },

    enterGameClass: function()
    {
      console.log(this.boy.x);
      if((this.boy.x < 416 && this.boy.x > 370) && (this.boy.y > 430 && this.boy.y < 440) && this.up.isDown)
      {
        this.startFinal();
      }
    },

    updateMovement: function()
    {
      if(this.left.isDown)
      {
        this.boy.animations.play("walkLeft", 12, false);
        this.boy.x -= 3;
      }
      if(this.right.isDown)
      {
        this.boy.animations.play("walkRight", 12, false);
        this.boy.x += 3;
      }
      if(this.up.isDown && this.boy.y - 3 > 237)
      {
        this.boy.animations.play("walkUp", 12, false);
        this.boy.y -= 3;
      }
      if(this.down.isDown && this.boy.y + 3 < 600)
      {
        this.boy.animations.play("walkDown", 12, false);
        this.boy.y += 3;
      }
    },

    startFinal: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        console.log("Aye mate");
        this.state.start('GameFinal');

    },

};

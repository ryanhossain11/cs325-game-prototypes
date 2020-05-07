"use strict";

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlePage', 'assets/title.jpg');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
		//	+ lots of other required assets here
    this.load.image( 'logo', 'assets/phaser.png' );

		this.load.image('background', 'assets/backgrounds/bg_highway.png');
		this.load.spritesheet('walkingChar', 'assets/sprites/character.png');
		this.load.image('car', 'assets/sprites/car.png');
		this.load.image('rock', 'assets/sprites/rock.png');


				this.load.image('hallway', 'assets/maps/hallway.png');

				this.load.image('sky', 'assets/maps/sky.png');

				this.load.image('skychar', 'assets/sprites/skychar.png');
				this.load.image('fireball', 'assets/sprites/fireball.png');
				this.load.image('book', 'assets/sprites/book.png');
				this.load.image('powerup', 'assets/sprites/powerup.png');

				this.load.image('mathclass', 'assets/maps/mathclassroom.png');
				this.load.image('gameclass', 'assets/maps/gameclassroom.png');

				this.load.image('diploma', 'assets/sprites/diploma.png');

				//math questions
				this.load.image('question1', 'assets/sprites/MathQuestions/question1.png');
				this.load.image('question2', 'assets/sprites/MathQuestions/question2.png');
				this.load.image('question3', 'assets/sprites/MathQuestions/question3.png');

				this.game.load.audio('powerupSound', 'assets/sounds/powerupSound.mp3');
				this.game.load.audio('hooray', 'assets/sounds/hooray.mp3');
				this.game.load.audio('controlsmusic', 'assets/sounds/controlsmusic.mp3');
				this.game.load.audio('fireballsound', 'assets/sounds/fireballsound.mp3');
				this.game.load.audio('burned', 'assets/sounds/burned.mp3');
				this.game.load.audio('oof', 'assets/sounds/oof.mp3');
				this.load.image('controls', 'assets/sprites/controls.png');

				//sprites
				this.load.image('door', 'assets/sprites/door.png');

		  	this.load.spritesheet('character', 'assets/sprites/character.png', 101, 128, 16);
				this.load.spritesheet('dragon', 'assets/sprites/dragon.png', 193, 157, 12);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};

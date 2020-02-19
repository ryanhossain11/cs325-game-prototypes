"use strict";

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.controlsButton = null;
};

var controlsmusic;

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.controlsmusic = this.game.add.audio('controlsmusic');
		this.controlsmusic.play();
		this.controlsmusic.volume = 0.4;
		//this.music.play();

		this.add.sprite(0, 0, 'mainmenu');

		//this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'over', 'out', 'down');
		this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'start', 'yes');
		this.controlsButton = this.add.button( 303, 500, 'controlsButton', this.controls, this, 'start', 'yes');
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	controls: function(){
		this.controlsmusic.stop();
		this.state.start('Controls');
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)

		//	And start the actual game
		this.state.start('Hallway');
	}

};

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

    var game = new Phaser.Game( 768, 768, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('background', 'assets/map/background.png')
        game.load.image('policeNorth', 'assets/cars/policeNorth.png');
        game.load.image('policeSouth', 'assets/cars/policeSouth.png');
        game.load.image('policeEast', 'assets/cars/policeEast.png');
        game.load.image('policeWest', 'assets/cars/policeWest.png');

        game.load.audio('brakeSound', 'assets/sounds/brakeSound.mp3');
        game.load.audio('crashSound', 'assets/sounds/crashSound.mp3');
    }

    var background = null;

    var carNorth1 = null;
    var carNorth2 = null;
    var carNorth3 = null;

    var carSouth1 = null;
    var carSouth2 = null;
    var carSouth3 = null;

    var carEast1 = null;
    var carEast2 = null;
    var carEast3 = null;

    var carWest1 = null;
    var carWest2 = null;
    var carWest3 = null;

    var gameOver = false;

    var northStop;
    var southStop;
    var westStop;
    var eastStop;

    var brakeSound;
    var crashSound;

    var totalScore = 0;


    function create() {

    	brakeSound = game.add.audio('brakeSound');
    	crashSound = game.add.audio('crashSound');

        northStop = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        southStop = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        westStop = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        eastStop = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        background = game.add.sprite(game.world.centerX, game.world.centerY + 40, 'background');
        background.scale.setTo(0.8, 0.8);
        background.anchor.setTo(0.5, 0.5);

        carNorth1 = game.add.sprite(397, 780, 'policeNorth');
        game.physics.enable( carNorth1, Phaser.Physics.ARCADE );
        carNorth1.inputEnabled = true;
        carNorth2 = game.add.sprite(397, 780, 'policeNorth');
        game.physics.enable( carNorth2, Phaser.Physics.ARCADE );
        carNorth2.inputEnabled = true;
        carNorth3 = game.add.sprite(397, 780, 'policeNorth');
        game.physics.enable( carNorth3, Phaser.Physics.ARCADE );
        carNorth3.inputEnabled = true;

        carSouth1 = game.add.sprite(312, -120, 'policeSouth');
        game.physics.enable( carSouth1, Phaser.Physics.ARCADE );
        carSouth1.inputEnabled = true;
        carSouth2 = game.add.sprite(312, -120, 'policeSouth');
        game.physics.enable( carSouth2, Phaser.Physics.ARCADE );
        carSouth2.inputEnabled = true;
        carSouth3 = game.add.sprite(312, -120, 'policeSouth');
        game.physics.enable( carSouth3, Phaser.Physics.ARCADE );
        carSouth3.inputEnabled = true;

        carEast1 = game.add.sprite(-120, 380, 'policeEast');
        game.physics.enable( carEast1, Phaser.Physics.ARCADE );
        carEast1.inputEnabled = true;
        carEast2 = game.add.sprite(-120, 380, 'policeEast');
        game.physics.enable( carEast2, Phaser.Physics.ARCADE );
        carEast2.inputEnabled = true;
        carEast3 = game.add.sprite(-120, 380, 'policeEast');
        game.physics.enable( carEast3, Phaser.Physics.ARCADE );
        carEast3.inputEnabled = true;

        carWest1 = game.add.sprite(770, 312, 'policeWest');
        game.physics.enable( carWest1, Phaser.Physics.ARCADE );
        carWest1.inputEnabled = true;
        carWest2 = game.add.sprite(770, 312, 'policeWest');
        game.physics.enable( carWest2, Phaser.Physics.ARCADE );
        carWest2.inputEnabled = true;
        carWest3 = game.add.sprite(770, 312, 'policeWest');
        game.physics.enable( carWest3, Phaser.Physics.ARCADE );
        carWest3.inputEnabled = true;

        var northCarSpawnTime = game.rnd.integerInRange(2, 5);
        game.time.events.add(Phaser.Timer.SECOND * northCarSpawnTime, startRandomCars, this, "North1");

        var southCarSpawnTime = game.rnd.integerInRange(2, 5);
        game.time.events.add(Phaser.Timer.SECOND * southCarSpawnTime, startRandomCars, this, "South1");

        var eastCarSpawnTime = game.rnd.integerInRange(2, 5);
        game.time.events.add(Phaser.Timer.SECOND * eastCarSpawnTime, startRandomCars, this, "East1");

        var westCarSpawnTime = game.rnd.integerInRange(2, 5);
        game.time.events.add(Phaser.Timer.SECOND * westCarSpawnTime, startRandomCars, this, "West1");

/*
        game.time.events.add(Phaser.Timer.SECOND * (northCarSpawnTime + 2), startRandomCars, this, "North2");

        game.time.events.add(Phaser.Timer.SECOND * (southCarSpawnTime + 2), startRandomCars, this, "South2");

        game.time.events.add(Phaser.Timer.SECOND * (eastCarSpawnTime + 2), startRandomCars, this, "East2");

        game.time.events.add(Phaser.Timer.SECOND * (westCarSpawnTime + 2), startRandomCars, this, "West2");*/

        carNorth1.events.onInputDown.add(listener, {param1: "North1"});
        carSouth1.events.onInputDown.add(listener, {param1: "South1"});
        carWest1.events.onInputDown.add(listener, {param1: "West1"});
        carEast1.events.onInputDown.add(listener, {param1: "East1"});

        carNorth2.events.onInputDown.add(listener, {param1: "North2"});
        carSouth2.events.onInputDown.add(listener, {param1: "South2"});
        carWest2.events.onInputDown.add(listener, {param1: "West2"});
        carEast2.events.onInputDown.add(listener, {param1: "East2"});

    }

    function startRandomCars(car)
    {
        if(car == "North1")
        {
            carNorth1.body.velocity.setTo(0, -130);
        }
        if(car == "South1")
        {
            carSouth1.body.velocity.setTo(0, 130);
        }
        if(car == "East1")
        {
            carEast1.body.velocity.setTo(130, 0);
        }
        if(car == "South1")
        {
            carWest1.body.velocity.setTo(-130, 0);
        }

        if(car == "North2")
        {
            carNorth2.body.velocity.setTo(0, -130);
        }
        if(car == "South2")
        {
            carSouth2.body.velocity.setTo(0, 130);
        }
        if(car == "East2")
        {
            carEast2.body.velocity.setTo(130, 0);
        }
        if(car == "South2")
        {
            carWest2.body.velocity.setTo(-130, 0);
        }
    }

    function checkSpriteClicked()
    {
        /*
        carNorth1.events.onInputDown.add(listener, {param1: "North1"});
        carSouth1.events.onInputDown.add(listener, {param1: "South1"});
        carWest1.events.onInputDown.add(listener, {param1: "West1"});
        carEast1.events.onInputDown.add(listener, {param1: "East1"});*/

    }

    function listener(car)
    {

        if(this.param1 == "North1" && carNorth1.body.velocity.y < 0)
        {
            carNorth1.body.velocity.setTo(0,0);
            brakeSound.play();
        }
        else if(this.param1 == "North1" && carNorth1.body.velocity.y == 0)
        {
            carNorth1.body.velocity.setTo(0,-130);
        }
        else if(this.param1 == "South1" && carSouth1.body.velocity.y > 0)
        {
            carSouth1.body.velocity.setTo(0,0);
            brakeSound.play();
        }
        else if(this.param1 == "South1" && carSouth1.body.velocity.y == 0)
        {
            carSouth1.body.velocity.setTo(0,130);
        }
        else if(this.param1 == "West1" && carWest1.body.velocity.x < 0)
        {
            carWest1.body.velocity.setTo(0,0);
            brakeSound.play();
        }
        else if(this.param1 == "West1" && carWest1.body.velocity.x == 0)
        {
            carWest1.body.velocity.setTo(-130,0);
        }
        else if(this.param1 == "East1" && carEast1.body.velocity.x > 0)
        {
            carEast1.body.velocity.setTo(0,0);
            brakeSound.play();
        }
        else if(this.param1 == "East1" && carEast1.body.velocity.x == 0)
        {
            carEast1.body.velocity.setTo(130,0);
        }

        if(this.param1 == "North2" && carNorth2.body.velocity.y < 0)
        {
            carNorth2.body.velocity.setTo(0,0);
            brakeSound.play();
        }
        else if(this.param1 == "North2" && carNorth2.body.velocity.y == 0)
        {
            carNorth2.body.velocity.setTo(0,-130);
        }
        else if(this.param1 == "South2" && carSouth2.body.velocity.y > 0)
        {
            carSouth2.body.velocity.setTo(0,0);
            brakeSound.play();
        }
        else if(this.param1 == "South2" && carSouth2.body.velocity.y == 0)
        {
            carSouth2.body.velocity.setTo(0,130);
        }
        else if(this.param1 == "West2" && carWest2.body.velocity.x < 0)
        {
            carWest2.body.velocity.setTo(0,0);
            brakeSound.play();
        }
        else if(this.param1 == "West2" && carWest2.body.velocity.x == 0)
        {
            carWest2.body.velocity.setTo(-130,0);
        }
        else if(this.param1 == "East2" && carEast2.body.velocity.x > 0)
        {
            carEast2.body.velocity.setTo(0,0);
            brakeSound.play();
        }
        else if(this.param1 == "East2" && carEast2.body.velocity.x == 0)
        {
            carEast2.body.velocity.setTo(130,0);
        }
    }


    function update () {

        if(gameOver)
        {
            var style = { font: "25px Verdana", fill: "#ff0000", align: "center" };
            var text = this.game.add.text( game.world.centerX, game.world.centerY, "Wow, you just ruined some cops mission. Game Over!", style );
            text.anchor.setTo( 0.5, 0.0 );
        }

        if(!gameOver)
        {
            checkSpriteClicked();
            //stopPlease();

            game.physics.arcade.collide(carNorth1, carWest1, collisionHandler);
            game.physics.arcade.collide(carNorth1, carEast1, collisionHandler);
            game.physics.arcade.collide(carNorth1, carWest2, collisionHandler);
            game.physics.arcade.collide(carNorth1, carEast2, collisionHandler);

            game.physics.arcade.collide(carNorth2, carWest1, collisionHandler);
            game.physics.arcade.collide(carNorth2, carEast1, collisionHandler);
            game.physics.arcade.collide(carNorth2, carWest2, collisionHandler);
            game.physics.arcade.collide(carNorth2, carEast2, collisionHandler);

            game.physics.arcade.collide(carSouth1, carWest1, collisionHandler);
            game.physics.arcade.collide(carSouth1, carEast1, collisionHandler);
            game.physics.arcade.collide(carSouth1, carWest2, collisionHandler);
            game.physics.arcade.collide(carSouth1, carEast2, collisionHandler);

            game.physics.arcade.collide(carSouth2, carWest1, collisionHandler);
            game.physics.arcade.collide(carSouth2, carEast1, collisionHandler);
            game.physics.arcade.collide(carSouth2, carWest2, collisionHandler);
            game.physics.arcade.collide(carSouth2, carEast2, collisionHandler);


            carStatus();
            spawnCar2();

        }

        game.debug.inputInfo(32, 32);
        game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 500, 32);
    }

    function spawnCar2()
    {
        if(carNorth1.y < 300)
        {
            carNorth2.body.velocity.setTo(0, -130);
        }
        if(carSouth1.y > 500)
        {
            carSouth2.body.velocity.setTo(0, -130);
        }
        if(carEast1.x > 600)
        {
            carEast2.body.velocity.setTo(130, 0);
        }
        if(carWest1.x < 200)
        {
            carWest2.body.velocity.setTo(-130, 0);
        }
    }

    function carStatus()
    {
            if(carNorth1.y < 0)
            {
                var resetTime = game.rnd.integerInRange(1, 3);
                carNorth1.x = 397;
                carNorth1.y = 780;
                carNorth1.body.velocity.setTo(0, 0);
                game.time.events.add(Phaser.Timer.SECOND * resetTime, resetCar, this, "North1");
            }
            if(carNorth2.y < 0)
            {
                carNorth2.x = 397;
                carNorth2.y = 780;
                carNorth2.body.velocity.setTo(0, 0);
            }

            if(carSouth1.y > 780)
            {
                var resetTime = game.rnd.integerInRange(1, 3);
                carSouth1.x = 312;
                carSouth1.y = -120;
                carSouth1.body.velocity.setTo(0, 0);
                game.time.events.add(Phaser.Timer.SECOND * resetTime, resetCar, this, "South1");
            }
            if(carSouth2.y > 780)
            {
                carSouth2.x = 312;
                carSouth2.y = -120;
                carSouth2.body.velocity.setTo(0, 0);
            }

            if(carEast1.x > 780)
            {
                var resetTime = game.rnd.integerInRange(1, 3);
                carEast1.x = -120;
                carEast1.y = 380;
                carEast1.body.velocity.setTo(0, 0);
                game.time.events.add(Phaser.Timer.SECOND * resetTime, resetCar, this, "East1");
            }
            if(carEast2.x > 780)
            {
                carEast2.x = -120;
                carEast2.y = 380;
                carEast2.body.velocity.setTo(0, 0);
            }

            if(carWest1.x < 0)
            {
                var resetTime = game.rnd.integerInRange(1, 3);
                carWest1.x = 770;
                carWest1.y = 312;
                carWest1.body.velocity.setTo(0, 0);
                game.time.events.add(Phaser.Timer.SECOND * resetTime, resetCar, this, "West1");
            }
            if(carWest2.x < 0)
            {
                carWest2.x = 770;
                carWest2.y = 312;
                carWest2.body.velocity.setTo(0, 0);
            }
    }

    function collisionHandler(){

    		crashSound.play()
            gameOver = true;
    }

    function resetCar(car)
    {
        if(car == "North1")
        {
            carNorth1.body.velocity.setTo(0, -130);
        }

        if(car == "South1")
        {
            carSouth1.body.velocity.setTo(0, 130);
        }

        if(car == "East1")
        {
            carEast1.body.velocity.setTo(130, 0);
        }

        if(car == "West1")
        {
            carWest1.body.velocity.setTo(-130, 0);
        }

    }
};

//--------------
__phaser = {

    gameObj: null,

    //-------------------
    game:{

      //-------------------
      init(canvasEle, appComponent){
              // create game object
              var game = new Phaser.Game(1200, 800, Phaser.AUTO, canvasEle, { preload: preload, create: create, update: update });
              var gameState = "preload"

              // assign it
              __phaser.gameObj = game;



            //-----------------------  PRELOAD
            function preload() {

                // set canvas color
                game.stage.backgroundColor = '#95a5a6';

                // load images/sounds/scripts
                game.load.image('pic', '../../../node_modules/ang2-phaser/game_demos/phaser_logo.png');

                // preloader events
                game.load.onLoadStart.add(loadStart, this);
                game.load.onFileComplete.add(fileComplete, this);
                game.load.onLoadComplete.add(loadComplete, this);
                game.load.enableParallel = true;
            }
            //-----------------------

            //-----------------------  CREATE
            function create() {


            }
            //-----------------------


            //-----------------------
            function loadStart() {
                // text
                loadingtext = game.add.text(game.world.centerX, game.world.centerY/2, "");
                loadingtext.anchor.set(0.5);
                loadingPercentage = game.add.text(game.world.centerX, game.world.centerY, "");
                loadingPercentage.anchor.set(0.5);
            }
            //-----------------------

            //-----------------------
            function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
            	loadingtext.setText("Loading...");
                loadingPercentage.setText(progress + "%")
            }
            //-----------------------

            //-----------------------
            function preloaderUpdate(){
                // upadate cycle for anything in preload state
            }
            //-----------------------

            //-----------------------
            function loadComplete() {
            	loadingtext.setText("All assets loaded");
                loadingPercentage.setText("100%")

                // add slight delay before starting game
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    loadingtext.destroy();
                    loadingPercentage.destroy();
                    startGame()
                }, this).autoDestroy = true;
            }
            //-----------------------


            //-----------------------
            function startGame(){
                gameState = "gameplay"

                game.stage.backgroundColor = '#2d2d2d';

              	bmd = game.make.bitmapData();
              	bmd.load('pic').cls();

              	bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 2, 2);

              	game.stage.smoothed = false;

              	area = new Phaser.Rectangle(0, bmd.height, bmd.width, 1);

              	dropTime = game.time.now + 250;


            }
            //-----------------------

            //-----------------------
            function gameplayUpdate(){
                // update filter
                if (area.y > 0 && game.time.now > dropTime)
              	{
              		for (var y = 0; y < area.y; y++)
              		{
              			bmd.copyRect('pic', area, 0, y);
              		}

              		area.y--;
              		dropTime = game.time.now + 25;
              	}
            }
            //-----------------------


            //-----------------------  UPDATE
            function update() {

                // list of gamestates and their loops
                if(gameState == "preload"){ preloaderUpdate() }
                if(gameState == "gameplay"){ gameplayUpdate() }

            }
            //-----------------------



      },



    },
    //-------------------


    //-------------------
    destroyGame(callback){
          this.gameObj.destroy();
          callback();
    }
    //-------------------


}
//--------------

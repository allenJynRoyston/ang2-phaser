# ang2-phaser

### What Am I?!
An easy way to implement the Phaser game engine for Angular2 components.

### Demo!
- [Basic Demo](https://phaser-angular2-demo.herokuapp.com/ "Basic Demo")
- [Angular Attack 2016 Submission](https://totallynotarobot.2016.angularattack.io/ "Angular Attack 2016 Submission")<br>
But wait, I don't make games - I'm a web developer... can I still use this?  
- [HELLS YEAH YOU CAN](http://allenroyston-2016.herokuapp.com/ "hell yeah you can").  Make your regular sites RAD AS FUUUUUU*K.

### Seed Project!
Want to try it out right MEOW?  Look no further - clone this [seed project](https://github.com/allenRoyston/phaser-angular2-demo "seed project"), do an npm install and BOOM, ya done son.

### Installation
First, install Phaser source (phaser) and the Phaser directive (ang2-phaser).
```
npm install phaser --save
npm install ang2-phaser --save
```
<br>
Next, alter your systemjs.config.js to include the right pathing.<br>
```
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'ang2-phaser':                'node_modules/ang2-phaser'
  };
  
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'ang2-phaser':                { defaultExtension: 'js' }
  };

```
Then include the module in your scripts (including the functions and declarations).<br>
<strong>*Two game demo files are included.  When building out your own, use them as templates.  You can place those files anywhere - just make sure you make the appropriate changes in the phaserLink code snippet.</strong>
<br>
<strong>** Width/height and resolution of game are controlled in the game file.  Check out the demo source code.</strong>
```

import {Component} from '@angular/core';
import {NG2_PHASER}  from '../../../node_modules/ang2-phaser/ng2phaser'

declare var __phaser:any;

@Component({
    selector: 'my-app',
    templateUrl: './app/components/my-app/main.html',
    directives: [ NG2_PHASER ],
   template: `
     <center>
       <h1>Angular2 - Phaser Demo</h1>
       <phaser (phaser)="phaserLink1($event)" ></phaser>
     </center>
   `
})
export class AppComponent {


   //---------------
   phaserLink1(phaser:any){

      var js = document.createElement("script");
          js.type = "text/javascript";
          js.src = '../../../node_modules/ang2-phaser/game_demos/phaser1_demo.js';
          // js.src = '<pathTo>/myGame.js';  //  swap out this code when you build your own game
          document.body.appendChild(js);
          js.onload = function(){
             __phaser.game.init(phaser.container, this);
          }
   }
   //---------------

   //---------------
   destroyGame(){
      __phaser.destroyGame(function(){
            // do something
      });
   }
   //---------------
   
   //---------------
   ngOnDestroy() {
      this.destroyGame();
   }
   //---------------


}
```

### What's up with the declare var __phaser:any;
So if you look at the demo game file (in game/phaser1_demo.js), you'll see that the whole thing is wrapped in the object __phaser.  Because of how everything is asynchronously loaded, the __phaser object makes it so that they all eventually line up .  

The best way to wrap you mind about it is to consider the pro/cons to this somewhat unorthodox approach.  Essentially each game file should be treated as an NES catridges - each one is essentially a self contained game.  The angular2 component is essentially the NES loader (minus the faulty pins that you have to blow into) and the browser is the NES itself.  In otherwords, it was built this way so that catridges can be interchanged easily and regularly.    

Now you could easily pack a small game into one game file, but for large scale games, it helps to break it out into scenes or parts.  Not only does this help keep the code managable, but lets you build/test individual game parts out.  For example, you could have an "intro", "start screen", "cutscene", "gameplay" then finally an "end screen".  Each one of these could have their own assets, load screens, etc, so you could build each one out individually and then just control the order that these files are played.  That's why this method exists - to help facilitate the creation of larger scale productions and test individual parts out before stiching it all together.

*While we're on the subject, I'd recommend leaving the __phaser object as-is if you're just starting out.  You can certainly add to it (it's expected that you do), but what's in there right now is the bare minimum required to get it to start/stop correctly.  While it doesn't *have* to be setup this way, I'd only recommend altering if you need to.

```
//--------------
__phaser = {

    gameObj: null,  // REQUIRED

    //-------------------
    game:{

      //-------------------
      init(canvasEle, appComponent){
              // create game object
              var game = new Phaser.Game(800, 500, Phaser.AUTO, canvasEle, { preload: preload, create: create, update: update });
              var gameState = "preload"

              // assign it
              __phaser.gameObj = game;


            //-----------------------  PRELOAD 
            function preload() {
              // do stuff
            }
            //-----------------------

            //-----------------------  CREATE
            function create() {
              // do stuff
            }
            //-----------------------


            //-----------------------
            function loadStart() {
              // do stuff
            }
            //-----------------------

            //-----------------------
            function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
              // do stuff
            }
            //-----------------------

            //-----------------------
            function preloaderUpdate(){
              // do stuff
            }
            //-----------------------

            //-----------------------
            function loadComplete() {
              // do stuff
            }
            //-----------------------


            //-----------------------
            function startGame(){
              // do stuff
            }
            //-----------------------

            //-----------------------
            function gameplayUpdate(){
              // do stuff
            }
            //-----------------------


            //-----------------------  UPDATE
            function update() {
              // do stuff
            }
            //-----------------------



      },



    },
    //-------------------


    //-------------------  REQUIRED
    destroyGame(callback){
          this.gameObj.destroy();
          callback();
    }
    //-------------------


}
//--------------
```


### Parameters
```
// if you want to use an alternate version of Phaser (instead of the most up to date version, which is 2.6.1, then you
// can just just pass the file location in the setting -> file

// EXAMPLE:
<phaser (phaser)="phaserLink1($event)" [settings]="{file:'node_modules/phaser/build/phaser.min.js'}"></phaser>
```





License
----

MIT - go nuts y'all.

// core
import {Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

declare var Phaser:any;
//------------------------------------
@Component({
  selector: 'phaser',
  directives: [CORE_DIRECTIVES],
  template: ""
})
export class ng2PhaserComponent {

  //--------------
  public selfRef:any;

  @Output() phaser = new EventEmitter();
  @Input() settings:any;


   //--------------
   constructor(private el: ElementRef) {
      this.selfRef = el.nativeElement;
   }
   //--------------

  //--------------
  ngOnInit(){
    var t = this;
    var alreadyLoaded = false;
    var allScripts = document.getElementsByTagName("script");

    if(t.settings == undefined){
      t.settings = {
        file: 'node_modules/phaser/build/phaser.min.js'
      }
    }

    var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = t.settings.file;
        document.body.appendChild(js);
        js.onload = function(){
            t.phaser.emit({firstLoad: true, container: t.selfRef})
        }

  }
  //--------------

  //--------------
  initPhaser(){
    this.phaser.emit({container: this.selfRef})
  }
  //--------------


}
//------------------------------------

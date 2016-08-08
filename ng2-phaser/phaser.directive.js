"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// core
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
//------------------------------------
var ng2PhaserComponent = (function () {
    //--------------
    function ng2PhaserComponent(el) {
        this.el = el;
        this.phaser = new core_1.EventEmitter();
        this.selfRef = el.nativeElement;
    }
    //--------------
    //--------------
    ng2PhaserComponent.prototype.ngOnInit = function () {
        var t = this;
        var alreadyLoaded = false;
        var allScripts = document.getElementsByTagName("script");
        for (var i = 0; i < allScripts.length; i++) {
            var str = allScripts[i].src;
            if (str.indexOf(t.settings.file) >= 0) {
                alreadyLoaded = true;
            }
        }
        if (alreadyLoaded) {
            var scriptLoadedTest = function () {
                setTimeout(function () {
                    try {
                        var test = new Phaser.Game();
                        clearInterval(this);
                    }
                    catch (err) { }
                    finally {
                        if (test != undefined) {
                            t.initPhaser();
                        }
                        else {
                            scriptLoadedTest();
                        }
                    }
                }, 1);
            };
            var intv = scriptLoadedTest();
        }
        else {
            var js = document.createElement("script");
            js.type = "text/javascript";
            js.src = t.settings.file;
            document.body.appendChild(js);
            js.onload = function () {
                t.initPhaser();
            };
        }
    };
    //--------------
    //--------------
    ng2PhaserComponent.prototype.initPhaser = function () {
        this.phaser.emit({ container: this.selfRef });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ng2PhaserComponent.prototype, "phaser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ng2PhaserComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ng2PhaserComponent.prototype, "layout", void 0);
    ng2PhaserComponent = __decorate([
        core_1.Component({
            selector: 'phaser',
            directives: [common_1.CORE_DIRECTIVES],
            template: ""
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], ng2PhaserComponent);
    return ng2PhaserComponent;
    var _a;
}());
exports.ng2PhaserComponent = ng2PhaserComponent;
//------------------------------------
//# sourceMappingURL=phaser.directive.js.map
var g_mainmenu = [
    "res/HelloWorld.png", "res/01.png","res/minions_0000 (1)","res/minions_0000 (2)","res/minions_0000 (3)","res/minions_0000 (4)","res/minions_0000 (5)","res/Hero.json"
]
var GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();

            
    },
    init: function () {
        this._super();
        var size = cc.director.getWinSize();

        var sprite = cc.Sprite.create("res/HelloWorld.png");
        sprite.setPosition(size.width /2, size.height / 2);
        sprite.setScale(1);
        this.addChild(sprite, 0);
        
        //   var sprite_action=cc.MoveBy.create(2,cc.p(100,0));
        //    this.my_sprite.runAction(sprite_action);
        // Create sprite and set attributes
  
  //src\app.js:
    
   

        var mainscene = ccs.load("res/Hero.json");

        var action = mainscene.action;
        if(action){

            mainscene.node.runAction(action);
            mainscene.node.attr({
                
                  scale: 0.6,
            x: size.width /2,
            y: size.height / 2,
            });

            action.gotoFrameAndPlay(0, true);
        }
        this.addChild(mainscene.node);
    
      


        var label = cc.LabelTTF.create("Hello World", "Arial", 40);
        label.setPosition(size.width / 2, size.height /2);
        this.addChild(label, 1);

    },
    onEnter: function () {
        this._super();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,

        }, this);
    },

    onTouchBegan: function (touch, event) {
        var tp = touch.getLocation();

        console.log('onTouchBegan:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));

        return true;

    },

    onTouchMoved: function (touch, event) {
        var tp = touch.getLocation();
        console.log('onTouchMOved:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
    },
    onTouchEnded: function (touch, event) {
        var tp = touch.getLocation();
        console.log('onTouchEnded:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
    }
});

GameLayer.scene = function () {
    var scene = new cc.Scene;
    var layer = new GameLayer();
    scene.addChild(layer);

    return scene;

};
window.onload = function () {

    var targetWidth = 960;
    var targetHeight = 640;

    cc.game.onStart = function () {
        cc.view.adjustViewPort(false);

        cc.view.setDesignResolutionSize(targetWidth, targetHeight, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);
        //load resources
        cc.LoaderScene.preload(g_mainmenu, function () {


            cc.director.runScene(GameLayer.scene());
        }, this);
    };
    cc.game.run("gameCanvas");
};


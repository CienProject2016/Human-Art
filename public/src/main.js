var g_mainmenu = [
    "res/HelloWorld.png", "res/minion.png"
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
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(1.0);
        this.addChild(sprite, 0);
        //var sprite_action=cc.MoveBy.create(2,cc.p(100,0));
        // this.my_
        // Create sprite and set attributes
  
        var label = cc.LabelTTF.create("Hello World", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 2);
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

    cc.game.onStart = function () {
        cc.view.adjustViewPort(false);

        cc.view.resizeWithBrowserSize(true);
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.SHOW_ALL   );
        cc.view.setDesignResolutionSize(1920, 1080, policy)
        //load resources
        cc.LoaderScene.preload(g_mainmenu, function () {
            cc.director.runScene(GameLayer.scene());
        }, this);
    };
    cc.game.run("gameCanvas");
};
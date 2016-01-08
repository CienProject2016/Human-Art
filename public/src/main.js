var g_mainmenu = [
    "res/HelloWorld.png"
]

window.onload = function () {
    cc.game.onStart = function () {
        cc.view.resizeWithBrowserSize(true);
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.SHOW_ALL);
        cc.view.setDesignResolutionSize(1920, 1080, policy)
        
        //load resources
        cc.LoaderScene.preload(g_mainmenu, function () {
            var sprite = cc.Sprite.create("res/HelloWorld.png");
            var minion = new MinionSprite();

            var MyScene = cc.Scene.extend({
                onEnter: function () {
                    this._super();
                    var size = cc.director.getWinSize();
                    sprite.setPosition(size.width / 2, size.height / 2);
                    sprite.setScale(2.0);
                    this.addChild(sprite);

                    var label = cc.LabelTTF.create("Hello World", "Arial", 40);
                    label.setPosition(size.width / 2, size.height / 2);
                    this.addChild(label);

                    this.addChild(minion);
                }
            });
            cc.director.runScene(new MyScene());
        }, this);

    };
    cc.game.run("gameCanvas");
};

var MinionSprite = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile("res/minion.png");
        cc.eventManager.addListener(listener.clone(), this);
    }
});

var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
            height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            console.log("I picked a tile!!");
        }
        
    }
});
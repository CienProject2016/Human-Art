var g_mainmenu = [
    "res/HelloWorld.png"
]

window.onload = function () {
    cc.game.onStart = function () {
        cc.view.resizeWithBrowserSize(true);
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.SHOW_ALL   );
        cc.view.setDesignResolutionSize(1920, 1080, policy)

        
        //load resources
        cc.LoaderScene.preload(g_mainmenu, function () {
            var sprite = cc.Sprite.create("res/HelloWorld.png");
            var MyScene = cc.Scene.extend({
                onEnter: function () {
                    this._super();
                    var size = cc.director.getWinSize();
                    sprite.setPosition(size.width / 2, size.height / 2);
                    sprite.setScale(2.0);
                    this.addChild(sprite, 0);

                    var label = cc.LabelTTF.create("Hello World", "Arial", 40);
                    label.setPosition(size.width / 2, size.height / 2);
                    this.addChild(label, 1);
                }
            });
            cc.director.runScene(new MyScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};
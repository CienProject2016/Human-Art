var g_mainmenu = [
    "res/HelloWorld.png"
]

window.onload = function(){
    cc.game.onStart = function(){
        cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);
        //load resources
        cc.LoaderScene.preload(g_mainmenu, function () {
            var sprite = cc.Sprite.create("res/HelloWorld.png");
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var size = cc.director.getWinSize();
                    sprite.setPosition(size.width / 2, size.height / 2);
                    sprite.setScale(1.0);
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
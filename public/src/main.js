var g_mainmenu = [
    "res/HelloWorld.png", "res/Hero.json", "res/minion.png"
]

window.onload = function () {
    cc.game.onStart = function () {
        cc.view.adjustViewPort(false);

        cc.view.resizeWithBrowserSize(true);
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.SHOW_ALL);
        cc.view.setDesignResolutionSize(1920, 1080, policy)
        
        //load resources
        cc.LoaderScene.preload(g_mainmenu, function () {
            cc.director.runScene(Board.scene());
        }, this);
    };
    cc.game.run("gameCanvas");
};

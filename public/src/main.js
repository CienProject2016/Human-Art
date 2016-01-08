var g_mainmenu = [
    "res/HelloWorld.png"
]

window.onload = function () {
    var setResolution = function () {
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.SHOW_ALL);

        var isLandscape = true;

        if (cc.sys.isNative) {
            var searchPaths = jsb.fileUtils.getSearchPaths();
            
            // ipad retina
            if (cc.view.getFrameSize().width >= 1536 && cc.view.getFrameSize().height >= 1536) {
                if (true == isLandscape) {
                    cc.view.setDesignResolutionSize(2048, 1536, policy);
                }
                else {
                    cc.view.setDesignResolutionSize(1536, 1048, policy);
                }

                searchPaths.push("res/largeRes");
                searchPaths.push("src");
            } else if (cc.view.getFrameSize().width >= 640 && cc.view.getFrameSize().height >= 640) {//iphone hd or above and android high res screens 
                var size;

                if (cc.view.getFrameSize().width >= 1136 || cc.view.getFrameSize.height >= 1136) {
                    size = 1136;
                } else {
                    size = 960;
                }

                if (true == isLandscape) {
                    cc.view.setDesignResolutionSize(size, 640, policy);
                }
                else {
                    cc.view.setDesignResolutionSize(640, size, policy);
                }

                searchPaths.push("res/mediumRes");
                searchPaths.push("src");
            } else {
                if (true == isLandscape) {
                    cc.view.setDesignResolutionSize(480, 320, policy);
                }
                else {
                    cc.view.setDesignResolutionSize(320, 480, policy);
                }

                searchPaths.push("res/smallRes");
                searchPaths.push("src");
            }

            jsb.fileUtils.setSearchPaths(searchPaths);
        } else {
            if (true == isLandscape) {
                cc.view.setDesignResolutionSize(1280, 720, policy);
            }
            else {
                cc.view.setDesignResolutionSize(720, 1280, policy);
            }
            cc.view.resizeWithBrowserSize(true);
        }

    };

    cc.game.onStart = function () {
        cc.view.resizeWithBrowserSize(true);
        setResolution();
          
        
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
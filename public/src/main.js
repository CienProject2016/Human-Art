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
            //when login is completed
            //get boardId
            var exampleId = "Sebin"; 
            var exampleBoardId = 239483;     
            var exampleSession = "2adfn3o1kolmadfndflk33";
            
            //User is singleton
            User.id = exampleId;
            User.session = exampleSession;
            
            //Board는 내부에서 객체를 생성한다.      
            cc.director.runScene(Board.scene(exampleBoardId));
        }, this);
    };
    cc.game.run("gameCanvas");
};

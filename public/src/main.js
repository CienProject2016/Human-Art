var g_mainmenu = [
    "res/minions/skeleton2.json", "res/minions/horse.json", "res/minions/skeleton1.json", "res/ui/item.json", 
    "res/music/charge.wav", 
    "res/tools/hand.png", "res/tools/bomb.png", "res/tools/absorber.png", "res/tools/paralyzer.png",
    "res/images/field_background.jpg", "res/images/colorbg.jpg",
]

cc.game.onStart = function () {
    cc.view.adjustViewPort(false);

    cc.view.resizeWithBrowserSize(true);
    var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.PROPORTION_TO_FRAME, cc.ContentStrategy.FIXED_WIDTH);
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
            
        //Electric default : 100
        ElectricPower(100);
            
        //Board는 내부에서 객체를 생성한다.      
        cc.director.runScene(MainLayer.scene(exampleBoardId));
    }, this);
};
cc.game.run("gameCanvas");
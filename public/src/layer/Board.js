var Board = cc.Layer.extend({
    id: null,
    name: null,
    componentList: [],
    electricPowerLabel: 0,
    userList: [],
    usingToolImage: null,
    field: null,
    usingTool: {},
    ctor: function (boardId) {
        this._super();
        this.init(boardId);
    },

    init: function (boardId) {
        this._super();
        this.id = boardId;
        var size = cc.director.getWinSize();
        
        
        // Color Background
        var bgSprite = cc.Sprite.create("res/images/colorbg.jpg");
        bgSprite.setPosition(size.width / 2, -size.height * 1.2);

        var movebg = cc.MoveBy.create(10, cc.p(0, size.height * 3.5));
        var movebg1 = cc.MoveBy.create(0, cc.p(0, -size.height * 3.5));
        var bgsequence = cc.Sequence.create(movebg, movebg1);
        bgSprite.runAction(bgsequence).repeatForever();
        this.addChild(bgSprite, ZORDER.BACKGROUND);

        bgSprite.setScale(1.0);

        this.electricPowerLabel = cc.LabelTTF.create(User.electricPower.getCurrentElectricPower(), "Arial", 80);
        this.electricPowerLabel.setPosition(size.width / 10, size.height * 14 / 15);
        this.addChild(this.electricPowerLabel, ZORDER.UI);
        
        
        // Field
        this.field = new Field("field");
        this.addChild(this.field, ZORDER.FIELD);

        // Tool
        this.usingTool = User.usingTool;
        this.makeUsingTool();
        this.makeToolInventory();
        this.addChild(User.usingTool, ZORDER.USING_TOOL, "usingTool");

        // ToolList
        var toolList = new ToolList();
        toolList.setPosition(size.width * 1 / 2, size.height * 2 / 5);
        toolList.setVisible(false);
        this.addChild(toolList, ZORDER.TOOL_LIST);

        //UI
        var toolListButton = ccui.Button.create("res/ui/menu/menuInActive.png", "res/ui/menu/menuActive.png", "res/ui/menu/menuInActive.png");
        toolListButton.addTouchEventListener(function () {
            toolList.setVisible(true);
        });
        toolListButton.setScale(2.0);
        toolListButton.setPosition(size.width * 9 / 10, size.height * 1 / 2);
        this.addChild(toolListButton, ZORDER.UI);

        // ActiveItem (Temporary - Needes Refractoring)
        var generator = new ActiveItem("generator");
        console.log(generator.name);
        generator.setListener();
        generator.setPosition(size.width / 10, size.height * 1 / 4);
        this.addChild(generator, ZORDER.ACTIVEITEM, "activeItem");
        
        //Timer
        var ufoTimer = new Timer(this, "ufo", 30); // spawn every 120 seconds
        ufoTimer.setPosition(size.width * 0.1, size.height * 0.7);
        this.addChild(ufoTimer, ZORDER.ACTIVEITEM, "ufoTimer");
        
        
        this.scheduleUpdate();
    },

    update: function (delta) {
        this.usingToolImage.setTexture("res/tools/" + User.usingTool.name + ".png");
        this.electricPowerLabel.setString(User.electricPower.getCurrentElectricPower());
        this.checkToolIsChanged();
        this.field.update(delta);
        
        TimerController.checkActiveItemSpawnTime(this,this.getChildByName("ufoTimer"));
    },
    
    checkToolIsChanged: function () {
        var usingTool = this.getChildByName("usingTool");
        if (usingTool.name != User.usingTool.name) {
            this.removeChild(usingTool);
            this.addChild(User.usingTool, ZORDER.USING_TOOL, "usingTool");
        }
    },
    makeToolInventory: function () {
        var size = cc.director.getWinSize();
        var toolListFrame = cc.Sprite.create("res/tools/toolListFrame.png");
        toolListFrame.setPosition(cc.p(size.width * 8 / 10, size.height * 3 / 19));
        this.addChild(toolListFrame, 8);
        
        //추후 리스트에서 뽑아올 것
        var hand = cc.Sprite.create("res/tools/hand.png");
        hand.setPosition(cc.p(size.width * 7 / 10, size.height * 3 / 19));
        cc.eventManager.addListener(cc.EventListener.create(onChangeToolListener(this, "hand")), hand);
        this.addChild(hand, 9);

        var bomb = cc.Sprite.create("res/tools/bomb.png");
        this.addChild(bomb, 10);
        bomb.setPosition(cc.p(size.width * 8 / 10, size.height * 3 / 19));
        cc.eventManager.addListener(cc.EventListener.create(onChangeToolListener(this, "bomb")), bomb);

        var absorber = cc.Sprite.create("res/tools/absorber.png");
        this.addChild(absorber, 11);
        absorber.setPosition(cc.p(size.width * 9 / 10, size.height * 3 / 19));
        cc.eventManager.addListener(cc.EventListener.create(onChangeToolListener(this, "absorber")), absorber);
        absorber.setScale(0.40);
    },

    makeUsingTool: function () {
        var size = cc.director.getWinSize();
        var usingToolFrame = cc.Sprite.create("res/tools/using.png");
        usingToolFrame.setPosition(cc.p(size.width * 9 / 10, size.height * 16 / 19));
        this.addChild(usingToolFrame, 6);

        this.usingToolImage = cc.Sprite.create("res/tools/" + User.usingTool.name + ".png");
        this.usingToolImage.setPosition(cc.p(size.width * 9 / 10, size.height * 6 / 7));
        this.addChild(this.usingToolImage, 7, "usingToolImage");
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
        return true;
    },

    onTouchMoved: function (touch, event) {
    },

    onTouchEnded: function (touch, event) {
    },
});

Board.scene = function (boardId) {
    var scene = new cc.Scene;
    var board = new Board(boardId);
    scene.addChild(board);

    return scene;
};

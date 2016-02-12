var Board = cc.Layer.extend({
    id: null,
    name: null,
    componentList: [],
    electricPowerLabel: 0,
    userList: [],
    usingTool: null,
    usingToolImage: null,
    field: null,

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
        bgSprite.setPosition(size.width / 2,  -size.height*1.2);
     

        var movebg = cc.MoveBy.create(10, cc.p(0, size.height*3.5));
        var movebg1 = cc.MoveBy.create(0, cc.p(0, -size.height*3.5));
        var bgsequence = cc.Sequence.create(movebg, movebg1);
        bgSprite.runAction(bgsequence).repeatForever();
        this.addChild(bgSprite);
        
     
        bgSprite.setScale(1.0);

        // UI
        var ui = new Ui("menu");
        this.addChild(ui);

        var item = new Ui("item");
        this.addChild(item);

        item.visible = false;

        var button1 = ui.children[0].children[2];
        cc.eventManager.addListener(cc.EventListener.create(menuListener(item)), button1);

        var button2 = ui.children[0].children[3];
        cc.eventManager.addListener(cc.EventListener.create(menuListener(item)), button2);

        var backButton = item.children[0].children[9];
        cc.eventManager.addListener(cc.EventListener.create(menuListener(item)), backButton);

        this.electricPowerLabel = cc.LabelTTF.create(User.electricPower.getCurrentElectricPower(), "Arial", 80);
        this.electricPowerLabel.setPosition(size.width / 10, size.height * 14 / 15);
        this.addChild(this.electricPowerLabel, 1);

        // Field
        this.field = new Field("field");
        this.addChild(this.field);
        for (var i = 0; i < this.field.getMinionsNum(); i++) {
            this.addChild(this.field.getMinion(i));
        }

        // Components
        var component = new Component("hourse");
        if (component.childrenCount != 0) {
            cc.eventManager.addListener(cc.EventListener.create(minionListener()), component);
            this.addChild(component);
        }

        var component2 = new Component("skeleton1");
        cc.eventManager.addListener(cc.EventListener.create(minionListener()), component2);
        this.addChild(component2);

        // Tool
        this.usingTool = User.usingTool;
        this.makeUsingTool();
        this.makeToolInventory();

        //add using Tool cursor 
        this.addChild(this.usingTool, 999, "usingTool");

        this.scheduleUpdate();
    },

    update: function (delta) {
        var usingToolInBoard = this.getChildByName("usingTool");
        this.usingTool = usingToolInBoard;
        this.usingToolImage = this.getChildByName("usingToolImage");
        this.usingToolImage.setTexture("res/tools/" + this.usingTool.name + ".png");
        this.electricPowerLabel.setString(User.electricPower.getCurrentElectricPower());

        this.field.update(delta);
    },

    makeToolInventory: function () {
        var size = cc.director.getWinSize();
        var toolListFrame = cc.Sprite.create("res/tools/toolListFrame.png");
        toolListFrame.setPosition(cc.p(size.width * 8 / 10, size.height * 3 / 19));
        this.addChild(toolListFrame, 8);
        
        //추후 리스트에서 뽑아올 것
        var hand = cc.Sprite.create("res/tools/hand.png");
        hand.setPosition(cc.p(size.width * 7 / 10, size.height * 3 / 19));
        cc.eventManager.addListener(cc.EventListener.create(toolListener(this, "hand")), hand);
        this.addChild(hand, 9);

        var bomb = cc.Sprite.create("res/tools/bomb.png");
        this.addChild(bomb, 10);
        bomb.setPosition(cc.p(size.width * 8 / 10, size.height * 3 / 19));
        cc.eventManager.addListener(cc.EventListener.create(toolListener(this, "bomb")), bomb);
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
    }
});

Board.scene = function (boardId) {
    var scene = new cc.Scene;
    var board = new Board(boardId);
    scene.addChild(board);

    return scene;
};


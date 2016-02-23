var UI = cc.Layer.extend({
    electricPowerLabel: null,
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        this.electricPowerLabel = cc.LabelTTF.create(User.electricPower.getCurrentElectricPower(), "Arial", 80);
        this.electricPowerLabel.setPosition(size.width / 10, size.height * 14 / 15);
        this.addChild(this.electricPowerLabel);

        this.makeCurrentTool();
        this.makeRecentToolList();
        this.makeInventory();
    },

    update: function (delta) {
        this.currentToolImage.setTexture("res/tools/" + User.usingTool + ".png");
        this.electricPowerLabel.setString(User.electricPower.getCurrentElectricPower());
    },

    makeRecentToolList: function () {
        var size = cc.director.getWinSize();
        var recentToolListFrame = cc.Sprite.create("res/tools/recent_tool_list_frame.png");
        recentToolListFrame.setPosition(cc.p(size.width * 8 / 10, size.height * 3 / 19));
        this.addChild(recentToolListFrame, 8);
        
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
    makeCurrentTool: function () {
        var size = cc.director.getWinSize();
        var currentToolFrame = cc.Sprite.create("res/tools/current_tool_frame.png");
        currentToolFrame.setPosition(cc.p(size.width * 9 / 10, size.height * 16 / 19));
        this.addChild(currentToolFrame, 6);

        this.currentToolImage = cc.Sprite.create("res/tools/" + User.usingTool + ".png");
        this.currentToolImage.setPosition(cc.p(size.width * 9 / 10, size.height * 6 / 7));
        this.addChild(this.currentToolImage, 7, "currentToolImage");
    },
    makeInventory: function() {
        var size = cc.director.getWinSize();
        var inventory = new Inventory();
        inventory.setPosition(size.width * 1 / 2, size.height * 2 / 5);
        inventory.setVisible(false); 1
        this.addChild(inventory, ZORDER.TOOL_LIST);
        
        var inventoryButton = ccui.Button.create("res/ui/menu/menuInActive.png", "res/ui/menu/menuActive.png", "res/ui/menu/menuInActive.png");
        inventoryButton.addTouchEventListener(function () {
            inventory.setVisible(true);
        });
        inventoryButton.setScale(2.0);
        inventoryButton.setPosition(size.width * 9 / 10, size.height * 1 / 2);
        this.addChild(inventoryButton, ZORDER.UI);
    }
});
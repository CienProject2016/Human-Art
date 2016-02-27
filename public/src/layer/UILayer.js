var UILayer = cc.Layer.extend({
    inventoryLayer: null,
    currentToolName: null,
    currentToolIamge: null,
    recentToolImageList: [null, null, null],

    ctor: function () {
        this._super();

        this.makeRecentToolList();
        this.makeCurrentTool();
        this.makeInventory();

    },

    update: function (detla) {
        if (User.usingTool != this.currentToolName) {
            this.updateCurrentTool(User.usingTool);
        }
    },

    updateCurrentTool: function (toolName) {
        this.currentToolName = toolName;
        this.currentToolImage.setTexture("res/tools/" + toolName + ".png");
    },

    updateRecentToolList: function (nameList) {
        var winSize = cc.director.getWinSize();

        for (var i = 0; i < nameList.length; i++) {
            this.recentToolImageList[i] = cc.Sprite.create("res/tools/" + nameList[i] + ".png");
            this.recentToolImageList[i].setPosition(cc.p(winSize.width * (7 + i) / 10, winSize.height * 3 / 19));
        }
    },

    makeInventory: function () {
        var winSize = cc.director.getWinSize();

        this.inventoryLayer = new InventoryLayer();
        this.addChild(this.inventoryLayer);

        var inventoryButton = ccui.Button.create("res/ui/menu/menuInActive.png", "res/ui/menu/menuActive.png");
        inventoryButton.addTouchEventListener(function (sender, event) {
            switch (event) {
                case 0: break;  // begin
                case 1: break;  // move
                case 2: // end
                    this.inventoryLayer.setVisible(!this.inventoryLayer.visible);
                    break;
            }
        }.bind(this));
        inventoryButton.setScale(2.0);
        inventoryButton.setPosition(winSize.width * 9 / 10, winSize.height * 1 / 2);
        this.addChild(inventoryButton, ZORDER.UI);
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

    makeRecentToolList: function () {
        var winSize = cc.director.getWinSize();
        var recentToolListFrame = cc.Sprite.create("res/tools/recent_tool_list_frame.png");
        recentToolListFrame.setPosition(cc.p(winSize.width * 8 / 10, winSize.height * 3 / 19));
        this.addChild(recentToolListFrame);

        var nameList = ["hand", "bomb", "absorber"];

        for (var i = 0; i < nameList.length; i++) {
            this.recentToolImageList[i] = cc.Sprite.create("res/tools/" + nameList[i] + ".png");
            this.recentToolImageList[i].setPosition(cc.p(winSize.width * (7 + i) / 10, winSize.height * 3 / 19));
            this.addChild(this.recentToolImageList[i]);
        }

    },
});
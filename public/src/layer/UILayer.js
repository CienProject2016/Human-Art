var UILayer = cc.Layer.extend({
    CURRENT_TOOL_IMAGE_WIDTH: 150,
    CURRENT_TOOL_IMAGE_HEIGHT: 150,
    RECENT_TOOL_IMAGE_WIDTH: 150,
    RECENT_TOOL_IMAGE_HEIGHT: 150,

    inventoryLayer: null,

    currentToolName: null,
    currentToolIamge: null,
    recentToolNameList: [null, null, null],
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
            this.updateRecentToolList(User.usingTool);
        }
    },

    updateCurrentTool: function (toolName) {
        this.currentToolName = toolName;
        this.currentToolImage.setTexture("res/tools/" + toolName + ".png");
        var scaleFactor = this.getScaleFactorSmall(this.currentToolImage.getContentSize().width, this.currentToolImage.getContentSize().height,
            this.CURRENT_TOOL_IMAGE_WIDTH, this.CURRENT_TOOL_IMAGE_HEIGHT);
        this.currentToolImage.setScale(scaleFactor, scaleFactor);
    },

    updateRecentToolList: function (toolName) {
        var winSize = cc.director.getWinSize();

        var found = this.recentToolNameList.indexOf(toolName);
        if (found == -1) {
            this.recentToolNameList.shift();
            this.recentToolNameList.push(toolName);

            for (var i = 0; i < this.recentToolNameList.length; i++) {
                this.recentToolImageList[i] = this.getScaledRecentToolSprite(this.recentToolNameList[i]);
                this.recentToolImageList[i].setPosition(cc.p(winSize.width * (7 + i) / 10, winSize.height * 3 / 19));
            }
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
        cc.eventManager.addListener(recentToolListener(this), recentToolListFrame);
        this.addChild(recentToolListFrame);

        this.recentToolNameList = ["hand", "bomb", "absorber"];

        for (var i = 0; i < this.recentToolNameList.length; i++) {
            this.recentToolImageList[i] = this.getScaledRecentToolSprite(this.recentToolNameList[i]);

            this.recentToolImageList[i].setPosition(cc.p(winSize.width * (7 + i) / 10, winSize.height * 3 / 19));
            this.addChild(this.recentToolImageList[i]);
        }
    },

    getScaleFactorSmall: function (origWidth, origHeight, targetWidth, targetHeight) {
        var scaleFactorX = targetWidth / origWidth;
        var scaleFactorY = targetHeight / origHeight;
        return (scaleFactorX < scaleFactorY) ? scaleFactorX : scaleFactorY;
    },

    getScaledRecentToolSprite: function (toolName) {
        var sprite = cc.Sprite.create("res/tools/" + toolName + ".png");
        var scaleFactor = this.getScaleFactorSmall(sprite.getContentSize().width, sprite.getContentSize().height,
            this.RECENT_TOOL_IMAGE_WIDTH, this.RECENT_TOOL_IMAGE_HEIGHT)
        sprite.setScale(scaleFactor, scaleFactor);
        return sprite;
    }
});

function recentToolListener(ref) {
    return cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            var smallRects = [];
            smallRects.push(cc.rect(s.width * 0 / 3, 0, s.width / 3, s.height));
            smallRects.push(cc.rect(s.width * 1 / 3, 0, s.width / 3, s.height));
            smallRects.push(cc.rect(s.width * 2 / 3, 0, s.width / 3, s.height));

            if (cc.rectContainsPoint(rect, locationInNode)) {
                for (var i = 0; i < smallRects.length; i++) {
                    if (cc.rectContainsPoint(smallRects[i], locationInNode)) {
                        User.usingTool = ref.recentToolNameList[i];
                        ref.updateCurrentTool(ref.recentToolNameList[i])
                        return true;
                    }
                }
            }

            return false;
        }
    });
}
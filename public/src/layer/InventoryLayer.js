var InventoryLayer = cc.Layer.extend({
    row: 4,
    column: 3,
    INVENTORY_WIDTH: 800,
    INVENTORY_HEIGHT: 900,
    INVENTORY_TOOL_IMAGE_WIDTH: 240,
    INVENTORY_TOOL_IMAGE_HEIGHT: 180,
    offsetX: cc.director.getWinSize().width * 1 / 2,
    offsetY: cc.director.getWinSize().height * 2 / 5,

    moving: false,

    toolNameList: [["hand", "bomb", "absorber"], ["paralyzer", null, null], [null, null, null], [null, null, null]],

    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();

        var inventoryFrame = cc.Sprite.create("res/ui/tool/toolList.png");
        var exitButton = cc.Sprite.create("res/ui/tool/exitButton.png");

        inventoryFrame.setPosition(winSize.width * 0.1 + this.offsetX, winSize.height * 0.1 + this.offsetY);
        exitButton.setPosition(winSize.width * 0.28 + this.offsetX, winSize.height * 0.48 + this.offsetY);
        cc.eventManager.addListener(cc.EventListener.create(exitButtonListener(this)), exitButton);

        this.addChild(inventoryFrame);
        this.addChild(exitButton);

        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.column; j++) {
                if (this.toolNameList[i][j]) {
                    this.addTool(this.toolNameList[i][j], i, j);
                }
            }
        }

        this.setVisible(false);
    },

    addTool: function (name, i, j) {
        var toolImage = cc.Sprite.create("res/tools/" + this.toolNameList[i][j] + ".png");
        var scaleFactorX = (this.INVENTORY_TOOL_IMAGE_WIDTH) / toolImage.getContentSize().width;
        var scaleFactorY = (this.INVENTORY_TOOL_IMAGE_HEIGHT) / toolImage.getContentSize().height;
        var scaleFactor = (scaleFactorX < scaleFactorY) ? scaleFactorX : scaleFactorY;

        toolImage.setScale(scaleFactor, scaleFactor);
        toolImage.setPosition(this.getToolPosition(i, j));
        this.addChild(toolImage);
    },

    selectTool: function (toolName) {
        console.log("toolClicked: " + toolName);
        User.usingTool = toolName;
    },

    getToolPosition: function (i, j) {
        var winSize = cc.director.getWinSize();
        return new cc.Point(-winSize.width * 0.034 + winSize.width * 0.133 * j + this.offsetX,
            winSize.height * 0.32 - winSize.height * 0.175 * i + this.offsetY);
    },

    isInsideInventory: function (point) {
        var winSize = cc.director.getWinSize();

        var inventoryRect = cc.rect(winSize.width * 0.1 + this.offsetX - this.INVENTORY_WIDTH / 2, winSize.height * 0.1 + this.offsetY - this.INVENTORY_HEIGHT / 2, this.INVENTORY_WIDTH, this.INVENTORY_HEIGHT);
        return cc.rectContainsPoint(inventoryRect, point);
    },

    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this);
    },

    onTouchBegan: function (touch, event) {
        if (!this.visible) return false;

        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());


        if (this.isInsideInventory(locationInNode)) {
            for (var i = 0; i < this.row; i++) {
                for (var j = 0; j < this.column; j++) {
                    var offset = cc.p(this.INVENTORY_TOOL_IMAGE_WIDTH / 2, this.INVENTORY_TOOL_IMAGE_HEIGHT / 2);
                    var leftRightPosition = cc.pSub(this.getToolPosition(i, j), offset);
                    var rect = cc.rect(leftRightPosition.x, leftRightPosition.y, this.INVENTORY_TOOL_IMAGE_WIDTH, this.INVENTORY_TOOL_IMAGE_HEIGHT);
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        if (this.toolNameList[i][j]) {
                            this.selectTool(this.toolNameList[i][j]);
                            return true;
                        }
                    }
                }
            }
            this.moving = true;
            return true;
        }

        return false;
    },

    onTouchMoved: function (touch, event) {
        if (this.moving) {
            var delta = touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
        }
    },

    onTouchEnded: function (touch, event) {
        if (this.moving) 
            this.moving = false;
    }
});

function exitButtonListener(toolList) {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {
                toolList.setVisible(false);
            }
        },
        onTouchEnded: function (touch, event) {
            return false;
        }
    };
}
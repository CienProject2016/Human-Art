var InventoryLayer = cc.Layer.extend({
    row: 4,
    column: 3,
    toolImageWidth: 240,
    toolImageHeight: 180,
    offsetX: cc.director.getWinSize().width * 1 / 2,
    offsetY: cc.director.getWinSize().height * 2 / 5,

    toolNameList: [["hand", "bomb", "absorber"], [null, null, null], [null, null, null], [null, null, null]],

    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();

        var toolList = cc.Sprite.create("res/ui/tool/toolList.png");
        var exitButton = cc.Sprite.create("res/ui/tool/exitButton.png");

        toolList.setPosition(winSize.width * 0.1 + this.offsetX, winSize.height * 0.1 + this.offsetY);
        exitButton.setPosition(winSize.width * 0.28 + this.offsetX, winSize.height * 0.48 + this.offsetY);
        cc.eventManager.addListener(cc.EventListener.create(exitButtonListener(this)), exitButton);

        this.addChild(toolList);
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
        var winSize = cc.director.getWinSize();
        var toolImage = cc.Sprite.create("res/tools/" + this.toolNameList[i][j] + ".png");
        var scaleFactorX = (this.toolImageWidth) / toolImage.getContentSize().width;
        var scaleFactorY = (this.toolImageHeight) / toolImage.getContentSize().height;
        var scaleFactor = (scaleFactorX < scaleFactorY) ? scaleFactorX : scaleFactorY;
        
        toolImage.setScale(scaleFactor, scaleFactor);
        toolImage.setPosition(-winSize.width * 0.034 + winSize.width * 0.133 * j + this.offsetX, winSize.height * 0.32 - winSize.height * 0.175 * i + this.offsetY);
        this.addChild(toolImage);
    },

    selectTool: function (toolName) {
        User.usingTool = toolName;
    },

    onEnter: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
        }, this);
    },

    onTouchBegan: function (touch, event) {
        var winSize = cc.director.getWinSize();

        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());

        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.column; j++) {
                var rect = cc.rect(-winSize.width * 0.034 + winSize.width * 0.133 * j + this.offsetX, winSize.height * 0.32 - winSize.height * 0.175 * i + this.offsetY, this.toolImageWidth, this.toolImageHeight);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    this.selectTool(this.toolNameList[i][j]);
                    return true;
                }
            }
        }

        return false;
    },

    onTouchMoved: function (touch, event) {
    },

    onTouchEnded: function (touch, event) {

    }
});

function chooseToolListener(toolName) {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {
                User.usingTool = toolName;
                return true;
            }
            return false;
        },
        onTouchEnded: function (touch, event) {
            return false;
        }
    };
}

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
/* global User */
var Inventory = cc.Layer.extend({
    //Javscript는 다차원 배열을 지원하지않음, 따라서 명시적으로 선언해둘 필요가 있음(지울시 undefined에러 발생)
    row: 4,
    column: 3,
    toolNameList: [["hand", "bomb", "absorber"], [null, null, null], [null, null, null], [null, null, null]],
    toolList: [[null,null,null],[null,null,null],[null,null,null],[null,null,null]],
    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        var toolList = cc.Sprite.create("res/ui/tool/toolList.png");
        var exitButton = cc.Sprite.create("res/ui/tool/exitButton.png");
        toolList.setPosition(winSize.width * 0.1, winSize.height * 0.1);
        exitButton.setPosition(winSize.width * 0.28, winSize.height * 0.48);
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
    },
    addTool: function (name, i, j) {
        var winSize = cc.director.getWinSize();
        var toolImage = cc.Sprite.create("res/tools/" + this.toolNameList[i][j] + ".png");
        toolImage.setPosition(-winSize.width * 0.034 + winSize.width * 0.133 * j, winSize.height * 0.32 - winSize.height * 0.175 * i);
        this.addChild(toolImage);
        cc.eventManager.addListener(cc.EventListener.create(chooseToolListener(this.toolNameList[i][j])), toolImage);
    },
    getTool: function(name) {
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.column; j++) {
                if (this.toolNameList[i][j] == name) {
                    return this.toolList[i][j];
                }
            }
        }
        return null;
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
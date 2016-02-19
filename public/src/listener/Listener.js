function minionListener(caller) {
    var ref = caller;
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {

            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                ref.setOpacity(50);
                console.log(ref.getOpacity());
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
            var delta = touch.getDelta();
            ref.x += delta.x;
            ref.y += delta.y;
        },
        onTouchEnded: function (touch, event) {
            var target = event.getCurrentTarget();
            target.setOpacity(255);
        }
    };
}

function onChangeToolListener(board, toolName) {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                User.usingTool = new Tool(toolName);
                var usingTool = board.getChildByName("usingTool");
                usingTool.setTexture("res/tools/" + User.usingTool.name + ".png")

                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {

        }
    };
}

function menuListener(item) {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                item.visible = !item.visible;
                return true;

            }

        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            return false;
        }
    };
}
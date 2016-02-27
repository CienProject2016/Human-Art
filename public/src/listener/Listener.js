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
                ref.grab();
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
            ref.release();
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
                User.usingTool = toolName;
                return true;
            }
            return false;
        },
    };
};
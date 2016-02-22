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
                ref.hold = true;
                if (ref.stateOfMinion == 3) {
                    ref.pause();
                }
                else if (ref.stateOfMinion == 2) {
                    ref.paralyze();
                }
                ref.setOpacity(180);

                minionTouched(ref);
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
            ref.hold = false;
            ref.setOpacity(255);
            ref.heal();
            minionTouchEnded(ref);
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

                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
        },
        onTouchEnded: function (touch, event) {
        }
    };
};

function minionTouched(minion) {
    var name = User.usingTool.name;
    switch (name) {
        case "absorber":
            minion.setScale(1.2);
            break;
        case "bomb":
            break;
    }
};

function minionTouchEnded(minion) {
    var name = User.usingTool.name;
    switch (name) {
        case "absorber":
            var scalingMinion = cc.ScaleTo.create(0.5, 0.7, 0.7);
            minion.runAction(scalingMinion);
            break;
        case "bomb":
            break;
    }
};
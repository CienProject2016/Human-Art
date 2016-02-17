function minionListener() {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {

            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                //터치당한 컴포넌트의 상태 변경
                target.stateOfMinion = 2;

                if (target.stateOfMinion == 1) { //의식상태
                    target.stopAllActions(); //상하좌우 움직임 멈춤
                }
                else if (target.stateOfMinion == 2) { //마취제 맞은 상태
                    target.stopAllActions();
                    target.paralyze(); //팔다리 움직임 멈춤

                }
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                target.opacity = 180;
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
            var target = event.getCurrentTarget();
            var delta = touch.getDelta();
            target.x += delta.x;
            target.y += delta.y;
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
function handListener(ref) {
    return cc.EventListener.create({
        event: cc.EventListener.MOUSE,
        onMouseDown: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                ref.setPosition(event._x + 36, event._y - 60);
                ref.visible = true;
            }
        },
        onMouseMove: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                ref.setPosition(event._x + 36, event._y - 60);
                ref.visible = true;

            }
        },
        onMouseUp: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                ref.visible = false;


            }
        },
        onMouseScroll: function (event) {
            var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
            console.log(str);
        }

    });
}

function absorberListener(ref) {
    return cc.EventListener.create({
        event: cc.EventListener.MOUSE,
        onMouseDown: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {

                ref.setPosition(event._x, event._y);
                ref.visible = true;



            }
        },
        onMouseMove: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                ref.setPosition(event._x, event._y);
                ref.visible = true;

            }
        },
        onMouseUp: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                ref.visible = false;

            }
        },
        onMouseScroll: function (event) {
            var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
            console.log(str);
        }

    }, this);



}

function bombListener(ref) {
    return cc.EventListener.create({
        event: cc.EventListener.MOUSE,
        onMouseDown: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {

                ref.setPosition(event._x, event._y);
                ref.visible = true;
            }
        },
        onMouseMove: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                ref.setPosition(event._x, event._y);
                ref.visible = true;

            }
        },
        onMouseUp: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                ref.visible = false;

            }
        },
        onMouseScroll: function (event) {
            var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
            console.log(str);
        }

    }, this);
};

function MinionTouched(minion) {
    var name = User.usingTool.name;
    switch (name) {
        case "absorber":
            minion.setScale(1.2);

            break;
        case "bomb":


            break;
        case "paralyzer":
           // minion.stateOfMinion = 2;
           // console.log(minion.stateOfMinion);
           minion.paralyze();
            break;
    }
};

function MinionTouchEnded(minion) {
    var name = User.usingTool.name;
    switch (name) {
        case "absorber":

            var scalingMinion = cc.ScaleTo.create(0.5, 0.7, 0.7);

            minion.runAction(scalingMinion);

            break;
        case "bomb":


            break;
            case "paralyzer":
            break;



    }
};
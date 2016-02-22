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
function handListener(ref) {
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

    });
}

function absorberListener() {
    return cc.EventListener.create({
        event: cc.EventListener.MOUSE,
        onMouseDown: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {

                this.setPosition(event._x, event._y);
                this.visible = true;


            }
        },
        onMouseMove: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                this.setPosition(event._x, event._y);
                this.visible = true;

            }
        },
        onMouseUp: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                this.visible = false;

            }
        },
        onMouseScroll: function (event) {
            var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
            console.log(str);
        }

    }, this);
}

function bombListener() {
    return cc.EventListener.create({
        event: cc.EventListener.MOUSE,
        onMouseDown: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {

                this.setPosition(event._x, event._y);
                this.visible = true;


            }
        },
        onMouseMove: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                this.setPosition(event._x, event._y);
                this.visible = true;

            }
        },
        onMouseUp: function (event) {
            if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                this.visible = false;

            }
        },
        onMouseScroll: function (event) {
            var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
            console.log(str);
        }

    }, this);
}
function generatorListener(activeItem) {

    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {
                activeItem.setTexture("res/activeItem/" + activeItem.name + "_active.png");

                var audioElement = new Audio("res/music/" + "charge.wav");
                audioElement.play();


                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
        },
        onTouchEnded: function (touch, event) {
            activeItem.setTexture("res/activeItem/" + activeItem.name + ".png");
            ActiveItemController.setElectricPower(5);
        }
    };
}

function ufoListener(ufo, board, timer) {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {
                ufo.setTexture("res/activeItem/" + ufo.name + "_active.png");
                ufo.health -= 1;
                var audioElement = new Audio("res/music/" + "ufo_hit.mp3");
                audioElement.play();
               
                var healthLabel = ufo.getChildByName("ufoHealthLabel");
                healthLabel.setString(ufo.health + "/" +ufo.maxHealth);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
        },
        onTouchEnded: function (touch, event) {
            if (ufo.health <= 0) {
                timer.state = TIMER_STATE.TIMER_HAVE_TO_RESTART;
                board.removeChild(ufo);
            }
            ufo.setTexture("res/activeItem/" + ufo.name + ".png");
        }
    };
}


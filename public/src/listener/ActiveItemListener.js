function generatorListener(activeItem){
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


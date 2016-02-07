var Tool = cc.Sprite.extend({
    requiredElectricPower: null,
    name : "",
    ctor: function (name) {
        this._super("res/" + name + ".png");
        this.name = name;
        var ref = this;
        ref.visible = false;
        cc.eventManager.addListener({
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
            onMouseUp : function (event) {
                if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
                    ref.visible = false;
                }
            }
        }, this);
    }
    
}); 
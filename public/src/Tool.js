var Tool = cc.Sprite.extend({
    requiredElectricPower: null,
    ctor: function (name) {
        this._super("res/" + name + ".png");
        console.log(this);
        var ref = this;
        ref.visible = false;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                    ref.x = event.x;
                    ref.y = event.y;                     
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
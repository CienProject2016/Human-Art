var Tool = cc.Sprite.extend({
    requiredElectricPower : null,
    ctor: function (name) {
        this._super("res/"+name+".png");
        
    }    
}); 
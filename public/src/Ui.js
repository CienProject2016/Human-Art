var Ui = cc.Layer.extend({
    node :null,
    ctor: function (type) {
        this._super();
        var ui = ccs.load("res/" + type + ".json");
        if (!(ui.node)) {
            console.log("Ui " + type + ".json 가 없습니다.");
            return;
        }
           
        this.node = ui.node;
        
        this.addChild(this.node);
        return true;
    }
});

var Component = cc.Layer.extend({
    node :null,
    ctor: function (type) {
        this._super();
        var component = ccs.load("res/" + type + ".json");
        if (!(component.action && component.node)) {
            console.log("Component " + type + ".json 가 없습니다.");
            return;
        }
        
        var action = component.action;
        if (action) {
            component.node.runAction(action);
            action.gotoFrameAndPlay(0, true);
        }
        
        this.node = component.node;
        
        this.width = 500;
        this.height = 500;
        this.addChild(this.node);
        return true;
    }
});

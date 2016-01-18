var Component = cc.Layer.extend({
    ctor: function (type) {
        this._super();
        var size = cc.director.getWinSize();
        var component = ccs.load("res/" + type + ".json");
        if (!(component.action && component.node)) {
            console.log("Component " + type + ".json 가 없습니다.");
            return;
        }
        
        var action = component.action;
        if (action) {
            component.node.runAction(action);
            component.node.attr({
                scale: 1,
                x: size.width / 2,
                y: size.height / 2,
            });
            action.gotoFrameAndPlay(0, true);
        }
        this.addChild(component.node);
        return true;
    }
});

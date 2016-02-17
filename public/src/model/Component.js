var Component = cc.Layer.extend({
    node: null,
    action: null,
    stateOfMinion: 3,
    paralyze: function() {
        this.action.gotoFrameAndPlay(0, false);
    },
    ctor: function (type) {
        this._super();
        var component = ccs.load("res/minions/" + type + ".json");
        if (!(component.action && component.node)) {
            console.log("Component " + type + ".json 가 없습니다.");
            return;
        }

        this.action = component.action;

        if (this.action) {
            component.node.runAction(this.action);
            this.action.gotoFrameAndPlay(0, true);
        }

        this.node = component.node;

        this.width = 500;
        this.height = 500;
        this.addChild(this.node, 200);
        return true;
    }
});

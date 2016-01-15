var Component = cc.Layer.extend({
    name: "Component",
    type: "Component",
    _animation: null,
    scores: 0,
    images: null,
    description: "",
    appearPosition: cc.p(400, 600),
    active: true,
    bornSprite: null,
    _isRunning : false,
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var animatingMinion = ccs.load("res/Hero.json");
        var action = animatingMinion.action;
        if (action) {
            animatingMinion.node.runAction(action);
            animatingMinion.node.attr({
                scale: 1,
                x: size.width / 2,
                y: size.height / 2,
            });
            action.gotoFrameAndPlay(0, true);
        }
        this.addChild(animatingMinion.node);
        return true;
    }
});

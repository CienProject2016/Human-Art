var Component = cc.Node.extend({
    ref: null,
    stateOfMinion: 2,
    minionHold:false,
    ctor: function (type) {
        this._super();
        this.ref = this;
        
        var res = ccs.load("res/minions/" + type + ".json");
        
        if (!(res.action && res.node)) {
            console.log("Component " + type + ".json 가 없습니다.");
            return;
        }

        if (res.action) {
            res.node.runAction(res.action);
            res.action.gotoFrameAndPlay(0, true);
        }
        
        this.width = 500;
        this.height = 500;
        this.addChild(res.node);
        
        return true;
    },
    getBodyBone: function() {
        return this.ref.children[0].children[0];  
    },
    getBodySprite: function() {
        return this.getBodyBone().children[5];
    },
    getLeftArmSprite: function() {
        return this.getBodyBone().children[0].children[0];
    },
    getRightArmSprite: function() {
        return this.getBodyBone().children[1].children[0];
    },
    getLeftLegSprite: function() {
        return this.getBodyBone().children[2].children[0];
    },
    getRightLegSprite: function() {
        return this.getBodyBone().children[3].children[0];
    },
    getHeadSprite: function() {
        return this.getBodyBone().children[4].children[0];
    },
    addListener: function(listener) {
        cc.eventManager.addListener(minionListener(this), this.getBodySprite());
        cc.eventManager.addListener(minionListener(this), this.getLeftArmSprite());
        cc.eventManager.addListener(minionListener(this), this.getRightArmSprite());
        cc.eventManager.addListener(minionListener(this), this.getLeftLegSprite());
        cc.eventManager.addListener(minionListener(this), this.getRightLegSprite());
        cc.eventManager.addListener(minionListener(this), this.getHeadSprite());
    },
    temporalActions: null,
    paralyze: function() {
        this.temporalActions = this.getActionManager().pauseTarget(this.ref);
    },
    heal: function() {
        this.resume();
        this.getActionManager().resumeTargets(this.temporalActions);
    }
});

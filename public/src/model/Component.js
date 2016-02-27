var Component = cc.Node.extend({
    ref: null,
    owner: null,
    paralyzed: false,

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

    addListener: function (listener) {
        cc.eventManager.addListener(listener(this), this.getBodySprite());
        cc.eventManager.addListener(listener(this), this.getLeftArmSprite());
        cc.eventManager.addListener(listener(this), this.getRightArmSprite());
        cc.eventManager.addListener(listener(this), this.getLeftLegSprite());
        cc.eventManager.addListener(listener(this), this.getRightLegSprite());
        cc.eventManager.addListener(listener(this), this.getHeadSprite());
    },

    addFreeListener: function () {
        this.addListener(minionListener);
    },

    grab: function () {
        if (this.owner != null) {

        }
        else {
            if (this.paralyzed) {
                this.getActionManager().pauseTarget(this.children[0]);
            }
            this.pause();
        }
    },

    release: function () {
        if (this.isOnBoard()) {
            if (!this.paralyzed) {
                this.getActionManager().resumeTarget(this.children[0]);
            }
        }
        else {
            this.resume();
            this.getActionManager().resumeTarget(this.children[0]);
        }
    },

    isOnBoard: function () {
        var fieldHeight = 200;
        return this.getPosition().y > fieldHeight;
    },

    getBodyBone: function () {
        return this.ref.children[0].children[0];
    },
    getBodySprite: function () {
        return this.getBodyBone().children[5];
    },
    getLeftArmSprite: function () {
        return this.getBodyBone().children[0].children[0];
    },
    getRightArmSprite: function () {
        return this.getBodyBone().children[1].children[0];
    },
    getLeftLegSprite: function () {
        return this.getBodyBone().children[2].children[0];
    },
    getRightLegSprite: function () {
        return this.getBodyBone().children[3].children[0];
    },
    getHeadSprite: function () {
        return this.getBodyBone().children[4].children[0];
    },
});

function minionListener(ref) {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                ref.grab();
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
            var delta = touch.getDelta();
            ref.x += delta.x;
            ref.y += delta.y;
        },
        onTouchEnded: function (touch, event) {
            ref.release();
        }
    };
}
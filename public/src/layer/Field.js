var Field = cc.Layer.extend({
    minionNum: 0,
    minions: [],

    ctor: function (fieldId) {
        this._super();
        cc.loader.loadJson("res/json/" + fieldId + ".json", this.init.bind(this));
    },

    init: function (error, data) {
        if (error) {
            console.log(error);
        }
        else {
            this.minionNum = data.minionNum;
        }

        var fieldBG = cc.Sprite.create("res/images/field_background.jpg");
        fieldBG.setAnchorPoint(0, 0);
        fieldBG.setPosition(0, 0);
        this.addChild(fieldBG);

        var size = cc.director.getWinSize();
        var minionHeight = 150;

        for (var i = 0; i < this.minionNum; i++) {
            var type = Math.floor(Math.random() * data.minionNameList.length);
            var newMinion = new Component(data.minionNameList[type]);
            var x = Math.floor(Math.random() * size.width);
            var y = Math.floor((Math.random() * size.height / 10) + size.height / 50);

            newMinion.setPosition(x, y);
            newMinion.setAnchorPoint(0, 0);
            var minionRealWidth = newMinion.getContentSize().width;
            var minionRealHeight = newMinion.getContentSize().height;
            newMinion.children[0].setScale((minionHeight / minionRealWidth) / minionRealHeight * minionRealWidth, minionHeight / minionRealHeight);
            newMinion.runAction(this.makeRandomMove(x, y)).repeatForever();
            newMinion.addListener(minionListener());

            this.minions.push(newMinion);
            this.addChild(newMinion);
        }
    },
    tempAction: null,
    update: function (delta) {
        this.minions.forEach(function (minion) {
            var p = minion.getPosition();
            if (!this.tempAction && !minion.hold) {
                if (p.y > 200) {
                    this.tempAction = minion.runAction(cc.moveBy(0.5, cc.p(0, 100 - p.y)));
                }
                else if (p.y < 0) {
                    this.tempAction = minion.runAction(cc.moveBy(0.5, cc.p(0, 100 - p.y)));
                }
                if (p.x > cc.director.getWinSize().width) {
                    this.tempAction = minion.runAction(cc.moveBy(0.5, cc.p(cc.director.getWinSize().width - p.x, 0)));
                }
                else if (p.x < 0) {
                    this.tempAction = minion.runAction(cc.moveBy(0.5, cc.p(-p.x, 0)));
                }
            }
            else {
                if (this.tempAction) {
                    if (this.tempAction.isDone()) {
                        this.tempAction = null;
                    }
                }
            }
        })
    },
    makeRandomMove: function (x, y) {
        var size = cc.director.getWinSize();
        var speed1 = Math.floor((Math.random() * 5 + 5));
        var speed2 = (size.width - x) / size.width * speed1
        var speed3 = x / size.width * speed1;
        var movement1 = cc.MoveBy.create(speed2, cc.p(size.width - x, y));
        var movement2 = cc.MoveBy.create(speed1, cc.p(-size.width, -y));
        var movement3 = cc.MoveBy.create(speed3, cc.p(x, y));
        return cc.Sequence.create(movement1, movement2, movement3);
    },
    getMinion: function (i) {
        return this.minions[i];
    },
    getMinionsNum: function () {
        return this.minions.length;
    }
});
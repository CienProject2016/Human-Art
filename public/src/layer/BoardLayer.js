var BoardLayer = cc.Layer.extend({
    minionNum: 0,
    minions: [],

    ctor: function (fieldId) {
        this._super();
        cc.loader.loadJson("res/json/" + fieldId + ".json", this.init.bind(this));
    },

    init: function (error, data) {
        if (error) console.log(error);
        else this.minionNum = data.minionNum;

        this.addChild(this.makeBoardBackground(), ZORDER.BOARD);
        this.addChild(this.makeFieldBackground(), ZORDER.FIELD);

        for (var i = 0; i < this.minionNum; i++) {
            var type = Math.floor(Math.random() * data.minionNameList.length);
            var newMinion = this.makeRandomMinion(data.minionNameList[type]);

            this.minions.push(newMinion);
            this.addChild(newMinion, ZORDER.FIELD);
        }
    },

    update: function (delta) {
        this.minions.forEach(function (minion) {
            var p = minion.getPosition();
            if (!minion.tempAction && !minion.owner) {
                if (p.y > 200) {
                    minion.tempAction = minion.runAction(cc.moveBy(0.5, cc.p(0, 100 - p.y)));
                }
                else if (p.y < 0) {
                    minion.tempAction = minion.runAction(cc.moveBy(0.5, cc.p(0, 100 - p.y)));
                }
                if (p.x > cc.director.getWinSize().width) {
                    minion.tempAction = minion.runAction(cc.moveBy(0.5, cc.p(cc.director.getWinSize().width - p.x, 0)));
                }
                else if (p.x < 0) {
                    minion.tempAction = minion.runAction(cc.moveBy(0.5, cc.p(-p.x, 0)));
                }
            }
            else {
                if (minion.tempAction) {
                    if (minion.tempAction.isDone()) {
                        minion.tempAction = null;
                    }
                }
            }
        })
    },

    makeBoardBackground: function () {
        var winSize = cc.director.getWinSize();
        var bgSprite = cc.Sprite.create("res/images/colorbg.jpg");
        bgSprite.setPosition(winSize.width / 2, -winSize.height * 1.2);

        var movebg = cc.MoveBy.create(10, cc.p(0, winSize.height * 3.5));
        var movebg1 = cc.MoveBy.create(0, cc.p(0, -winSize.height * 3.5));
        var bgsequence = cc.Sequence.create(movebg, movebg1);
        bgSprite.runAction(bgsequence).repeatForever();
        bgSprite.setScale(1.0);
        return bgSprite;
    },

    makeFieldBackground: function () {
        var fieldBG = cc.Sprite.create("res/images/field_background.jpg");
        fieldBG.setAnchorPoint(0, 0);
        fieldBG.setPosition(0, 0);
        return fieldBG;
    },

    makeRandomMinion: function (type) {
        var winSize = cc.director.getWinSize();
        var minionHeight = 150;

        var minion = new Component(type);
        var x = Math.floor(Math.random() * winSize.width);
        var y = Math.floor((Math.random() * winSize.height / 10) + winSize.height / 50);

        minion.setPosition(x, y);
        minion.setAnchorPoint(0, 0);
        var minionRealWidth = minion.getContentSize().width;
        var minionRealHeight = minion.getContentSize().height;
        minion.children[0].setScale((minionHeight / minionRealWidth) / minionRealHeight * minionRealWidth, minionHeight / minionRealHeight);
        minion.runAction(this.makeRandomMove(x, y)).repeatForever();
        minion.addFreeListener();

        return minion;
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
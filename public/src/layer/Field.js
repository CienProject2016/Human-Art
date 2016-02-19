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
            data.minions.forEach(function (name) {
                this.minions.push(new Component(name));
            }, this);
        }

        var fieldBG = cc.Sprite.create("res/images/field_background.jpg");
        fieldBG.setAnchorPoint(0, 0);
        fieldBG.setPosition(0, 0);
        this.addChild(fieldBG);

        for (var i = 0; i < this.minions.length; i++) {
            var size = cc.director.getWinSize();
            var x = Math.floor((Math.random() * size.width));
            var y = Math.floor((Math.random() * size.height / 10) + size.height / 50);
            this.minions[i].setPosition(x, y);
            this.minions[i].setAnchorPoint(0, 0);
            var minWidth = this.minions[i].getContentSize().width;
            var minHeight = this.minions[i].getContentSize().height;
            this.minions[i].children[0].setScale((150 / minWidth) / minHeight * minWidth, 150 / minHeight);
            this.minions[i].runAction(this.makeRandomMove(x, y)).repeatForever();
            this.minions[i].addListener(minionListener());
            this.addChild(this.minions[i]);
        }
    },
    
    update: function (delta) {
        this.minions.forEach(function (minion) {
            var p = minion.getPosition();
            if (p.y > 200) {
                minion.runAction(cc.MoveBy.create(0, cc.p(0, -50)));
            }
            if (p.y < 0) {
                minion.runAction(cc.MoveBy.create(0, cc.p(0, 50)));
            }
            if (p.x > cc.director.getWinSize().width) {
                minion.runAction(cc.MoveBy.create(0, cc.p(-30, 0)));
            }
            if (p.x < 0) {
                minion.runAction(cc.MoveBy.create(0, cc.p(30, 0)));
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
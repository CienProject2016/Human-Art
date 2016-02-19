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

        for (var i = 0; i < this.minions.length; i++) {
            this.minions[i].runAction(this.makeRandomMove()).repeatForever();
            this.minions[i].addListener(minionListener());
            this.minions[i].setPosition(500, 200);
            this.addChild(this.minions[i]);
        }
    },
    update: function (delta) {
        this.minions.forEach(function (minion) {
            var p = minion.getPosition();
            if (p.y > 200) {
                minion.runAction(cc.MoveBy.create(1, cc.p(0, 0)));
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
    makeRandomMove: function() {
        var size = cc.director.getWinSize();
        var x = Math.floor((Math.random() * size.width));
        var y = Math.floor((Math.random() * size.height / 10) + size.height / 50);

        var ms = Math.floor((Math.random() + 1));
        var mas = (size.width - x) / size.width * ms
        var m2s = x / size.width * ms;

        var move = cc.MoveBy.create(5, cc.p(size.width - x, y));
        var moveaway = cc.MoveBy.create(5, cc.p(-size.width, -y));
        var move2 = cc.MoveBy.create(5, cc.p(x, y));

        return cc.Sequence.create(move, moveaway, move2);
    },
    getMinion: function (i) {
        return this.minions[i];
    },
    getMinionsNum: function () {
        return this.minions.length;
    }
});
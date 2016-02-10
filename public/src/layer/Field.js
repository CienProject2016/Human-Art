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

        var size = cc.director.getWinSize();
        for (var i = 0; i < this.minions.length; i++) {
            var x = Math.floor((Math.random() * size.width));
            var y = Math.floor((Math.random() * size.height / 10) + size.height / 50);

            var ms = Math.floor((Math.random() + 1));
            var mas = (size.width - x) / size.width * ms
            var m2s = x / size.width * ms;

            var move = cc.MoveBy.create(mas, cc.p(size.width - x, y));
            var moveaway = cc.MoveBy.create(ms, cc.p(-size.width, -y));
            var move2 = cc.MoveBy.create(m2s, cc.p(x, y));

            var minSeq = cc.Sequence.create(move, moveaway, move2);

            this.minions[i].runAction(minSeq).repeatForever();

            this.addChild(this.minions[i], 500);
        }
    },
    update: function (delta) {
        this.minions.forEach(function (minion) {
            var p = minion.getPosition();
            if (p.y > 400) {
                minion.runAction(cc.MoveBy.create(0, cc.p(0, -100)));
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
    getMinion: function (i) {
        return this.minions[i];
    },
    getMinionsNum: function () {
        return this.minions.length;
    }
});
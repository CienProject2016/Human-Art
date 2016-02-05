var Board = cc.Layer.extend({
    id: null,
    name: null,
    componentList: [],
    userList: [],
    ctor: function (boardId) {
        this._super();
        this.init(boardId);
    },
    
   minions : [
            cc.Sprite.create("res/minion.png"),
            cc.Sprite.create("res/test_minion_body.png"),
            cc.Sprite.create("res/test_minion_l_arm.png")
        ],
    
    init: function (boardId) {
        this.id = boardId;
        this._super();
        var size = cc.director.getWinSize();
        console.log("boardId : ");
        console.log(this.id);
        var bgSprite = cc.Sprite.create("res/colorbg.jpg");
        bgSprite.setPosition(size.width / 2, size.height / 8);

        var movebg = cc.MoveBy.create(10, cc.p(0, size.height));
        var movebg1 = cc.MoveBy.create(0, cc.p(0, -size.height));
        var bgsequence = cc.Sequence.create(movebg, movebg1);
        bgSprite.runAction(bgsequence).repeatForever();

        bgSprite.setScale(1.0);
        this.addChild(bgSprite, 0);

        var ui = new Ui("menu");
        this.addChild(ui);

        var component = new Component("hourse");
        if (component.childrenCount != 0) {
            cc.eventManager.addListener(cc.EventListener.create(minionListenerObject()), component);
            console.log(component.getContentSize());
            this.addChild(component);
        }

        var component2 = new Component("skeleton1");
        cc.eventManager.addListener(cc.EventListener.create(minionListenerObject()), component2);
        this.addChild(component2);


        var label = cc.LabelTTF.create("Hello World", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);



        
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

        this.scheduleUpdate();
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

                    minion.runAction(cc.MoveBy.create(0, cc.p(-30,0)));

                }
                if (p.x < 0) {

                    minion.runAction(cc.MoveBy.create(0, cc.p(30, 0)));
                }
            });
        },
    


    onEnter: function () {
        this._super();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
        }, this);
    },

    onTouchBegan: function (touch, event) {
        var tp = touch.getLocation();
        console.log('onTouchBegan:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
        return true;
    },

    onTouchMoved: function (touch, event) {
        var tp = touch.getLocation();
        console.log('onTouchMOved:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
    },

    onTouchEnded: function (touch, event) {
        var tp = touch.getLocation();
        console.log('onTouchEnded:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
    }
});

Board.scene = function (boardId) {
    var scene = new cc.Scene;
    var board = new Board(boardId);
    scene.addChild(board);

    return scene;
};

function minionListenerObject() {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                target.opacity = 180;
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
            var target = event.getCurrentTarget();
            var delta = touch.getDelta();
            target.x += delta.x;
            target.y += delta.y;
        },
        onTouchEnded: function (touch, event) {
            var target = event.getCurrentTarget();
            cc.log("sprite onTouchesEnded.. ");
            target.setOpacity(255);
        }
    };
}

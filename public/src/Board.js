var Board = cc.Layer.extend({
    id:null,
    name:null,
    componentList:[],
    userList:[],
    ctor: function (boardId) {
        this._super();
        this.init(boardId);
    },
    init: function (boardId) {
        this.id = boardId;
        this._super();
        var size = cc.director.getWinSize();
        console.log("boardId : ");
        console.log(this.id);
        var bgSprite = cc.Sprite.create("res/colorbg.jpg");
        bgSprite.setPosition(size.width / 2, size.height / 2);
        bgSprite.setScale(1.0);
        this.addChild(bgSprite, 0);

        var component = new Component("Hero");
        if (component.childrenCount != 0) {
            cc.eventManager.addListener(minionListener, component);
            console.log(component.getContentSize());
            this.addChild(component);
        }

        var label = cc.LabelTTF.create("Hello World", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);
        
        var mySprite = cc.Sprite.create("res/minion.png"); 
        mySprite.setPosition(cc.p(size.width/4 , size.height / 4)); // 스프라이트  포지션  오른쪽 아래로
        this.addChild(mySprite);
        
        console.log(this);
        var bombTool = new Tool("bomb");
        
        this.addChild(bombTool, 2);
        
        var moveToRight = cc.MoveBy.create(1, cc.p(size.width - mySprite.getPosition().x, 0)); //스프라이트 윈도우 사이즈 - 스프라이트 포지션 만큼 오른쪽으로 움직임 
        mySprite.runAction(moveToRight);
        var moveToLeft = cc.MoveBy.create(1, cc.p(-size.width, 0)); //스프라이트 윈도사이즈 만큼 왼쪽으로 움직임 
        var moveToOrigin = cc.MoveBy.create(1, cc.p(mySprite.getPosition().x, 0)); //스프라이트 포지션만큼 오른쪽으로 움직임 
        var moveSeq = cc.Sequence.create(moveToRight, moveToLeft, moveToOrigin); //무브투 3개 합친 시퀀스 

        mySprite.runAction(moveSeq).repeatForever();
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

var minionListener = cc.EventListener.create({
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
});
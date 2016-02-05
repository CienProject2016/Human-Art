
var Board = cc.Layer.extend({
    id: null,
    name: null,
    componentList: [],
    userList: [],
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
        bgSprite.setPosition(size.width / 2, size.height / 8);

        var movebg = cc.MoveBy.create(10, cc.p(0, size.height));
        var movebg1 = cc.MoveBy.create(0, cc.p(0, -size.height));
        var bgsequence = cc.Sequence.create(movebg, movebg1);
        bgSprite.runAction(bgsequence).repeatForever();

        bgSprite.setScale(1.0);
        this.addChild(bgSprite, 0);

        var ui = new Ui("menu2");
        this.addChild(ui);

        var item = new Ui("item2");
        this.addChild(item);

        item.visible = false;

        //item.visible=false;
      
        
      
         
        console.log(this);
        // console.log(ui.children[0].children[4]);
        
        //  var button1 = ui.children[0].children[2].children[0];
     
     
         
        var button1 = ui.children[0].children[2];
        cc.eventManager.addListener(cc.EventListener.create(listener(item)), button1);
             
        var button2 = ui.children[0].children[3];
        cc.eventManager.addListener(cc.EventListener.create(listener(item)), button2);
        
        var button3 = ui.children[0].children[4];
        cc.eventManager.addListener(cc.EventListener.create(listener(item)), button3);

        var backButton = item.children[0].children[9];
        cc.eventManager.addListener(cc.EventListener.create(listener(item)), backButton);



        this.scheduleOnce(this.remove, 30);


        //  var component = new Component("hourse");
        // if (component.childrenCount != 0) {
        //     cc.eventManager.addListener(cc.EventListener.create(minionListenerObject()), component);
        // console.log(component.getContentSize());
        //      this.addChild(component);
        //   }

        //  var component2 = new Component("skeleton1");
        // cc.eventManager.addListener(cc.EventListener.create(minionListenerObject()), component2);
        //   this.addChild(component2);


        // var label = cc.LabelTTF.create("Hello World", "Arial", 40);
        //  label.setPosition(size.width / 2, size.height / 2);
        // this.addChild(label, 1);

        //  var mySprite = cc.Sprite.create("res/minion.png");
        //  mySprite.setPosition(cc.p(size.width / 4, size.height / 4)); // 스프라이트  포지션  오른쪽 아래로
        //   this.addChild(mySprite);
       
        //  console.log(this);
        // var bombTool = new Tool("bomb");
        //console.log("bombtool: --");
        // console.log(bombTool.width);
        
        // bombTool.setPosition(cc.p(size.width/3, size.height/3));
        //this.addChild(bombTool);
        
        // var moveToRight = cc.MoveBy.create(1, cc.p(size.width - mySprite.getPosition().x, 0)); //스프라이트 윈도우 사이즈 - 스프라이트 포지션 만큼 오른쪽으로 움직임 
        // mySprite.runAction(moveToRight);
        // var moveToLeft = cc.MoveBy.create(1, cc.p(-size.width, 0)); //스프라이트 윈도사이즈 만큼 왼쪽으로 움직임 
        // var moveToOrigin = cc.MoveBy.create(1, cc.p(mySprite.getPosition().x, 0)); //스프라이트 포지션만큼 오른쪽으로 움직임 
        //  var moveSeq = cc.Sequence.create(moveToRight, moveToLeft, moveToOrigin); //무브투 3개 합친 시퀀스 

        //  mySprite.runAction(moveSeq).repeatForever();
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
        //console.log('onTouchBegan:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
        return true;
    },

    onTouchMoved: function (touch, event) {
        var tp = touch.getLocation();
        //console.log('onTouchMOved:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
    },

    onTouchEnded: function (touch, event) {
        var tp = touch.getLocation();
        // console.log('onTouchEnded:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
    },
    remove: function () {
        //this.removeAllChildren(true);
        this.removeChildByTag(522, true);
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
                // cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
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
            // cc.log("sprite onTouchesEnded.. ");
            target.setOpacity(255);
        }
    };
};

function listener(item) {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {


            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            console.log(locationInNode);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("clicked");
                item.visible = !item.visible;
                // if (item.visible == true) {
                //     item.visible = false;
                //     cc.eventManager.pauseTarget(item, true);

                // }
                // else {
                //     item.visible = true;
                //     cc.eventManager.resumeTarget(item, true);
                // }

                return true;

            }

        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            return false;
        }
    };
}


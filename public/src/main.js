var g_mainmenu = [
    "res/HelloWorld.png", "res/Hero.json"
]
var GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();
        var size = cc.director.getWinSize();

        var bgSprite = cc.Sprite.create("res/colorbg.jpg");
        bgSprite.setPosition(size.width / 2, size.height / 2);
        bgSprite.setScale(1.0);
        this.addChild(bgSprite, 0);

        var component = new Component();
        this.addChild(component);
        cc.eventManager.addListener(minionListener, component);
        var label = cc.LabelTTF.create("Hello World", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);
        
        //////
        this.my_sprite = cc.Sprite.create("res/minion.png"); 
        this.my_sprite.setPosition(cc.p(size.width/4 , size.height / 4)); // 스프라이트  포지션  오른쪽 아래로
        this.addChild(this.my_sprite);
        
        var movetoright = cc.MoveBy.create(1, cc.p(size.width - this.my_sprite.getPosition().x, 0)); //스프라이트 윈도우 사이즈 - 스프라이트 포지션 만큼 오른쪽으로 움직임 
        this.my_sprite.runAction(movetoright);
        var movetoleft = cc.MoveBy.create(1, cc.p(-size.width, 0)); //스프라이트 윈도사이즈 만큼 왼쪽으로 움직임 
        var movetoorigin = cc.MoveBy.create(1, cc.p(this.my_sprite.getPosition().x, 0)); //스프라이트 포지션만큼 오른쪽으로 움직임 
        var sequence = cc.Sequence.create(movetoright, movetoleft, movetoorigin); //무브투 3개 합친 시퀀스 

        this.my_sprite.runAction(sequence).repeatForever();

        ///////

    
    
        
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

GameLayer.scene = function () {
    var scene = new cc.Scene;
    var layer = new GameLayer();
    scene.addChild(layer);

    return scene;
};

window.onload = function () {

    cc.game.onStart = function () {
        cc.view.adjustViewPort(false);

        cc.view.resizeWithBrowserSize(true);
        var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.SHOW_ALL);
        cc.view.setDesignResolutionSize(1920, 1080, policy)
        //load resources
        cc.LoaderScene.preload(g_mainmenu, function () {
            cc.director.runScene(GameLayer.scene());
        }, this);
    };
    cc.game.run("gameCanvas");
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
/* global ZORDER */
var Board = cc.Layer.extend({
    id: null,
    name: null,
    electricPowerLabel: 0,
    usingToolImage: null,
    field: null,
    ui: null,
    ctor: function (boardId) {
        this._super();
        this.init(boardId);
    },
    makeBackground: function() {
        var size = cc.director.getWinSize();
        var bgSprite = cc.Sprite.create("res/images/colorbg.jpg");
        bgSprite.setPosition(size.width / 2, -size.height * 1.2);

        var movebg = cc.MoveBy.create(10, cc.p(0, size.height * 3.5));
        var movebg1 = cc.MoveBy.create(0, cc.p(0, -size.height * 3.5));
        var bgsequence = cc.Sequence.create(movebg, movebg1);
        bgSprite.runAction(bgsequence).repeatForever();
        bgSprite.setScale(1.0);
        return bgSprite;
    },
    init: function (boardId) {
        this._super();
        this.id = boardId;
        var size = cc.director.getWinSize();
        
        this.addChild(this.makeBackground(), ZORDER.BACKGROUND);
        
        // Field
        this.field = new Field("field");
        this.addChild(this.field, ZORDER.FIELD);
        
        // UI
        this.ui = new UI();
        this.addChild(this.ui, ZORDER.UI);

        // ActiveItem (Temporary)
        var activeItem = new ActiveItem("generator");
        console.log(activeItem.name);
        activeItem.setListener();
        activeItem.setPosition(size.width / 10, size.height * 1 / 4);
        this.addChild(activeItem, ZORDER.ACTIVEITEM, "activeItem");

        this.scheduleUpdate();
    },
    update: function (delta) {
        this.ui.update(delta);
        this.field.update(delta);
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
        return false;
    },
    onTouchMoved: function (touch, event) {
    },
    onTouchEnded: function (touch, event) {
    },
});

Board.scene = function (boardId) {
    var scene = new cc.Scene;
    var board = new Board(boardId);
    scene.addChild(board);

    return scene;
};

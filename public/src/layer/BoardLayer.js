/* global ZORDER */
var BoardLayer = cc.Layer.extend({
    id: null,
    name: null,
    electricPowerLabel: 0,
    usingToolImage: null,
    ctor: function (boardId) {
        this._super();
        this.init(boardId);
    },
    makeBackground: function () {
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
        this.id = boardId;

        this.addChild(this.makeBackground(), ZORDER.BACKGROUND);
        
        // this.field = new FieldLayer("field");
        // this.addChild(this.field, ZORDER.FIELD);

        // this.inventory = new InventoryLayer();
        // // this.inventory.setVisible(false);
        // this.addChild(this.inventory, ZORDER.UI);
        
        // this.ui = new UILayer();
        // this.addChild(this.ui, ZORDER.UI);
        
    },
    
    update: function (delta) {
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
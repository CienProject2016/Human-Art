var MainLayer = cc.Layer.extend({
    boardLayer: null,
    fieldLayer: null,
    uiLayer: null,

    ctor: function () {
        this._super();

        this.boardLayer = new BoardLayer("field");
        this.uiLayer = new UILayer();

        this.addChild(this.boardLayer);
        this.addChild(this.uiLayer, ZORDER.UI);

        this.scheduleUpdate();
    },

    update: function (delta) {
        this.boardLayer.update(delta);
        this.uiLayer.update(delta);
    }
});

MainLayer.scene = function (boardId) {
    var scene = new cc.Scene;
    var mainLayer = new MainLayer(boardId);
    scene.addChild(mainLayer);
    return scene;
}
var ActiveItem = cc.Sprite.extend({
    name: "",
    maxHealth: 150,
    health: 150,
    ctor: function (name) {
        this._super("res/activeItem/" + name + ".png");
        this.name = name;
        console.log(this.name);
        this.scheduleUpdate();
    },
    setListener: function (board, timer) {
        switch (this.name) {
            case "generator":
                cc.eventManager.addListener(cc.EventListener.create(generatorListener(this)), this);
                break;
            case "ufo":
                cc.eventManager.addListener(cc.EventListener.create(ufoListener(this, board, timer)), this);
                break;
        }
    }
});
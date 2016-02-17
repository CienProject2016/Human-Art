var ActiveItem = cc.Sprite.extend({
    name: "",
    ctor: function (name) {
        this._super("res/activeItem/" + name + ".png");
        this.name = name;
        console.log(this.name);
    },
    setListener: function () {
        switch (this.name) {
            case "generator":
                cc.eventManager.addListener(cc.EventListener.create(generatorListener(this)), this);
                break;
            case "generator2":
                cc.eventManager.addListener(cc.EventListener.create(generatorListener(this)), this);
                break;
        }
    }
});
var ActiveItem = cc.Sprite.extend({
    name : "",
    ctor: function (name) {
        this._super("res/activeItem/" + name + ".png");
        this.name = name;
    },
    setListener : function(){
        switch(this.name){
            case "generator" : 
               cc.eventManager.addListener(cc.EventListener.create(generatorListener(this)), this);
               break;
            
        }
    }
});
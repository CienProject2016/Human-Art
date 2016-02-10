var User = (function(){
    var instance;
    User = function User(){
        return instance;
    };
    User.prototype =this;
    instance = new User();
    instance.constructor = User();
        
    this.id = null,
    this.session = null,
    this.electricPower = new ElectricPower(100),
    this.usingTool = new Tool("hand"),
    this.score = new Score(0)
    return instance;
})();
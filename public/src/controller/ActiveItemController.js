var ActiveItemController = (function(){
    var instance;
    ActiveItemController = function ActiveItemController(){
        return instance;
    };
    ActiveItemController.prototype =this;
    instance = new ActiveItemController();
    instance.constructor = ActiveItemController();
    
    this.setElectricPower = function(electricPower){
        var currentElectricPower = User.electricPower.getCurrentElectricPower();
        User.electricPower.setCurrentElectricPower(currentElectricPower+electricPower);
    };
    
    this.showUfo = function(board, ufo){
        board.schedule(function(){
           ufo.setVisible(true); 
        });
        
        board.schedule(function(){
             var ufoSound1 = new Audio("res/music/ufo_01.mp3");
             ufoSound1.play();
        },4);
        
         var ufoHealthLabel = cc.LabelTTF.create(ufo.health+ " / " +ufo.maxHealth, "Arial", 40);
         ufoHealthLabel.setPosition(300, 0);
         ufoHealthLabel.setColor(cc.color.GREEN);
         ufo.addChild(ufoHealthLabel, ZORDER.HEALTH_LABEL, "ufoHealthLabel");
        
        board.schedule(function(){
            var ufoSound2 = new Audio("res/music/ufo_02.mp3");
            ufoSound2.play();
        },5);
        
       
        
        board.schedule(function(){
             var posX = ufo.x;
             var posY = ufo.y;
             var randomX = Math.floor(Math.random() * 900) + 100;
             var randomY = Math.floor(Math.random() * 400) + 50;
             if(posX > 960){
                 console.log(posX);
                 randomX = -randomX;
             }
             if(posY > 560){
                 console.log(posY);
                 randomY = -randomY;
             }
             var moveAction = cc.MoveBy.create(2, cc.p(randomX, randomY)); 
             ufo.runAction(moveAction);
        }, 5)
        
       
    }
    return instance;
})();
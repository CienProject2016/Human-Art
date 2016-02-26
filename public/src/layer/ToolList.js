var ToolList = cc.Layer.extend({
    //Javscript는 다차원 배열을 지원하지않음, 따라서 명시적으로 선언해둘 필요가 있음(지울시 undefined에러 발생)
    toolNameList : [["hand","bomb","absorber"],[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]],
    ctor : function(){
        this._super();
        var visibleSize = cc.director.getWinSize();
        var toolList = cc.Sprite.create("res/ui/tool/toolList.png"); 
        var exitButton = cc.Sprite.create("res/ui/tool/exitButton.png");
        toolList.setPosition(visibleSize.width * 0.1, visibleSize.height * 0.1);
        exitButton.setPosition(visibleSize.width * 0.28, visibleSize.height * 0.48);
        
        var row = 4;
        var column = 3;
        for(var i=0; i<row;i++){
            for(var j=0; j<column;j++){
                if(typeof(this.toolNameList[i][j])!='undefined' && this.toolNameList[i][j] !=null){
                    var toolImage = cc.Sprite.create("res/tools/"+this.toolNameList[i][j]+".png");
                    toolImage.setPosition(-visibleSize.width * 0.034 + visibleSize.width * 0.133 * j, visibleSize.height * 0.32 - visibleSize.height * 0.175 * i);
                    this.addChild(toolImage, 10000);
                    cc.eventManager.addListener(cc.EventListener.create(chooseToolListener(this.toolNameList[i][j])), toolImage);
                }               
            }
        }    
        
        cc.eventManager.addListener(cc.EventListener.create(exitButtonListener(this)), exitButton);
        this.addChild(toolList);
        this.addChild(exitButton);
    }
}); 

function chooseToolListener(toolName) {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
           var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();

            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {         
                var newTool = new Tool(toolName);
                User.usingTool = newTool;
                return true;
            }
            return false;           
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            return false;
        }
    };
}

function exitButtonListener(toolList){
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);    
            if (cc.rectContainsPoint(rect, locationInNode)) { 
                var size = cc.director.getWinSize();
                toolList.setPosition(-size.width, -size.height);
                toolList.setVisible(false);
            }
            
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            return false;
        }
    };
}
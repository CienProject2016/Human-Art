var Component = cc.Layer.extend({ //layer에 상속.
    ctor: function (type) {
        
        this._super();//layer 생성자 호출.
        
        var size = cc.director.getWinSize(); //cc-> cocos
        
        var component = ccs.load("res/" + type + ".json");// ccs->cocostudio     
        if (!(component.action && component.node)) { //action 과 node 가 같지 않을 시 
            console.log("Component " + type + ".json 가 없습니다.");//'json이 없습니다'
            return;
        }
        
        var action = component.action;  
        if (action) {  //action을 실행시 (null 인 경우가 아직 없음.)
            component.node.runAction(action); //구체적인 어떤 액션?.?
            component.node.attr({
                scale: 1,//규모.
                x: size.width / 2,//가로.
                y: size.height / 2,//세로.
            });
            action.gotoFrameAndPlay(0, true);//ccs에 제작한 프레임을 재생함.
        }
        
        this.addChild(component.node); //배열에 첨가.
        
        return true;
    }
}
);

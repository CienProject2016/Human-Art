var Tool = function(name) {
    
}

// var Tool = cc.Sprite.extend({
//     requiredElectricPower: null,
//     name: "",

//     ctor: function (name) {
//         console.log("new tool: " + name);
//         this._super("res/tools/" + name + ".png");
//         this.name = name;

//         this.setListener(name);
//     },

//     setListener: function (name) {
//         switch (name) {
//             case "hand":
//                 cc.eventManager.addListener(handListener(this), this);
//                 break;
//             case "absorber":
//                 cc.eventManager.addListener(absorberListener(this), this);
//                 break;
//             case "bomb":
//                 cc.eventManager.addListener(bombListener(this), this);
//                 break;
//         }

//     }
// });
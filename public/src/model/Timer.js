var Timer = cc.Layer.extend({
    maxTime: 0,
    time: 0,
    state:0,
    board: null,
    name: "",
    ctor: function (board, timerName, time) {
        this.board = board;
        this._super();
        this.name = timerName;
        this.init(board, timerName, time);
    },
    init: function (board, timerName, time) {
        this.maxTime = time;
        this.time = time;
        this.state = TIMER_STATE.TIMER_IS_ON;
        var timerFrame = cc.Sprite.create("res/activeItem/timer_frame.png");
        this.addChild(timerFrame);

        var activeItemIcon = cc.Sprite.create("res/activeItem/" + timerName + "_icon.png");
        activeItemIcon.setPosition(-70, 5);
        this.addChild(activeItemIcon);

        var timerMinute = Math.floor(this.time / 60);
        var timerSecond = this.time % 60;
        var timerLabel = cc.LabelTTF.create(timerMinute + " : " + timerSecond, "Arial", 30);
        timerLabel.setPosition(50, 0);
        this.addChild(timerLabel, ZORDER.ACTIVEITEM, "timerLabel");
        this.schedule(function () {
            this.time--;
        }, 1);
        this.scheduleUpdate();
    },
    restartTimer: function () {
        this.time = this.maxTime;
        this.state = TIMER_STATE.TIMER_IS_ON;
        this.scheduleUpdate();
    },
    update: function (delta) {
        var timerMinute = Math.floor(this.time / 60);
        var timerSecond = this.time % 60;
        var timerLabel = this.getChildByName("timerLabel");
        timerLabel.setString(timerMinute + " : " + timerSecond);
        if (this.time <= 0) {
            this.state = TIMER_STATE.WAITING_FOR_SPAWN;
            this.unscheduleUpdate();
            timerLabel.setString("출현!");
        }
    }
});
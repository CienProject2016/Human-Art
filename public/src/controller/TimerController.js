var TimerController = (function () {
    var instance;
    TimerController = function TimerController() {
        return instance;
    };
    TimerController.prototype = this;
    instance = new TimerController();
    instance.constructor = TimerController();

    this.checkActiveItemSpawnTime = function (board, timer) {
        switch (timer.state) {
            case TIMER_STATE.WAITING_FOR_SPAWN:
                this.spawnActiveItem(board, timer);
                break;
            case TIMER_STATE.TIMER_IS_ON:
                break;
            case TIMER_STATE.ACTIVE_ITEM_IS_EXIST:
                break;
            case TIMER_STATE.TIMER_HAVE_TO_RESTART:
                this.restartTimer(timer);
                break;
        }
    };
    this.spawnActiveItem = function (board, timer) {
        switch (timer.name) {
            case "ufo":
                var size = cc.director.getWinSize();
                var ufo = new ActiveItem("ufo");
                ufo.setPosition(size.width * 0.2, size.height * 0.3);
                ufo.setListener(board,timer);
                board.addChild(ufo, ZORDER.ACTIVEITEM, "ufo");
                ActiveItemController.showUfo(board, ufo);
                break;
        }
        timer.state = TIMER_STATE.ACTIVE_ITEM_IS_EXIST;
    };
    this.restartTimer = function (timer) {
        timer.restartTimer();
    };
    return instance;
})();
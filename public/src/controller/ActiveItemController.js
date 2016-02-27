var ActiveItemController = (function () {
    var instance;
    ActiveItemController = function ActiveItemController() {
        return instance;
    };
    ActiveItemController.prototype = this;
    instance = new ActiveItemController();
    instance.constructor = ActiveItemController();

    this.setElectricPower = function (electricPower) {
        var currentElectricPower = User.electricPower.getCurrentElectricPower();
        User.electricPower.setCurrentElectricPower(currentElectricPower + electricPower);
    };
    return instance;
})();
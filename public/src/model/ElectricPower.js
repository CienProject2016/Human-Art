var ElectricPower = function(currentElectricPower) {
    this.minimumElectricPower = 0;
    this.maximumElectricPower = 100;
    this.currentElectricPower = currentElectricPower; 
    this.getCurrentElectricPower = function(){
        return this.currentElectricPower;
    }
}
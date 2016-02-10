function ResourceManager() {

}

ResourceManager.prototype.loadJson = function (filename) {
    var jsonObject = {};
    cc.loader.loadJson("res/" + filename, function (error, data) {
        if (error) {
            console.log("load " + filename + " failed");
            console.log(error);
        }
        else {
            console.log("load " + filename);
            jsonObject = data;
        }
    });
    return jsonObject;
}

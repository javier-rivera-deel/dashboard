var auxFunctions = {
    subArray: function (obj) {
        var subArray = [];
        subArray = obj.map(function (ob) {
        var tempObj;
        tempObj = ob.categoria;
        return tempObj;
    });
    return subArray;
    }
}
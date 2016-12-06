function subArray(mainObject){
    var subArray = [];
    subArray = mainObject.map(function(obj){
        var tempObj;
        tempObj = obj.categoria;
        return tempObj;
    });
    return subArray;
};






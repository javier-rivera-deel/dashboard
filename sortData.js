function sortData(data){
    var dataEnd;
    var dataAux;
    for (var i in data) {
        if (data[i].categoria === "OTROS") {
            var aux = data[data.length - 1];
            data[data.length - 1] = data[i];
            data[i] = aux;
            break;
        }
    }
    dataEnd = data[data.length - 1];
    dataAux = data.splice(0, data.length - 1);
    dataAux.sort(function (a, b) {
        return b.saldo.valor - a.saldo.valor;
    });
    dataAux.push(dataEnd);
    data = dataAux;
    return data;
};
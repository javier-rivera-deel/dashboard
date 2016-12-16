var auxFunctions = {
    subArray: function (arr, prop) {
        var newArr = [];
        newArr = arr.map(function (x) {
            return x[prop];
        });
        return newArr;
    },
    valoresHistoricos: function (historico) {
        var valoresMensuales = [];
        var meses = [];
        var max;
        var labels = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        if (historico.length > 12) {
            historico = historico.slice(Math.max(historico.length - 12));
        };
        valoresMensuales = historico.map(function (val) {
            return val.importe.valor;
        });
        $.each(historico, function (pos) {
            meses[pos] = labels[parseFloat(historico[pos].mes) - 1] + " " + historico[pos].anio;
            // valoresMensuales[pos] = historico[pos].importe.valor;
        });
        valoresMensuales.unshift(historico[0].importe.valor);
        //console.log(valoresMensuales.length);
        return {
            valoresMensuales: valoresMensuales
            , meses: meses
            , max: Math.max.apply(null, valoresMensuales)
        };
    }, 
    sortData: function sortData(data) {
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
    },
    printImgEl: function (arrayOfsrc) {
        $.each(arrayOfsrc, function (el) {
            var imageContainer = document.createElement("div");
            var imageIcon = document.createElement("img");
            $(imageIcon).appendTo(imageContainer).attr({
                "id": "icon-place"
                , "src": arrayOfsrc[el]
            }).addClass("center-adjust relative img-responsive");
            $(imageContainer).appendTo($(".slider"));
        });
    }
}; // end of object
var auxFunctions = {
    subArray: function (obj) {
        var subArray = [];
        subArray = obj.map(function (ob) {
            var tempObj;
            tempObj = ob.categoria;
            return tempObj;
        });
        return subArray;
    },
    meses: function () {

    },
    valoresHistoricos: function (historico) {
        var valoresMensuales = [];
        var meses = [];
        var max;
        var labels = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        if (historico.length > 12) {
            historico = historico.slice(Math.max(historico.length - 12));
        };
        $.each(historico, function (pos) {
            meses[pos] = labels[parseFloat(historico[pos].mes) - 1] + " " + historico[pos].anio;
            valoresMensuales[pos] = historico[pos].importe.valor;
        });
        valoresMensuales.unshift(historico[0].importe.valor);
        //console.log(valoresMensuales.length);
        return {
            valoresMensuales: valoresMensuales,
            meses: meses,
            max: Math.max.apply(null, valoresMensuales)
        };
    },
    } // end of object

    //            var datosHistorio = Array();
    //            datosHistorio = category.historico;
    //            if(datosHistorio.length > 12)
    //            {
    //                datosHistorio = datosHistorio.slice(Math.max(datosHistorio.length - 12));
    //            }
    //            var arrayLabel = Array();
    //            var arrayValor = Array();
    //
    //            $.each(datosHistorio, function(pos){
    //                arrayLabel[pos] = numberToMonth(datosHistorio[pos].mes) +" "+ datosHistorio[pos].anio;
    //                arrayValor[pos] = parseFloat(datosHistorio[pos].importe.valor);
    //            });
    //            /*var reg = new RegExp("(\d)(?=(\d{3})+(?!\d))","g");*/
    //            var maxVal = getMaxOfArray(arrayValor);
    //
    //            /*SI EL RUBRO TRAE UN SOLO VALOR, SE AÑANE SALDO*/
    //            if(parseFloat(datosHistorio[0].importe.valor) > saldo){
    //                arrayValor.unshift(saldo);
    //            }
    //            else{
    //                arrayValor.unshift(parseFloat(datosHistorio[0].importe.valor));
//            }
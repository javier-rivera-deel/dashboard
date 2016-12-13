(function () {
    //respuesta.length = 0;
    var dashboard = {
        categories: auxFunctions.subArray(respuesta),
        init: function () {
            //sortData(respuesta);
            this.cacheElements();
            if (respuesta.length > 0) {
                this.render();
            } else {
                this.error();
            }
            this.bindEvents();
        },
        cacheElements: function () {
            this.$body = $("body");
            this.$mainBody = $("#main-screen");
            this.$category = document.getElementById('category');
            this.$totalAmaount = document.getElementById('totalAmaount');
            this.$imagenIcon = $("#icon-place");
            this.$select = $('#categories-select');
            this.template = $('#categories-list').html();
            this.$imageIcon = $("#icon-place");
            this.$montoDebito = $("#monto-tdd");
            this.$montoCredito = $("#monto-tdc");
            this.$fecha = $("#fecha");
            this.$saldo = $("#saldo");
        },
        render: function () {
            var data = {
                categories: this.categories
            };
            this.$select.html(Mustache.render(this.template, data)),
                this.setCategory();
        },
        error: function () {
            console.log(this.$mainBody);
            this.$mainBody.addClass("hidden");
        },
        bindEvents: function () {
            this.$select.change(this.setCategory.bind(this));
        },
        setCategory: function () {
            this.categoryIndex = $('#categories-select option:selected').index();
            this.$body.css("background-color", respuesta[this.categoryIndex].color);
            this.$imagenIcon.attr("src", respuesta[this.categoryIndex].imagen);
            this.$montoCredito.text(respuesta[this.categoryIndex].montoCredito.formateado);
            this.$montoDebito.text(respuesta[this.categoryIndex].montoDebito.formateado);
            this.$fecha.text(respuesta[this.categoryIndex].fecha);
            this.$saldo.text(respuesta[this.categoryIndex].saldo.formateado);
            if (this.$montoCredito && this.$montoDebito) {
                graph.renderCenterDonut(
                    respuesta[this.categoryIndex].montoDebito.valor,
                    respuesta[this.categoryIndex].saldo.valor);
                graph.renderInnerDonut(
                    respuesta[this.categoryIndex].montoCredito.valor,
                    respuesta[this.categoryIndex].saldo.valor);
                graph.renderHistoryGraph(
                    auxFunctions.valoresHistoricos(respuesta[this.categoryIndex].historico).meses,
                    auxFunctions.valoresHistoricos(respuesta[this.categoryIndex].historico).valoresMensuales,
                    auxFunctions.valoresHistoricos(respuesta[this.categoryIndex].historico).max);
            }

        },
    };
    dashboard.init();
})();
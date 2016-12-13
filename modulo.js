(function () {
    //respuesta.length = 0;
    var dashboard = {
        categories: auxFunctions.subArray(respuesta),
        init: function () {
            //sortData(respuesta);/*testing commit*/
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
            this.category = respuesta[this.categoryIndex];
            this.$body.css("background-color", respuesta[this.categoryIndex].color);
            this.$imagenIcon.attr("src", this.category.imagen);
            this.$montoCredito.text(this.category.montoCredito.formateado);
            this.$montoDebito.text(this.category.montoDebito.formateado);
            this.$fecha.text(this.category.fecha);
            this.$saldo.text(this.category.saldo.formateado);
            if (this.$montoCredito && this.$montoDebito) {
                graph.renderCenterDonut(
                    this.category.montoDebito.valor,
                    this.category.saldo.valor);
                graph.renderInnerDonut(
                    this.category.montoCredito.valor,
                    this.category.saldo.valor);
                graph.renderHistoryGraph(
                    auxFunctions.valoresHistoricos(this.category.historico).meses,
                    auxFunctions.valoresHistoricos(this.category.historico).valoresMensuales,
                    auxFunctions.valoresHistoricos(this.category.historico).max);
            }
        },
    };
    dashboard.init();
})();
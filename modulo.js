(function () {
    var dashboard = {
        init: function () {
            this.respuesta = auxFunctions.sortData(respuesta);
            //console.log(this.respuesta);
            this.categories = auxFunctions.subArray(this.respuesta,"categoria");
            auxFunctions.printImgEl(auxFunctions.subArray(this.respuesta,"imagen"));
            auxFunctions.printSelectEl(this.categories);
            this.slider = $(".slider").slick({
                arrows: false,
                dots: false,
            });
            this.cacheElements();
            //this.respuesta.length = 0;
            if (this.respuesta.length > 0) {
                this.render();
            } else {
                this.error();
            }
            this.bindEvents(); 
        },
        cacheElements: function () {
            this.$body = $("body");
            this.$mainBody = $("#main-screen");
            this.$errorScreen = $("#error-screen");
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
            this.$slider = $(".slider");
            this.$resumen = $("#resumen");
        },
        render: function () {
            var data = {
                categories: this.categories
            };
            //this.$select.html(Mustache.render(this.template, data)),
            this.setCategory();  
        },
        error: function () {
            this.$mainBody.addClass("hidden");
            this.$errorScreen.removeClass("hidden");
        },
        bindEvents: function () {
            this.$select.change(this.setCategory.bind(this));
            this.$slider.on("beforeChange",this.changeSlide.bind(this));
        },
        setIndex:function(index){
            this.$select.prop("selectedIndex", index); 
            this.setCategory();
        },
        setCategory: function () {
            this.categoryIndex = $('#categories-select option:selected').index();
            this.category = this.respuesta[this.categoryIndex];
            $(".slider").slick("slickGoTo",this.categoryIndex,false);
            this.$body.css("background-color", this.respuesta[this.categoryIndex].color);
            this.$fecha.text(this.category.fecha);
            this.currency = this.category.moneda;
            
             if(this.category.sumaHistorico <= 0){
                this.$montoCredito.text(this.currency + " " + this.category.montoCredito.formateado);
                this.$montoDebito.text(this.currency + " " + this.category.montoDebito.formateado);
                this.$saldo.text(this.currency + " " + this.category.saldo.formateado);'' 
                $("#resumen").text("No se registran consumos.").addClass("center-text");
                $(".ct-chart").hide();
            }else{
                $("#resumen").text("Registro comparativo histórico").removeClass("center-text");;
                $(".ct-chart").show();
                this.$montoCredito.text(this.currency + " " + this.category.montoCredito.formateado);
                this.$montoDebito.text(this.currency + " " + this.category.montoDebito.formateado);
                this.$saldo.text(this.currency + " " + this.category.saldo.formateado);
            };
                if(this.$montoCredito && this.$montoDebito) {
                    graph.renderDonut(
                        this.category.montoCredito.valor,
                        this.category.saldo.valor,
                        "outer");
                    graph.renderDonut(
                        this.category.montoDebito.valor,
                        this.category.saldo.valor,
                        "inner");
                    this.$graphValues = auxFunctions.valoresHistoricos(this.category.historico);
                    graph.renderHistoryGraph(
                        this.$graphValues.meses,
                        this.$graphValues.valoresMensuales,
                        this.$graphValues.max,
                        this.currency);
                }
            
        },
        changeSlide: function(event, slick, currentSlide, nextSlide){
            this.setIndex(nextSlide);
        }
    };
    dashboard.init();
})();
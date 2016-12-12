(function(){
    //respuesta.length = 0;
    var dashboard = {
        categories : auxFunctions.subArray(respuesta),
        init: function () {
            //sortData(respuesta);
            this.cacheElements();
            if(respuesta.length > 0){
                this.render();
            }else{
                this.error();
            }
            this.bindEvents();
            
        },
        cacheElements: function () {
            this.$mainBody = $("#main-screen");
            this.$category = document.getElementById('category');
            this.$totalAmaount = document.getElementById('totalAmaount');
            this.$select = $('#categories-select');
            this.template = $('#categories-list').html();
            this.$imageIcon = $("#icon-place");
            this.$montoDebito = $("#monto-tdd");
            this.$montoCredito = $("#monto-tdc");
        },
        render:function(){
            var data = {
                categories : this.categories
            };
            this.$select.html(Mustache.render(this.template,data)),
            this.setCategory();
        },
        error:function(){
            console.log(this.$mainBody);
            this.$mainBody.addClass("hidden");
        },
        bindEvents:function(){
            this.$select.change(this.setCategory);
        },
        setCategory:function(){
            this.categoryIndex = $('#categories-select option:selected').index();
            $("#icon-place").attr("src",respuesta[this.categoryIndex].imagen);
            this.$montoCredito.text(respuesta[this.categoryIndex].montoCredito.formateado);
            this.$montoDebito.text(respuesta[this.categoryIndex].montoDebito.formateado);
        },
    }; 
    dashboard.init();
})();
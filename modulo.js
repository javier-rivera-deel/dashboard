(function(){
    var dashboard = {
        categories : auxFunctions.subArray(respuesta),
        init: function () {
            //sortData(respuesta);
            this.cacheElements();
            this.render();
            this.bindEvents();
            this.setCategory();
        },
        cacheElements: function () {
            this.$category = document.getElementById('category');
            this.$totalAmaount = document.getElementById('totalAmaount');
            this.$select = $('#categories-select');
            this.template = $('#categories-list').html();
            this.$imageIcon = $("#icon-place");
        },
        render:function(){
            var data = {
                categories : this.categories
            };
            this.$select.html(Mustache.render(this.template,data)); 
        },
        bindEvents:function(){
            this.$select.change(this.setCategory);
        },
        setCategory:function(){
            //console.log(this.$imageIcon);
            this.categoryIndex = $('#categories-select option:selected').index();
            $("#icon-place").attr("src",respuesta[this.categoryIndex].imagen);
        },
    }; 
    dashboard.init();
})();
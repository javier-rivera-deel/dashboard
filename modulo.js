(function(){
    var dashboard = {
        categories : auxFunctions.subArray(respuesta),
        init: function () {
            //sortData(respuesta);
            this.cacheElements();
            this.render();
            this.bindEvents();
            this.getCategory();
        },
        cacheElements: function () {
            this.$category = document.getElementById('category');
            this.$totalAmaount = document.getElementById('totalAmaount');
            this.$select = $('#categories-select');
            this.template = $('#categories-list').html();
        },
        render:function(){
            var data = {
                categories : this.categories
            };
            this.$select.html(Mustache.render(this.template,data)); 
        },
        bindEvents:function(){
            this.$select.change(this.getCategory);
        },
        getCategory:function(){
            this.$categorySelected = $('#categories-select option:selected').index();
            console.log(this.$categorySelected);
        }
    }; 
    dashboard.init();
})();
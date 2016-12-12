(function(){
    var dashboard = {
        categories : auxFunctions.subArray(respuesta),
        init: function () {
            //sortData(respuesta);
            this.cacheElements();
            this.render();
            this.bindEvents();
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
            this.$select.change(function(){
                console.log("select item changed");
            })
        }
    }; 
    dashboard.init();
})();
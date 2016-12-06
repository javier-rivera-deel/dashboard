function populateSelect(optionsArray, selectId){
    var optionEl;
    for(var option in optionsArray){
        console.log(option);
        optionEl = document.createElement("option");
        $(optionEl).addClass("selected").text(option).appendTo("#categories");
    };
};



/*
 $.each(respuesta,function(key) 
                   {
                    var categoria = respuesta[key].categoria;
                   // var imgurl = respuesta[key].imagen;
                    option = document.createElement("option");
                    $(option).addClass("selected")
                        .attr("categoria",categoria)
                        .text(categoria)
                        .appendTo("#productos");

                    imageContainer = document.createElement("div");
                    imageIcon = document.createElement("img");
                    $(imageIcon).appendTo(imageContainer)
                        .attr({"id":"icon-place","src": imgurl, "categoria": categoria})
                        .addClass("center-adjust relative img-responsive");
                    $(imageContainer).appendTo($(".slider"));

                });*/
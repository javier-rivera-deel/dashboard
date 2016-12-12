var graph = {
    renderCenterDonut: function (monto, total) {
        var outergauge = new Chartist.Pie("#ct-gauge", {
            series: [monto]
        }, {
            donut: true,
            donutWidth: "6em",
            startAngle: 0,
            total: total,
            showLabel: false
        });
        outergauge.on("draw", function (data) {
            if (data.type === "slice") {
                var pathLength = data.element._node.getTotalLength();
                data.element.attr({
                    "stroke-dasharray": pathLength + "% " + pathLength + "%"
                });
                var animationDefinition = {
                    "stroke-dashoffset": {
                        id: "anim" + data.index,
                        dur: 2500,
                        from: -pathLength + "%",
                        to: "0%",
                        easing: Chartist.Svg.Easing.easeOutQuint,
                        fill: "freeze"
                    }
                };
                data.element.animate(animationDefinition, false);
            }
        });
    },
    renderInnerDonut: function (monto, total) {
        var innerGauge = new Chartist.Pie("#ct-gauge-small", {
            series: [monto]
        }, {
            chartPadding: 19,
            donut: true,
            donutWidth: "6em",
            startAngle: 0,
            total: total,
            showLabel: false
        });
        innerGauge.on("draw", function (data) {
            if (data.type === "slice") {
                var pathLength = data.element._node.getTotalLength();
                data.element.attr({
                    "stroke-dasharray": pathLength + "% " + pathLength + "%"
                });
                var animationDefinition = {
                    "stroke-dashoffset": {
                        id: "anim" + data.index,
                        dur: 3000,
                        from: -pathLength + "%",
                        to: "0%",
                        easing: Chartist.Svg.Easing.easeOutQuint,
                        fill: "freeze"
                    }
                };
                if (data.index !== 0) {
                    animationDefinition["stroke-dashoffset"].begin = "anim" + (data.index - 1) + ".end";
                }
                data.element.attr({
                    "stroke-dashoffset": -pathLength + "%"
                });

                data.element.animate(animationDefinition, false);
            }
        });
    },
    renderHistoryGraph:function(){
        
    }
};
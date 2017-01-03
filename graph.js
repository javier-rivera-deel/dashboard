var graph = {
    renderDonut: function (monto, total,type) {
        var donut = new Chartist.Pie("#"+type, {
            series: monto ? [monto] : [""]  
        }, {
            chartPadding: type === "inner" ? 13 : 0,
            donut: true,
            donutWidth: 6,
            startAngle: 0,
            total: total,
            showLabel: false
        });
        donut.on("draw", function (data) {
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
                data.element.animate(animationDefinition, false);
            }
        });
    },
    renderHistoryGraph: function (labels, values, maxVal,currency){
        var chart = new Chartist.Line(".ct-chart", {
            labels: labels,
            series: [values]
        }, {
            showPoint: false,
            divisor: 2,
            showArea: true,
            lineSmooth: Chartist.Interpolation.simple({
                tension: 3
            }),
            axisX: {
                /* onlyInteger:true*/
            },
            axisY: {
                position: "end",
                type: Chartist.FixedScaleAxis,
                ticks: [Math.round((maxVal * 20) / 100), Math.round((maxVal * 40) / 100), Math.round((maxVal * 60) / 100), Math.round((maxVal * 80) / 100), Math.round(maxVal)],
                high: Math.round(maxVal),
                low: 0,
                onlyInteger: true,
                labelInterpolationFnc: function (value, index) {
                    return currency + value.toString().replace(/./g, function (c, i, a) {
                        return i && c !== "," && ((a.length - i) % 3 === 0) ? "." + c : c;
                    });
                },
            } /*PADDING*/
        });
        chart.on("draw", function(data) {
                if(data.type === "line" || data.type === "area") {
                    data.element.animate({
                        d: {
                            begin: 2000 * data.index,
                            dur: 4000,
                            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                            to: data.path.clone().stringify(),
                            easing: Chartist.Svg.Easing.easeOutQuint
                        }
                    });
                }
            });
    }
   };
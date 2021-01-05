var tooltip = d3.select("body").append("div").attr("class", "flowpop").style("position", "absolute").style("text-align", "center").style("visibility", "hidden")
        var width = 1920
            , height = 1080;
        var projection = d3.geoMercator().center([0, 60]).scale(200).translate([width / 2, height / 2]);
        var path = d3.geoPath().projection(projection);
        var svg = d3.select("svg"); //.attr("width", width).attr("height", height);
        var aus = [130, -30];
        d3.json("./countries.geo.json", function (error, country) {
            if (error) console.log(error);
            console.log(country.features);
            svg.selectAll("path").data(country.features).enter().append("path").attr("class", "land").attr("d", path);
            var gAus = svg.append("g");
            var glocation = svg.append("g");
            console.log(projection(aus));
            // console.log(projection(-20));
            gAus.append("circle").attr("cx", function () {
                return projection(aus)[0];
            }).attr("cy", function () {
                return projection(aus)[1];
            }).attr("r", 6).attr("class", "source-port");
            gAus.append("text").attr("x", function () {
                return projection(aus)[0] + 10;
            }).attr("y", function () {
                return projection(aus)[1] + 0;
            }).text("Australia");
            d3.csv("./mi4.csv", function (error, pop) {
                var maxVolume = d3.max(pop, function (d) {
                    return d.Australia;
                });
                console.log(pop);
                //   console.log(pop["latitude"]);
                pop.forEach(function (d) {
                    d["latitude"] = +d["latitude"];
                    d["longitude"] = +d["longitude"];
                });
                console.log(pop);
                
                portMarkers = glocation.selectAll(".ports").data(pop).enter().append("circle").attr("class", "ports").attr("cx", function (d) {
                    return projection([d.longitude, 0])[0]
                }).attr("cy", function (d) {
                    return projection([0, d.latitude])[1]
                }).attr("r", 3).style("fill", "white").style("stroke-width", 2).style("stroke", "red").attr("opacity", 0.1);
                
                
                routePath = glocation.selectAll(".route").data(pop).enter().append("path").attr("class", "route").style("stroke-width", function (d) {
                    return d.Australia / 100000;
                }).attr('d', function (d) {
                    return path({
                        type: "LineString"
                        , coordinates: [aus, [d.longitude, d.latitude]]
                    });
                }).attr("opacity", 0.1).on("mouseover", function (thisElement) {
                    glocation.selectAll("circle, path").attr("opacity", 0.1); // grey all lines and circles
                    tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                        //highlight the circle
                    d3.select(this).attr("opacity", 0.6);
                    //highlight all connected lines
                    glocation.selectAll("circle").attr("opacity", function (point) {
                        console.log(point);
                        console.log(thisElement);
                        if ((point.latitude == thisElement.latitude) && (point.longitude == thisElement.longitude)) {
                            return 1
                        }
                        else {
                            return 0.1
                        }
                    })
                }).on("mousemove", function (thisElement) {
                    return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                }).on("mouseout", function (thisElement) {
                    glocation.selectAll("circle, path").attr("opacity", 0.1)
                    tooltip.style("visibility", "hidden");
                });
                
                portMarkers.on("mouseover", function (thisElement) {
                    glocation.selectAll("circle, path").attr("opacity", 0.1); // grey all lines and circles
                    tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                        //highlight the circle
                    d3.select(this).attr("opacity", 0.6);
                    //highlight all connected lines
                    glocation.selectAll("path").attr("opacity", function (route) {
                        console.log(route);
                        console.log(thisElement);
                        if ((route.latitude == thisElement.latitude) && (route.longitude == thisElement.longitude)) {
                            return 1
                        }
                        else {
                            return 0.1
                        }
                    })
                }).on("mousemove", function (thisElement) {
                    return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                }).on("mouseout", function (thisElement) {
                    glocation.selectAll("circle, path").attr("opacity", 0.1)
                    tooltip.style("visibility", "hidden");
                });
                //                portLabels = glocation.selectAll(".port-labels").data(pop).enter().append("text").attr("x", function (d) {
                //                    return projection([d.longitude,0])[0] + 10
                //                }).attr("y", function (d) {
                //                    return projection([0, d.latitude])[1] + 10
                //                }).text(function (d) {
                //                    return d["Country of birth"]
                //                }).attr("class", "port-label");
            });
        });

        function tooltip_info(d) {
            return '<b>  ' + d["Country of birth"] + '</b>' + '<br>' + d.Australia + '</br>';
        }
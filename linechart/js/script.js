var tooltip = d3.select("body").append("div").attr("class", "flowpop").style("position", "absolute").style("text-align", "center").style("visibility", "hidden");
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 80
    },
    width = 900 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var svg = d3.select("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var select = document.getElementById("selection");
var index = select.selectedIndex;
var val = select.options[index].value;
//     if (val == "all") {
d3.csv("./ass3(noA).csv", function(error, d) {
    var parser = d3.timeParse("%Y-%m-%d");
    //  var formatTime = d3.timeFormat("%Y %m %d");
    d.forEach(function(d) {
        d.date = parser(d.date);
    });
    console.log(d.date);
    //   d.date = formatTime(d.date);
    //  console.log(d.date);

    var nsw = d.filter(function(row) {
        return row.state == " New South Wales";
    });
    var vic = d.filter(function(row) {
        return row.state == "Victoria";
    });
    var qld = d.filter(function(row) {
        return row.state == "Queensland ";
    });
    var sa = d.filter(function(row) {
        return row.state == "South Australia";
    });
    var wa = d.filter(function(row) {
        return row.state == "Western Australia";
    });
    var tas = d.filter(function(row) {
        return row.state == "Tasmania";
    });
    var nt = d.filter(function(row) {
        return row.state == "Northern Territory";
    });
    var ct = d.filter(function(row) {
        return row.state == "Capital Territory";
    });
    console.log(nsw);
    x.domain(d3.extent(d, function(f) {
        return f.date;
    }));
    y.domain([0, d3.max(d, function(f) {
        return f.population;
    })]);
    var lineGenerator = d3.line().x(function(f) {
        return x(f.date);
    }).y(function(f) {
        return y(f.population)
    });

    svg.append("path").data([nsw]).attr("class", "nsw").attr("d", lineGenerator);
    svg.append("path").data([vic]).attr("class", "vic").attr("stroke", "Blue").attr("d", lineGenerator);
    svg.append("path").data([qld]).attr("class", "qld").attr("stroke", "Red").attr("d", lineGenerator);
    svg.append("path").data([sa]).attr("class", "sa").attr("stroke", "Green").attr("d", lineGenerator);
    svg.append("path").data([wa]).attr("class", "wa").attr("stroke", "Pink").attr("d", lineGenerator);
    svg.append("path").data([tas]).attr("class", "tas").attr("stroke", "Purple").attr("d", lineGenerator);
    svg.append("path").data([nt]).attr("class", "nt").attr("stroke", "Orange").attr("d", lineGenerator);
    svg.append("path").data([ct]).attr("class", "ct").attr("stroke", "Black").attr("d", lineGenerator);
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));
    svg.selectAll("circle").data(d).enter().append("circle").attr("cx", function(d) {
        return x(d.date)
    }).attr("cy", function(d) {
        return y(d.population)
    }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
        tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
        d3.select(this).attr("r", 6);
    }).on("mousemove", function(thisElement) {
        return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    }).on("mouseout", function(thisElement) {
        d3.select(this).attr("r", 2);
        tooltip.style("visibility", "hidden");
    });
});
//            d3.csv("./ass3(noA).csv",function(error,d){
//                        var parser = d3.timeParse("%Y%m%d");
//                        var formatTime = d3.timeFormat("%Y %m %d");
//                        d.date = parser(d.date);
//                        d.date = formatTime(d.date);
//                        console.log(d);
//                        drw(d);    
//                     });
//            
//loading data
function changechoice() {
    d3.select("g").remove();
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 80
        },
        width = 900 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var svg = d3.select("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var select = document.getElementById("selection");
    var index = select.selectedIndex;
    var val = select.options[index].value;
    if (val == "all") {
        d3.csv("./ass3(noA).csv", function(error, d) {

            var parser = d3.timeParse("%Y-%m-%d");
            //  var formatTime = d3.timeFormat("%Y %m %d");
            d.forEach(function(d) {
                d.date = parser(d.date);
            });
            console.log(d.date);
            //   d.date = formatTime(d.date);
            //  console.log(d.date);
            svg.selectAll().remove();
            var nsw = d.filter(function(row) {
                return row.state == " New South Wales";
            });
            var vic = d.filter(function(row) {
                return row.state == "Victoria";
            });
            var qld = d.filter(function(row) {
                return row.state == "Queensland ";
            });
            var sa = d.filter(function(row) {
                return row.state == "South Australia";
            });
            var wa = d.filter(function(row) {
                return row.state == "Western Australia";
            });
            var tas = d.filter(function(row) {
                return row.state == "Tasmania";
            });
            var nt = d.filter(function(row) {
                return row.state == "Northern Territory";
            });
            var ct = d.filter(function(row) {
                return row.state == "Capital Territory";
            });
            console.log(nsw);
            x.domain(d3.extent(d, function(f) {
                return f.date;
            }));
            y.domain([0, d3.max(d, function(f) {
                return f.population;
            })]);
            var lineGenerator = d3.line().x(function(f) {
                return x(f.date);
            }).y(function(f) {
                return y(f.population)
            });

            svg.append("path").data([nsw]).attr("class", "nsw").attr("d", lineGenerator);
            svg.append("path").data([vic]).attr("class", "vic").attr("stroke", "Blue").attr("d", lineGenerator);
            svg.append("path").data([qld]).attr("class", "qld").attr("stroke", "Red").attr("d", lineGenerator);
            svg.append("path").data([sa]).attr("class", "sa").attr("stroke", "Green").attr("d", lineGenerator);
            svg.append("path").data([wa]).attr("class", "wa").attr("stroke", "Pink").attr("d", lineGenerator);
            svg.append("path").data([tas]).attr("class", "tas").attr("stroke", "Purple").attr("d", lineGenerator);
            svg.append("path").data([nt]).attr("class", "nt").attr("stroke", "Orange").attr("d", lineGenerator);
            svg.append("path").data([ct]).attr("class", "ct").attr("stroke", "Black").attr("d", lineGenerator);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));
            svg.selectAll("circle").data(d).enter().append("circle").attr("cx", function(d) {
                return x(d.date)
            }).attr("cy", function(d) {
                return y(d.population)
            }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
                tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                d3.select(this).attr("r", 6);
            }).on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }).on("mouseout", function(thisElement) {
                d3.select(this).attr("r", 2);
                tooltip.style("visibility", "hidden");
            });
        });
    } else if (val == "nsw") {
        d3.csv("./ass3(noA).csv", function(error, d) {
            var parser = d3.timeParse("%Y-%m-%d");
            //  var formatTime = d3.timeFormat("%Y %m %d");
            d.forEach(function(d) {
                d.date = parser(d.date);
            });
            console.log(d);
            var selected = d.filter(function(row) {
                return row.state == " New South Wales";
            });
            console.log(selected);
            x.domain(d3.extent(d, function(f) {
                return f.date;
            }));
            y.domain([0, d3.max(d, function(f) {
                return f.population;
            })]);
            var lineGenerator = d3.line().x(function(f) {
                return x(f.date);
            }).y(function(f) {
                return y(f.population)
            });
            svg.append("path").data([selected]).attr("class", "nsw").attr("d", lineGenerator);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));
            svg.selectAll("circle").data(selected).enter().append("circle").attr("cx", function(d) {
                return x(d.date)
            }).attr("cy", function(d) {
                return y(d.population)
            }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
                tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                d3.select(this).attr("r", 6);
            }).on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }).on("mouseout", function(thisElement) {
                d3.select(this).attr("r", 2);
                tooltip.style("visibility", "hidden");
            });
        });
    } else if (val == "vic") {
        d3.csv("./ass3(noA).csv", function(error, d) {
            var parser = d3.timeParse("%Y-%m-%d");
            //  var formatTime = d3.timeFormat("%Y %m %d");
            d.forEach(function(d) {
                d.date = parser(d.date);
            });
            console.log(d);
            //       d3.select("svg").remove();
            var selected = d.filter(function(row) {
                return row.state == "Victoria";
            });
            console.log(selected);
            x.domain(d3.extent(d, function(f) {
                return f.date;
            }));
            y.domain([0, d3.max(d, function(f) {
                return f.population;
            })]);
            var lineGenerator = d3.line().x(function(f) {
                return x(f.date);
            }).y(function(f) {
                return y(f.population)
            });
            svg.append("path").data([selected]).attr("class", "vic").attr("d", lineGenerator);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));
            svg.selectAll("circle").data(selected).enter().append("circle").attr("cx", function(d) {
                return x(d.date)
            }).attr("cy", function(d) {
                return y(d.population)
            }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
                tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                d3.select(this).attr("r", 6);
            }).on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }).on("mouseout", function(thisElement) {
                d3.select(this).attr("r", 2);
                tooltip.style("visibility", "hidden");
            });
        });
    } else if (val == "qld") {
        d3.csv("./ass3(noA).csv", function(error, d) {
            var parser = d3.timeParse("%Y-%m-%d");
            //  var formatTime = d3.timeFormat("%Y %m %d");
            d.forEach(function(d) {
                d.date = parser(d.date);
            });
            console.log(d);
            //       d3.select("svg").remove();
            var selected = d.filter(function(row) {
                return row.state == "Queensland ";
            });
            console.log(selected);
            x.domain(d3.extent(d, function(f) {
                return f.date;
            }));
            y.domain([0, d3.max(d, function(f) {
                return f.population;
            })]);
            var lineGenerator = d3.line().x(function(f) {
                return x(f.date);
            }).y(function(f) {
                return y(f.population)
            });
            svg.append("path").data([selected]).attr("class", "qld").attr("d", lineGenerator);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));
            svg.selectAll("circle").data(selected).enter().append("circle").attr("cx", function(d) {
                return x(d.date)
            }).attr("cy", function(d) {
                return y(d.population)
            }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
                tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                d3.select(this).attr("r", 6);
            }).on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }).on("mouseout", function(thisElement) {
                d3.select(this).attr("r", 2);
                tooltip.style("visibility", "hidden");
            });
        });
    } else if (val == "sa") {
        d3.csv("./ass3(noA).csv", function(error, d) {
            var parser = d3.timeParse("%Y-%m-%d");
            //  var formatTime = d3.timeFormat("%Y %m %d");
            d.forEach(function(d) {
                d.date = parser(d.date);
            });
            console.log(d);
            //         d3.select("svg").remove();
            var selected = d.filter(function(row) {
                return row.state == "South Australia";
            });
            console.log(selected);
            x.domain(d3.extent(d, function(f) {
                return f.date;
            }));
            y.domain([0, d3.max(d, function(f) {
                return f.population;
            })]);
            var lineGenerator = d3.line().x(function(f) {
                return x(f.date);
            }).y(function(f) {
                return y(f.population)
            });
            svg.append("path").data([selected]).attr("class", "sa").attr("d", lineGenerator);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));
            svg.selectAll("circle").data(selected).enter().append("circle").attr("cx", function(d) {
                return x(d.date)
            }).attr("cy", function(d) {
                return y(d.population)
            }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
                tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                d3.select(this).attr("r", 6);
            }).on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }).on("mouseout", function(thisElement) {
                d3.select(this).attr("r", 2);
                tooltip.style("visibility", "hidden");
            });
        });
    } else if (val == "wa") {
        d3.csv("./ass3(noA).csv", function(error, d) {
            var parser = d3.timeParse("%Y-%m-%d");
            //  var formatTime = d3.timeFormat("%Y %m %d");
            d.forEach(function(d) {
                d.date = parser(d.date);
            });
            console.log(d);
            //          d3.select("svg").remove();
            var selected = d.filter(function(row) {
                return row.state == "Western Australia";
            });
            console.log(selected);
            x.domain(d3.extent(d, function(f) {
                return f.date;
            }));
            y.domain([0, d3.max(d, function(f) {
                return f.population;
            })]);
            var lineGenerator = d3.line().x(function(f) {
                return x(f.date);
            }).y(function(f) {
                return y(f.population)
            });
            svg.append("path").data([selected]).attr("class", "wa").attr("d", lineGenerator);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));
            svg.selectAll("circle").data(selected).enter().append("circle").attr("cx", function(d) {
                return x(d.date)
            }).attr("cy", function(d) {
                return y(d.population)
            }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
                tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                d3.select(this).attr("r", 6);
            }).on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }).on("mouseout", function(thisElement) {
                d3.select(this).attr("r", 2);
                tooltip.style("visibility", "hidden");
            });
        });
    } else if (val == "tas") {
        d3.csv("./ass3(noA).csv", function(error, d) {
            var parser = d3.timeParse("%Y-%m-%d");
            //  var formatTime = d3.timeFormat("%Y %m %d");
            d.forEach(function(d) {
                d.date = parser(d.date);
            });
            console.log(d);
            //      d3.select("svg").remove();
            var selected = d.filter(function(row) {
                return row.state == "Tasmania";
            });
            console.log(selected);
            x.domain(d3.extent(d, function(f) {
                return f.date;
            }));
            y.domain([0, d3.max(d, function(f) {
                return f.population;
            })]);
            var lineGenerator = d3.line().x(function(f) {
                return x(f.date);
            }).y(function(f) {
                return y(f.population)
            });
            svg.append("path").data([selected]).attr("class", "tas").attr("d", lineGenerator);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));
            svg.selectAll("circle").data(selected).enter().append("circle").attr("cx", function(d) {
                return x(d.date)
            }).attr("cy", function(d) {
                return y(d.population)
            }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
                tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                d3.select(this).attr("r", 6);
            }).on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }).on("mouseout", function(thisElement) {
                d3.select(this).attr("r", 2);
                tooltip.style("visibility", "hidden");
            });
        });
    } else if (val == "nt") {
        d3.csv("./ass3(noA).csv", function(error, d) {
            var parser = d3.timeParse("%Y-%m-%d");
            //  var formatTime = d3.timeFormat("%Y %m %d");
            d.forEach(function(d) {
                d.date = parser(d.date);
            });
            console.log(d);
            //         d3.select("svg").remove();
            var selected = d.filter(function(row) {
                return row.state == "Northern Territory";
            });
            console.log(selected);
            x.domain(d3.extent(d, function(f) {
                return f.date;
            }));
            y.domain([0, d3.max(d, function(f) {
                return f.population;
            })]);
            var lineGenerator = d3.line().x(function(f) {
                return x(f.date);
            }).y(function(f) {
                return y(f.population)
            });
            svg.append("path").data([selected]).attr("class", "nt").attr("d", lineGenerator);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));
            svg.selectAll("circle").data(selected).enter().append("circle").attr("cx", function(d) {
                return x(d.date)
            }).attr("cy", function(d) {
                return y(d.population)
            }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
                tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                d3.select(this).attr("r", 6);
            }).on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }).on("mouseout", function(thisElement) {
                d3.select(this).attr("r", 2);
                tooltip.style("visibility", "hidden");
            });
        });
    } else if (val == "ct") {
        d3.csv("./ass3(noA).csv", function(error, d) {
            var parser = d3.timeParse("%Y-%m-%d");
            //  var formatTime = d3.timeFormat("%Y %m %d");
            d.forEach(function(d) {
                d.date = parser(d.date);
            });
            console.log(d);
            //        d3.select("svg").remove();
            var selected = d.filter(function(row) {
                return row.state == "Capital Territory";
            });
            console.log(selected);
            x.domain(d3.extent(d, function(f) {
                return f.date;
            }));
            y.domain([0, d3.max(d, function(f) {
                return f.population;
            })]);
            var lineGenerator = d3.line().x(function(f) {
                return x(f.date);
            }).y(function(f) {
                return y(f.population)
            });
            svg.append("path").data([selected]).attr("class", "ct").attr("d", lineGenerator);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));
            svg.selectAll("circle").data(selected).enter().append("circle").attr("cx", function(d) {
                return x(d.date)
            }).attr("cy", function(d) {
                return y(d.population)
            }).attr("r", 2).style("fill", "white").attr("opacity", 1).on("mouseover", function(thisElement) {
                tooltip.html(tooltip_info(thisElement)).style("visibility", "visible")
                d3.select(this).attr("r", 6);
            }).on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            }).on("mouseout", function(thisElement) {
                d3.select(this).attr("r", 2);
                tooltip.style("visibility", "hidden");
            });
        });
    }
}

function tooltip_info(d) {
    return '<b>  ' + d["state"] + '</b>' + '<br>Population: ' + d.population + '<br>' + d.date;
}

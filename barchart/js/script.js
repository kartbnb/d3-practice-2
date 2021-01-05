// select div with id=viz
var svg = d3.select("#viz"),
margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
},
width = 1920 - margin.left - margin.right,
height = 900 - margin.top - margin.bottom,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
console.log(height);
console.log(width);
// Place x and y axis
g.append("g").attr("class", "x axis");
g.append("g").attr("class", "y axis");

var x = d3.scaleBand().padding(0.2).range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Prep the tooltip bits, initial display is hidden
var tooltip = d3.select("body").append("div").attr("class", "flowpop").style("position", "absolute").style("text-align", "center").style("visibility", "hidden")

// draw year 2005
d3.csv("./mi5.csv", function(e, d) {
    //console.log(d);
    var year2005 = d.filter(function(row) {
        return row.year == "2005";
    });
    y.domain([0, d3.max(d, function(d) {
        return d["Total-overseas-born"];
    })]);
    drawbar(year2005);
});

// choose slider which id = slider-range-max
$(function() {
$("#slider-range-max").slider({
    range: "max",
    min: 2005,
    max: 2018,
    value: 1,
    slide: function(event, ui) {
        $("#amount").val(ui.value);
        d3.csv("./mi5.csv", function(e, d) {
            console.log(ui.value.toString());
            var year = d.filter(function(row) {
                return row.year == ui.value.toString();
            });
            drawbar(year);

        });
    }
});
$("#amount").val($("#slider-range-max").slider("value"));
});

function drawbar(eachyear) {
    svg.selectAll("rect").remove();
    console.log("eachyear", eachyear);
    var keys = ["Total-increased-population", "Total-Australian-born"];



    eachyear.forEach(function(d) {
        d["Total-Australian-born"] = +d["Total-Australian-born"];
        d["Total-Australian-born"] = d["Total-Australian-born"] * (-1);
        d["Total-increased-population"] = +d["Total-increased-population"];
        d["Total-overseas-born"] = +d["Total-overseas-born"];
    })
    var dataset = d3.stack().keys(keys)(eachyear);
    console.log("dataset", dataset);
    x.domain(eachyear.map(d => d.state));



    var colors = ["#98abc5", "#8a89a6"];
    var colorhighlight = ["#b8cfef", "#aeaddb"]

    let points = g.selectAll(".point").data(dataset);
    pointsEnter = points.enter().append("g").attr("class", "point").style("fill", function(d, i) {
        console.log("d.i", i);
        console.log("d.i 1", d);
        return colors[i]
    });
//            points.merge(pointsEnter).attr("x", d => x(d.state)).attr("y", d => y(d["Total-overseas-born"])).attr("width", d => x.bandwidth()).attr("height", d => height - y(d["Total-overseas-born"])).style("fill", "steelblue"); //Enter + Update
//            
    points.merge(pointsEnter).selectAll("rect")
        .data(function(d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", d => x(d.data.state))
        .attr("y", function(d) {
            // console.log("data111",d);
            return y(d[1]);
        })
        .attr("height", function(d) {
            console.log("dheight", d);
            return y(d[0]) - y(d[1]);
        })
        .attr("width", d => x.bandwidth())
        .on("mouseover", function(thisElement) {
            tooltip.html(tooltip_info(thisElement)).style("visibility", "visible");
    //     console.log("rectanle",this);
            
            g.selectAll("rect").style("fill", function(rect){
                if(rect[0] == thisElement[1]){
                    return colorhighlight[1];
                }
                
            });
        d3.select(this).style("fill", colorhighlight[0]);
        })
        .on("mouseout", function(thisElement) {
            tooltip.style("visibility", "hidden");
            g.selectAll("rect").style("fill", function(rect){
                if(rect[0] == 0){
                    return colors[0];
                }else{
                    return colors[1];
                }
                
            });
        })
        .on("mousemove", function(thisElement) {
            //   console.log("this", this);
            return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
        });

//            draw legend
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(30," + i * 40 + ")";
        });

    legend.append("circle")
        .attr("cx", width - 300)
        .attr("cy", height - 500)
        .attr("r", 9)
    //   .attr("height", 18)
        .style("fill", function(d, i) {
            return colors.slice().reverse()[i];
        });

    legend.append("text")
        .attr("x", width - 290)
        .attr("y", height - 500)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d, i) {
            switch (i) {
                case 0:
                    return "Total-Australian-born";
                case 1:
                    return "Total-increased-population";
            }
        });




    g.select(".x.axis").call(d3.axisBottom(x)).attr("transform", "translate(0, " + height + ")");
    g.select(".y.axis").call(d3.axisLeft(y));
}

function tooltip_info(d) {
    console.log("tooltip", d);
    var texttip;
    var number;
    var totalborntext;
    var totalborn
    if (d[0] == 0) {
        texttip = "Total-increased-population: ";
        number = d[1];
        totalborntext = "Total-overseas-born: ";
        totalborn = d.data["Total-overseas-born"];
        return texttip + number + '<br>' + totalborntext + totalborn ;
    } else {
        texttip = "Total-Australian-born: ";
        number = -(d[1] - d[0]);
        return texttip + number
    }
// return texttip + number + '<br>' + totalborntext + totalborn ;
}
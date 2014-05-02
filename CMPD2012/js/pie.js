d3.json("./json/allCitiesPayments.json", function(error, citiesJson) {

    var nestedData = d3.nest()
        .key(function(d) {
            return d['City'];
        })
        .entries(citiesJson);

    for (var i = 0; i < nestedData.length; ++i) {
        nestedData[i].sum = d3.sum(nestedData[i].values, function(d) {
            return +d.Payments;
        });

    }
    console.log(nestedData[0].values);
    createDonut('Arvada', 1000, nestedData[0].values);


    

});

var createDonut = function(city,sum,cityArrayOfObjects) {
    var svg = d3.select('.donut');

    var width = 480,
        height = 480,
        radius = Math.min(width, height) / 2

    var outerRadius = width / 2;

    var colorScale = d3.scale.category20(); //built in range of 20 colors

    var arc = d3.svg.arc() //creates <path> elements using arc data

        .outerRadius(width / 2)
        .innerRadius(150);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d){ return +d.Payments });

    var svgHeight = d3.select('.donut').style("height");
    svgHeight = +svgHeight.replace('px', '');
    console.log(typeof svgHeight);


    var g = svg.selectAll("g.arc")
        .data(pie(cityArrayOfObjects))
        .enter()
        .append("g")
            .attr("class", "arc")
            // .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
            .attr("transform", "translate(" + width/2 + "," + svgHeight/2 + ")")
        .on('mouseover', function(d) {
            d3.select(this).select('.specialty')
                .transition().duration(100)
                .attr("opacity", 1);
            d3.select(this).select('.payments')
                .transition().duration(100)
                .attr("opacity", 1);
        })
        .on('mouseout', function(d) {
            d3.select(this).select('.specialty')
                .transition().duration(100)
                .attr("opacity", 0);
            d3.select(this).select('.payments')
                .transition().duration(100)
                .attr("opacity", 0);
        })
    svg.selectAll(".title")
    .data([city])
    .enter()
    .append("text")
    .attr("class", ".title")
    .attr({x:(width/2), y:10})
    .style("text-anchor", "middle")
    .text(city);

    g.append("path")
    .transition()
    .duration(500)
    .ease("linear")
    .attr("fill", function(d){return colorScale(d.data.Payments);})
    .attr("d", arc)

    g.append("text")
    .attr("class", "specialty")
    .attr("opacity", 0)
    .attr("transform", function(d){ return "translate(" + arc.centroid(0) +")"; })
    .attr("text-anchor", "middle")
    .text(function(d){ return d.data.Specialty; });

    g.append("text")
    .attr("class", "payments")
    .attr("opacity", 0)
    .attr("transform", function(d){ return "translate(" + arc.centroid(0) +")"; })
    .attr("transform", function(d){ return "translate(0,17)";})
    .attr("text-anchor", "middle")
    .text(function(d){ return "$ "+ d.data.Payments.toFixed(2); });



}


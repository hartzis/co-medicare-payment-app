var cityText;

// on document ready
// 

$(document).on('ready', function() {
    $('.flag-c').fadeIn(2000);
});

// adding back ground image using backstretch.js
$("#colorado-sky").backstretch("./img/colorado-sky-1440w.jpg");

// background wrapper size based on document height
$(window).on('resize', function() {
    $('.background-wrapper').height($(document).height() + 'px');
});
$('.background-wrapper').height($(document).height() + 'px');


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
    console.log(nestedData);

    // create pie donut
    var createDonut = function(city, sum, cityArrayOfObjects) {
        var svg = d3.select('.donut');

        // get initial heights and widths
        var svgWidth = svg.style("width");
        svgWidth = +svgWidth.replace('px', '');

        var svgHeight = svg.style("height");
        svgHeight = +svgHeight.replace('px', '');

        var radius = Math.min(svgWidth, svgHeight) / 2;
        var outerRadius = svgWidth / 2;

        //built in range of 20 colors
        var colorScale = d3.scale.category20();

        //creates <path> elements using arc data
        var arc = d3.svg.arc()
            .outerRadius(svgWidth / 2)
            .innerRadius(150);

        //this will create arc data for us given a list of values
        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return +d.Payments
            });

        var g = svg.selectAll("g.arc")
            .data(pie(cityArrayOfObjects))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + svgWidth / 2 + "," + ((svgHeight / 2) + 20) + ")")
            .on('mouseover', function(d) {
                var origFill = d3.rgb(d3.select(this).select('path').style('fill'))
                d3.select(this).select('path').attr('data-fill', origFill.toString());
                var brighten = origFill.brighter(0.5);
                d3.select(this).select('path').style('fill', brighten.toString());
                d3.select(this).select('.specialty')
                    .transition().duration(100)
                    .attr("opacity", 1);
                d3.select(this).select('.payments')
                    .transition().duration(100)
                    .attr("opacity", 1);
            })
            .on('mouseout', function(d) {
                var origFill = d3.rgb(d3.select(this).select('path').attr('data-fill'));
                d3.select(this).select('path').style('fill', origFill.toString());
                d3.select(this).select('.specialty')
                    .transition().duration(100)
                    .attr("opacity", 0);
                d3.select(this).select('.payments')
                    .transition().duration(100)
                    .attr("opacity", 0);
            });

        svg.selectAll(".pie-chart-title")
            .data([city])
            .enter()
            .append("text")
            .attr("class", "pie-chart-title")
            .attr({
                x: (svgWidth / 2),
                y: 35
            })
            .style("text-anchor", "middle")
            .text(city);

        g.append("path")
            .style("fill", function(d) {
                return colorScale(d.data.Payments);
            })
            .attr("d", arc)
            .transition()
            .ease("linear")
            .duration(800)
            .attrTween("d", tweenDonut);

        g.append("text")
            .attr("class", "specialty")
            .attr("opacity", 0)
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(0) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function(d) {
                return d.data.Specialty;
            });

        g.append("text")
            .attr("class", "payments")
            .attr("opacity", 0)
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(0) + ")";
            })
            .attr("transform", function(d) {
                return "translate(0,17)";
            })
            .attr("text-anchor", "middle")
            .text(function(d) {
                var payment = d.data.Payments.toFixed(0);
                payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return "$ " + payment;
            });

        function tweenDonut(b) {
            var i = d3.interpolate({
                startAngle: 0,
                endAngle: 0
            }, b);
            return function(t) {
                return arc(i(t))
            }

        }


    }

    // create list of specialties
    var createListOfSpecialties = function(cityArrayOfObjects) {

        cityArrayOfObjects.sort(function(a, b) {
            return a.Payments - b.Payments
        })

        var svg = d3.select('.specialties-list-svg');

        // get initial heights and widths
        var svgWidth = svg.style("width");
        svgWidth = +svgWidth.replace('px', '');

        var svgHeight = svg.style("height");
        svgHeight = +svgHeight.replace('px', '');

        var yscale = d3.scale.ordinal()
            .domain(d3.range(cityArrayOfObjects.length))
            .rangeBands([svgHeight, 0], 1);

        console.log("city spec length:", cityArrayOfObjects.length);

        var listItems = svg.selectAll('g')
            .data(cityArrayOfObjects)
            .enter().append('svg:g')
            .attr('transform', function(d, i) {
                var y = yscale(i);
                var x = (svgWidth / 2) + 60;
                return "translate(" + [x, y] + ")";
            });


        var textList = listItems.append('text')
            .attr('class', 'specialty-list')
            .attr('data-specialty', function(d, i) {
                return d.Specialty + ' ' + d.Payments.toFixed(0)
            })
            .attr('x', -5)
            .style("text-anchor", "end")
            .text(function(d, i) {
                return d.Specialty
            })

        var textList = listItems.append('text')
            .attr('class', 'specialty-list')
            .attr('data-specialty', function(d, i) {
                return d.Specialty + ' ' + d.Payments.toFixed(0)
            })
            .attr('x', 5)
            .style("text-anchor", "start")
            .text(function(d, i) {
                var payment = d.Payments.toFixed(0);
                payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return "$ " + payment;
            })

    }

    // load map and marker data
    var loadMapAndMarkers = (function() {
        var svg = d3.select('.map');

        var po = org.polymaps;

        // Create the map object and put it in the map svg
        var map = po.map()
            .container(svg.node())
            .center({
                lat: 40.065,
                lon: -104.95
            })
            .zoom(8.75)
        //  .add(po.interact());

        // water map layer
        map.add(po.image()
            .url(po.url("http://{S}.tile.stamen.com/watercolor/{Z}/{X}/{Y}.jpg")
                .hosts(["a", "b", "c", "d"])));

        d3.json("./json/cities.json", function(error, citiesJson) {


            var cities = topojson.feature(citiesJson, citiesJson.objects.collection);
            console.log(cities);

            var layer = svg.insert("svg:g");

            // Add an svg:g for each station.
            var marker = layer.selectAll("g")
                .data(cities.features)
                .enter().append("svg:g")
                .attr("transform", transform)
                .on('click', function(d) {
                    selectCityThenDraw(d.properties.city, d.properties.population);
                })
                .on("mouseover", function(d, i) {

                    // create label
                    var labelBox = d3.select(this).append('svg:rect')
                        .classed('label-box', true)
                    var thisText = d3.select(this).append('svg:text')
                        .attr("y", -15)
                        .style("text-anchor", "middle")
                        .text(function(d) {
                            return d.properties.city;
                        })
                        .classed("city-label", true);

                    // create background box
                    var textBBox = thisText[0][0].getBBox();
                    labelBox.attr('width', function(d, i) {
                        return textBBox.width + 6
                    })
                        .attr('height', function(d, i) {
                            return textBBox.height + 2
                        })
                        .attr('x', function(d, i) {
                            return textBBox.x - 2
                        })
                        .attr('y', function(d, i) {
                            return textBBox.y - 4
                        });
                    // .transition().duration(500)
                    // .attr('opacity', 1);
                })
                .on("mouseout", function(d) {
                    //console.log(this);
                    d3.select(this).select('.city-label').remove();
                    d3.select(this).select('.label-box').remove();
                });

            // Add a circle marker
            marker.append("svg:circle")
                .attr("r", 8)
                .classed("city-marker", true);

            function transform(d) {
                d = map.locationPoint({
                    lon: d.geometry.coordinates[0],
                    lat: d.geometry.coordinates[1]
                });
                return "translate(" + d.x + "," + d.y + ")";
            }
        });
    })();

    // draw pie donut and create list of specialties
    var selectCityThenDraw = function(selectedCity, population) {
        // clear old donut and initial info
        $('#site-information').remove();
        $('.donut').empty();

        // get the selected city from data
        var cityName = selectedCity.split(' ');
        cityName[0] = cityName[0].toLowerCase();
        var citySelector = cityName.join('');
        var theCity = nestedData.filter(function(city) {
            return city.key === citySelector;
        })[0];
        var totalPayments = theCity.sum.toFixed(0);
        console.log(theCity, selectedCity, "sum:", totalPayments, "pop:", population);

        // call the make donut function
        createDonut(selectedCity, totalPayments, theCity.values);

        // call the create list of specialties
        $('.map').fadeOut(400, function() {
            $('.specialties-list-svg').fadeIn();
            createListOfSpecialties(theCity.values);

        });
    }


});
var svg = d3.select('.map');

var po = org.polymaps;

// Create the map object and put it in the map svg
var map = po.map()
    .container(svg.node())
    .center({
        lat: 40.0,
        lon: -104.95
    })
    .zoom(9)
//  .add(po.interact());

// water map layer
map.add(po.image()
    .url(po.url("http://{S}.tile.stamen.com/watercolor/{Z}/{X}/{Y}.jpg")
        .hosts(["a", "b", "c", "d"])));

d3.json("../json/cities.json", function(error, citiesJson) {


    var cities = topojson.feature(citiesJson, citiesJson.objects.collection);
    console.log(cities);

    var layer = svg.insert("svg:g");

    // Add an svg:g for each station.
    var marker = layer.selectAll("g")
        .data(cities.features)
        .enter().append("svg:g")
        .attr("transform", transform)
        .on('click', function(d) {
            console.log(d.properties.city)
        });

    // Add a circle.
    marker.append("svg:circle")
        .attr("r", 3.5);

    // Add a label.
    marker.append("svg:text")
        .attr("dx", -36)
        .attr("dy", -15)
        .text(function(d) {
            return d.properties.city;
        });


    function transform(d) {
        d = map.locationPoint({
            lon: d.geometry.coordinates[0],
            lat: d.geometry.coordinates[1]
        });
        return "translate(" + d.x + "," + d.y + ")";
    }
});
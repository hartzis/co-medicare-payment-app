var sumPayments,
    w,
    h,
    barPad;

w = 500;
h = 350;
barPad = 1;

function init() {


    d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "svgContainer")
        .style("border", "2px solid #aaa")
};

var drawData = function(csvData) {
    console.log(csvData);

    sumPayments = d3.sum(csvData, function(d) {
        return +d.Payments
    })
    console.log('Payments Sum:', sumPayments);

    var bars = d3.select('#svgContainer')
        .selectAll('rect')
        .data(csvData)
        .enter()
        .append('rect')
        .style('fill', '#aaa')
        .attr("width", w / csvData.length - barPad)
        .attr('y', function(d) {
            return 300 - (300 * (d.Payments / sumPayments))
        })
        .attr("x", function(d, i) {
            return i * (w / csvData.length);
        })
        .attr('height', function(d) {
            return (300 * (d.Payments / sumPayments))
        });

    var barsText = d3.select('#svgContainer')
        .selectAll('text')
        .data(csvData)
        .enter()
        .append('text')
        .attr("width", w / csvData.length)
        .attr('y', '320')
        .attr("x", function(d, i) {
            return i * (w / csvData.length);
        })
        .attr('height', '35')
        .text(function(d) {
            return d.City
        });

}
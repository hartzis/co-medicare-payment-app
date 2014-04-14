var csvData,
    sumPayments,
    w,
    h,
    barPad;

d3.csv("arv-den.csv", function(csv) {

    // MAKE SURE PAYMENTS IS A NUMBER NOT STRING
    csvData = csv.map(function(d) {
        return {
            Provider: d['Provider'],
            Specialty: d['Specialty'],
            City: d['City'],
            State: d['State'],
            Payments: +d['Payments']
        }
    });

    w = 500;
    h = 350;
    barPad = 1;

    d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)

    dataLoaded();

});

var dataLoaded = function() {
    console.log(csvData);
    sumPayments = d3.sum(csvData, function(d) {
        return d.Payments
    })
    console.log('Payments Sum:', sumPayments);


    d3.select('svg')
        .selectAll('rect .graph')
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

    d3.select('svg')
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
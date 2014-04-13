var data1;

d3.csv("arv-den.csv", function(csv) {

    // MAKE SURE PAYMENTS IS A NUMBER NOT STRING
    data1 = csv.map(function(d) {
        return {
            Provider: d['Provider'],
            Specialty: d['Specialty'],
            City: d['City'],
            State: d['State'],
            Payments: +d['Payments']
        }
    });

    dataLoaded();

});

var dataLoaded = function() {
    console.log(data1);

    console.log('Payments Sum:', d3.sum(data1, function(d) {
        return d.Payments
    }));

}
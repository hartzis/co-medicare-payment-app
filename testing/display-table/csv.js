var cities_csv = function() {
    d3.csv("arv-den.csv", function(csv) {

        // MAKE SURE PAYMENTS IS A NUMBER NOT STRING
        var csvData = csv.map(function(d) {
            return {
                Provider: d['Provider'],
                Specialty: d['Specialty'],
                City: d['City'],
                // State: d['State'],
                Payments: +d['Payments']
            }
        });

        drawData(csvData);

    });
};
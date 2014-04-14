var cities_csv = function() {
    d3.csv("arv-den.csv", function(csv) {

        drawData(csv);

    });

};
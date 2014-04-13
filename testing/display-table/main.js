var data1 = d3.csv("arv-den.csv",
    function(csv) {
        return csv

        // sort by city
        // csv.sort(function(a, b) {
        //     return a.City;
        // })
    });


// console log
console.log(data1);
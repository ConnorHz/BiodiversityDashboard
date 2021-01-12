// Retrieve Data
d3.json("./data/samples.json").then(function(data) {
        
        // Fill Dropdown
        d3.select("#selDataset").selectAll("option").data(data.names)
            .enter()
            .append("option")
            .attr("value", d => {return d;})
            .html(d => {return d;})
    });





// Fill Info Panel on Change


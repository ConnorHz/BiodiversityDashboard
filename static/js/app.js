var dataPath = "./data/samples.json";

// retrieve data
d3.json(dataPath).then(function(data) {   
        // fill dropdown
    d3.select("#selDataset").selectAll("option").data(data.names)
        .enter()
        .append("option")
        .attr("value", d => {return d})
        .html(d => {return d});

    // run option changed on data load to update the dashboard
    optionChanged(d3.select("#selDataset").property("value"));

});

/**
 * Updates the paragraph elements within the "Demographic Info" div
*/
function updateMetadataPanel(data) {  
    var metadataSelection = d3.select("#sample-metadata").selectAll("p")
        .data(Object.entries(data));

    metadataSelection.enter()
        .append("p")
        .merge(metadataSelection)
        .text(d => {return `${d[0]}: ${d[1]}`});

    metadataSelection.exit().remove();
}

function updateBar(data) {  
    var samples = []

    data.otu_ids.forEach((value, index) => {
        samples.push({
            "id": value,
            "value": data.sample_values[index]
        })
    });

    var sortedData = samples.sort((a, b) => b.value - a.value);

    var slicedData = sortedData.slice(0, 10).reverse();

    console.log(slicedData);

    var data = [{
        type: 'bar',
        x: slicedData.map(x => x.value),
        y: slicedData.map(x => `OTU ${x.id}`),
        orientation: 'h'
    }];
  
    Plotly.newPlot('bar', data);
}

function updateBubble(data) {
    
}

function optionChanged(subjectId) {
    d3.json(dataPath).then(function(data) {
        console.log(data);
        
        // get metadata for selected test subject
        var metadata = data.metadata.find(({id}) => id === parseInt(subjectId));

        var sample = data.samples.find(({id}) => id === subjectId);

        console.log(metadata);
        console.log(sample);

        updateMetadataPanel(metadata);
        updateBar(sample);
    });
}








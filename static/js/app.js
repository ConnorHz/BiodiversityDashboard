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
 
}

function optionChanged(subjectId) {
    d3.json(dataPath).then(function(data) {

        // get metadata for selected test subject
        metadata = data.metadata.find(({id}) => id === parseInt(subjectId));
        
        console.log(metadata);

        updateMetadataPanel(metadata);
    });
}








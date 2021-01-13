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
  
    Plotly.newPlot('bar', data, {}, {responsive: true});
}


function updateBubble(data) {

    var data = [{
        x: data.otu_ids.map(i => `${i}`),
        y: data.sample_values,
        text: data.otu_labels,
        mode: 'markers',
        marker: {
          size: data.sample_values,
          color: data.otu_ids
        }
    }];
        
    Plotly.newPlot('bubble', data, {}, {scrollZoom: true, responsive: true});
}

function updateGauge(washes) {
    
    var data = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: washes,
        title: { text: "Navel Wash Frequency<br><span style='font-size:0.8em;color:gray'>Scrubs per Week</span>"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
        axis: { range: [null, 10]},
        bar: { color: "#768976" },
        steps: [
            { range: [0, 2], color: "#002700" },
            { range: [2, 4], color: "#003b00" },
            { range: [4, 6], color: "#004e00" },
            { range: [6, 8], color: "#006200" },
            { range: [8, 10], color: "#007600" },
        ],
        }
    }
    ];

    Plotly.newPlot('gauge', data, {}, {responsive: true});

}

function optionChanged(subjectId) {
    d3.json(dataPath).then(function(data) {
        console.log(data);
        
        // get metadata for selected test subject
        var metadata = data.metadata.find(({id}) => id === parseInt(subjectId));

        // get microbe sample for selected test subject
        var sample = data.samples.find(({id}) => id === subjectId);

        console.log(metadata);
        console.log(sample);

        updateMetadataPanel(metadata);
        updateBar(sample);
        updateBubble(sample);
        updateGauge(metadata.wfreq);
    });
}








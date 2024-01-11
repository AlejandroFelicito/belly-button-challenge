
function gauge_p(wfreq){
    let gauge_a = [{
      title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", },
      value: wfreq,
      type: "indicator",
      mode: "gauge",
      gauge: { axis: { range: [null, 9] }, },
    }];
      
Plotly.newPlot("gauge", gauge_a);
}
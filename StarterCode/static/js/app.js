
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Verify data has been read
d3.json(url).then(function(data){ 
  console.log(data); 
});



// Initialize the page with a default plot
function init() {

// Call function to create menu
  menu();

// Initial plots and metadata  
  d3.json(url).then(function(data){
    plots(data.names[0]);
    metas(data.names[0]); 
  }); 
}; 



// Function to create menu
function menu(){
  d3.json(url).then(function(data){
    for(n of Object.values(data.names)) { 
        d3.select("#selDataset").append("option").text(n); 
    };
  });
};



// Function to create plots
function plots(name_value){
  d3.json(url).then(function(data){
    let name_a = data.samples.filter(name_o => parseInt(name_o.id) == name_value);
    let hover = name_a[0].otu_labels;
    
    let bar_y = name_a[0].otu_ids.map(d => "OTU " + d.toString());
    let bar_x = name_a[0].sample_values;
    let bar_a = [{
      type: "bar",
      x: bar_x.slice(0, 10).reverse(),
      y: bar_y.slice(0, 10).reverse(),
      text: hover.slice(0, 10).reverse(),
      orientation: "h",
    }]; 

    let bubble_x = name_a[0].otu_ids;
    let bubble_y = name_a[0].sample_values;
    let bubble_a = [{
      x: bubble_x,
      y: bubble_y,
      text: hover,
      mode: "markers",
      marker: {
        size: bubble_y, 
        color: bubble_x,
      },
    }];

    Plotly.newPlot("bar", bar_a);
    Plotly.newPlot("bubble", bubble_a); 
  });
};

// Function to show metadata
function metas(meta_value){
  d3.json(url).then(function(data){
    let meta_a = data.metadata.filter(meta_o => parseInt(meta_o.id) == meta_value);
    
    d3.select(".panel-body").html("");
    
    for(k of Object.entries(meta_a[0])) {
      d3.select(".panel-body").insert("p").text(`${k[0]}: ${k[1]}`); 
    };

// Bonus
// Call function from bonus.js to create gauge plot
    gauge_p(meta_a[0].wfreq);
  });
};

// Function called when option changes
function optionChanged(selection){
  plots(selection);
  metas(selection);
};

init();
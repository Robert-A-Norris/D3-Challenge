//Setup chart dimensions 

var svgWidth = 960;
var svgHeight = 500;
var margin = {
top: 20,
right: 40,
bottom: 60,
left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group
var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function(data) {

    // Parse Data
    data.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(data, d => d.age)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.smokes)])
    .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    // Have state abbr appear in circles
    var textGroup = chartGroup.selectAll("text.label")
    .data(data)
    .enter()
    .append("text")
    .attr("class","label")
    .attr("x", d => xLinearScale(d.age)-12)
    .attr("y", d => yLinearScale(d.smokes)+5)
    .attr("fill","black")
    .text(d => d.abbr);

    // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Population that Smokes (%)");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Age");
}).catch(function(error) {
    console.log(error);
});


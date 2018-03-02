var d3 = require('d3');
var jsdom = require('jsdom');
var doc = jsdom.jsdom();
var barChart = require('./bar_chart');


var getBarChart = function (params) {

  var chart = barChart()
    .data(params.data)
    .width(params.width)
    .height(params.height)
    .xAxisLabel(params.xAxisLabel)
    .yAxisLabel(params.yAxisLabel);


  d3.select(doc.body).append('div').attr('id', params.containerId).call(chart);

  var selector = params.containerId;
  var svg = d3.select(doc.getElementById(selector)).node().outerHTML;
  d3.select(doc.getElementById(selector)).remove();

  return svg;

};


module.exports = {
  getBarChart: getBarChart
};


// [
// {
//     "courseID": "CSC302.3",
//      "year": 2014,
//     "courseName": "OOPM",
//     "text": "Students will exhibit communication between 2 objects using sequence diagram",
//     "indirectAttain": 0,
//     "directAttain": 0.30000000000000004,
//     "overallAttain": 0.24000000000000005,
//     "val" : 40
// },
// {
//     "courseID": "CSC302.3",
//      "year": 2015,
//     "courseName": "OOPM",
//     "text": "Students will exhibit communication between 2 objects using sequence diagram",
//     "indirectAttain": 0,
//     "directAttain": 0.30000000000000004,
//     "overallAttain": 0.24000000000000005,
//     "val" : 30
// },
// {
//     "courseID": "CSC302.3",
//      "year": 2016,
//     "courseName": "OOPM",
//     "text": "Students will exhibit communication between 2 objects using sequence diagram",
//     "indirectAttain": 0,
//     "directAttain": 0.30000000000000004,
//     "overallAttain": 0.24000000000000005,
//     "val" : 20
// }
// ]
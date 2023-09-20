import * as d3 from "d3";

const coords = [
    `
    375 375,
    525 125,
    675 125,
    675 375,
    900 500,
    825 625,
    525 625
  
    `
  ]
  const coords2 = [
    `
    375 375,
    450 500,
    225 625,
    0 500,
    75 375
    `
  ]
  const coords3 = [
    `
    225 375,
    225 125,
    450 0,
    525 125,
    375 375
    `
  ]
  
  d3.select('#svghandle')
    .append('svg')
      .attr('width', 900)
      .attr('height', 625)
      .style('background', '#d9edf7')
    .append('polyline')
      .attr('points', coords)
      .style('fill', '#3c763d')
  
  d3.select('svg')
    .append('polyline')
      .attr('points', coords2)
      .style('fill', '#2899D1')
  
  d3.select('svg')
    .append('polyline')
      .attr('points', coords3)
      .style('fill', 'orangered')
// !preview r2d3 data= data.frame(dest_name = c("Austin Bergstrom Intl", "Chicago Ohare Intl", "Dallas Fort Worth Intl", "Eagle Co Rgnl", "Fort Lauderdale Hollywood Intl", "General Edward Lawrence Logan Intl"), n = c(365, 1455, 7257,  103,  182,  274), dest = c("GPT", "GPT", "GPT","GPT","GPT","GPT"))

var layer_left   = 0.02;
var layer_top    = 0.05;
var layer_height = 0.90;
var layer_width  = 0.96;

var col_top    = height * layer_top;
var col_left   = width * layer_left;

function actual_max() {return d3.max(data, function (d) {return d.n; }); }
function col_width()  {return (width / actual_max()) * layer_width; }
function col_heigth() {return height / data.length * layer_height; }

var bars = svg.selectAll('rect').data(data);

bars.enter().append('rect')
    .attr('width', function(d) { return d.n * col_width(); })
    .attr('height',col_heigth() * 0.9)
    .attr('y', function(d, i) { return i * col_heigth() + col_top; })
    .attr('x', col_left)
    .attr('fill', '#99CCFF')
    .attr("d", function(d) { return d.dest; })
    .on("click", function(){
      Shiny.setInputValue(
        "bar_clicked", 
        d3.select(this).attr("d"),
        {priority: "event"}
      );
    })    
    .on("mouseover", function(){
        d3.select(this)
          .attr('fill', '#ffb14e');
    })
    .on("mouseout", function(){
        d3.select(this)
          .attr('fill', '#99CCFF');
    });

bars.exit().remove();

bars.transition()
  .duration(500)
    .attr('width', function(d) { return d.n * col_width(); })
    .attr('height',col_heigth() * 0.9)
    .attr('y', function(d, i) { return i * col_heigth() + col_top; })
    .attr('x', col_left)
    .attr('fill', '#99CCFF')
    .attr("d", function(d) { return d.dest; });

var txt = svg.selectAll('text').data(data);

txt.enter().append('text')
      .attr('x', col_left * 1.1)
      .attr('y', function(d, i) { return i * col_heigth() + (col_heigth() / 2) + col_top; })
      .text(function(d) {return d.dest_name + ' - ' + d.n; })
      .attr("d", function(d) { return d.dest; })
      .on("click", function(){
        Shiny.setInputValue(
          "bar_clicked", 
          d3.select(this).attr("d"),
          {priority: "event"}
        );
      })  
      .style('font-size', '14px') 
      .style('font-family', 'sans-serif');  
      
txt.exit().remove();

txt.transition()
  .duration(1000)
      .attr('x', col_left * 1.1)
      .attr('y', function(d, i) { return i * col_heigth() + (col_heigth() / 2) + col_top; })
      .text(function(d) {return d.dest_name + ' - ' + d.n; })
      .attr("d", function(d) { return d.dest; });
      

var bottomline = svg.append('line');

bottomline
  .attr('x1', 0)
  .attr('x2', width)
  .attr('y1', height * 0.95)
  .attr('y2', height * 0.95)
  .attr('stroke', 'black')
  .attr('stroke-width', 0.5);
  
  


  
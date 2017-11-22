$(function() {


  var d3Object = {};

	// $("#expense-information").on("click", function(event){
 //    event.preventDefault();
	// 	runExpenseQuery();
	// });


  // Event handler for the query of a certain users expenses
  $(".expense-query-form").on("submit", function(event){
    event.preventDefault();
    var user = $("#usernameExpenses").val().trim();
    runExpenseQuery(user);
  });




  //  Function that gets run when user requests the expenses from a certain user.
  function runExpenseQuery(user) {
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax("/api/expenses/" + user, {
      type: "GET",
    })
    .then(function(expenseData) {
      d3Object = JSON.stringify(expenseData);
      console.log(d3Object)
      createPieChart(expenseData);
    	// location.reload();
    });
  }


  function createPieChart(d3Object) {
    var data = [];
    for (var i = 0; i < d3Object.length; i++) {
      console.log(d3Object[i].expense_value)
      data.push(d3Object[i].expense_value)
    }

    console.log(data)


    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

  // //Add the SVG Text Element to the svgContainer
  // var text = svg.selectAll(".arcs")
  //                         .data(d3Object)
  //                         .enter()
  //                         .append("text");

  // //Add SVG Text Element Attributes
  // var textLabels = text
  //                  .attr("x", function(d) { return d.cx; })
  //                  .attr("y", function(d) { return d.cy; })
  //                  .text( function (d) { return d.expense_category})
  //                  .attr("font-family", "sans-serif")
  //                  .attr("font-size", "20px")
  //                  .attr("fill", "red");



    //Generate groups
    var arcs = g.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc");

    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);


    arcs.append("text")
      .attr("transform", function(d) {
        var _d = arc.centroid(d);
        _d[0] *= 1.5; //multiply by a constant factor
        _d[1] *= 1.5; //multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".50em")
      .style("text-anchor", "middle")
      .data(d3Object)
      .text(function(d) {  return d.expense_category;});
        
    arcs.append("text")
    .attr("transform", function(d) {
        var _d = arc.centroid(d);
        _d[0] *= 1.5; //multiply by a constant factor
        _d[1] *= 1.5; //multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".50em")
     .attr("text-anchor", "middle")
     .attr('font-size', '1.00em')
     .attr('y', 20)
     .data(d3Object)
     .text(function(d){ return d.expense_value});

  }


});
$(function() {


  var d3Object = {};

///////////
//Event Handlers
//////////

  // Event handler for the query of a certain users expenses in a d3 pie chart
  $(".create-pie-chart").on("submit", function(event){
    event.preventDefault();
    var user = $("#usernameExpensesPie").val().trim();
    pieChartQuery(user);
  });


    // Event handler for the query of a certain users expenses in a line graph with net worth on the y axis and time on the x axis
  $(".create-line-graph").on("submit", function(event){
    event.preventDefault();
    var user = $("#usernameExpensesLine").val().trim();
    lineGraphQuery(user);
  });




/////////////
// AJAX Calls
/////////////

  //  Function that gets run when user requests the expenses from a certain user.
  function pieChartQuery(user) {
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax("/api/expenses/" + user, {
      type: "GET",
    })
    .then(function(expenseData) {
      console.log("pie chart query run")
      createPieChart(expenseData);
    });
  }

    //  Function that gets run when user requests the expenses from a certain user.
  function lineGraphQuery(user) {
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax("/api/expenses/" + user, {
      type: "GET",
    })
    .then(function(expenseData) {
      console.log("line graph query run")
      createLineGraph(expenseData);
    });
  }



/////////////////
// Funtions Creating Visualizations
/////////////////
var i= 0;
  // d3 function to create pie chart based on user data
  function createPieChart(d3Object) {
    var data = [];
    for (var i = 0; i < d3Object.length; i++) {
      console.log(d3Object[i].expense_value)
      data.push(d3Object[i].expense_value)
    }

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

    //Add Expense Category to slice
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
        
    // Add Expense Cost to slice
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

  // d3 function to create line graph based on user data
    function createLineGraph(d3Object) {
      var dataArray = []
      for (var i = 0; i < d3Object.length; i++) {
       var data = {
          date: d3Object[i].createdAt,
          expense: d3Object[i].expense_value,
          expenseBool: d3Object[i].expense
        }
        dataArray.push(data);
      }


        var svg = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime()
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.expense); });


        for (var i = 0; i < dataArray.length; i++) {
          dataPoints(dataArray[i], drawLine);

        }

        //timeFormat a date object into %Y-%m-%d
        function parseDate(date){
           d3.timeParse("%Y-%m-%d");
        }

        var parseTime = d3.timeParse("%d-%b-%y");


        function dataPoints(d, drawLine){
          d.date = i++
          d.expense = +d.expense;
          drawLine(d);
        }

        function drawLine(data) {
          console.log("draw line maybe")
          console.log("data: " + JSON.stringify(data))
          console.log(data)

          x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain(d3.extent(data, function(d) { return d.expense; }));

          g.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))
            .select(".domain")
              .remove();

          g.append("g")
              .call(d3.axisLeft(y))
            .append("text")
              .attr("fill", "#000")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .attr("text-anchor", "end")
              .text("Price ($)");

          g.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("stroke-width", 1.5)
              .attr("d", line);
        };
  }


});
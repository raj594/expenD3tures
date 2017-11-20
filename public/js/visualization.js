
$(function() {

	$("#expense-information").on("click", function(event){
    event.preventDefault();
		runExpenseQuery();
	});


function runExpenseQuery() {

  // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
  $.ajax("/api/expenses", {
    type: "GET"
  })
  .then(function(expenseData) {
    console.log(JSON.stringify(expenseData))
  	location.reload();
  });
}

// // This function resets all of the data in our tables. This is intended to let you restart a demo.
// function clearTable() {

//   var currentURL = window.location.origin;
//   $.ajax({ url: currentURL + "/api/expenses/clear", method: "POST" });

// }

$("#clear").on("click", function() {
  alert("Clearing...");
  clearTable();

  // Refresh the page after data is cleared
  location.reload();

});



});
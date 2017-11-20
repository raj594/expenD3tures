
$(function() {

	$("#expense-information").on("click", function(event){
    event.preventDefault();
		runExpenseQuery();
	});

  $(".expense-query-form").on("submit", function(event){
    event.preventDefault();
    var user = $("#usernameExpenses").val().trim();
    runExpenseQuery(user);
  });


  function runExpenseQuery(user) {
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax("/api/expenses/" + user, {
      type: "GET",
    })
    .then(function(expenseData) {
      console.log(JSON.stringify(expenseData))
    	location.reload();
    });
  }

});
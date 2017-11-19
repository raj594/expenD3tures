
$(function() {


// Take inputs when user completes registration form	
$(".expense-form").on("submit", function(event) {
	event.preventDefault();
	var newExpense = {
		username: $("#username").val().trim(),
		expense: $("#expense").val(),
		expense_category: $("#expenseCategory").val().trim(),
		expense_value: $("#expenseValue").val(),
		recurring: $("#recurring").val(),
		recurring_periodic: $("#recurringPeriodic").val()
	};

	$.ajax("/api/newExpense", {
		type: "POST",
		data: newExpense
	}).then(
		function(result) {
			// This console log happens in chrome console
			console.log(result)
			location.reload()
		}
	);
});


});
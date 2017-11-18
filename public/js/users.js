
$(function() {
$(".create-form").on("submit", function(event) {
	event.preventDefault();
	var newUser = {
		name: $("#name").val().trim()
	};

	$.ajax("/login", {
		type: "POST",
		data: newUser
	}).then(
		function() {
			console.log("created new user");
			location.reload()
		}
	);
});

})
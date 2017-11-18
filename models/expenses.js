module.exports = function (sequelize, DataTypes) {
	var Expense = sequelize.define("Expense", {
		user_name: DataTypes.STRING,
		expense: DataTypes.BOOLEAN,
		expense_category: DataTypes.STRING,
		expense_value: DataTypes.STRING,
		recurring: DataTypes.BOOLEAN,
		recurring_periodic: DataTypes.INTEGER
	});
	return Expense
};
        // id: {
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: Sequelize.INTEGER
        // },


module.exports = function (sequelize, DataTypes) {
	var Expense = sequelize.define("Expense", {
		user_name: {
			type: DataTypes.STRING,
		},

		expense: {
			type: DataTypes.BOOLEAN,
		},

		expense_category: {
			type: DataTypes.STRING,
		},
		expense_value: {
			type: DataTypes.NUMERIC(6,2),
		},
		recurring: {
			type: DataTypes.BOOLEAN,
		},
		recurring_periodic: {
			type: DataTypes.INTEGER
		}
	});

	Expense.associate = function(models) {
	    Expense.belongsTo(models.User, {
	    	foriegnKey: "username"
	    });
	};


	return Expense
};
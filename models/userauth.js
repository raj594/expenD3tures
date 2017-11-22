//module.exports = function (sequelize, DataTypes) {
//	var User = sequelize.define("User", {
//		name: DataTypes.STRING,
//		username: DataTypes.STRING,
//		password: DataTypes.STRING,
//		email: DataTypes.STRING
//	});
//	return User
//};

module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('User', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        username: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        about: {
            type: Sequelize.TEXT
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        last_login: {
            type: Sequelize.DATE
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
 
 
    });
 
    User.associate = function(models) {
        User.hasMany(models.Expense)
    };


    return User;
 
}
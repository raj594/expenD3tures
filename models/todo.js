
module.exports = function (sequelize, DataTypes) {
    var ModelName = sequelize.define('model_name', 
    {
        text: DataTypes.STRING,
        complete: DataTypes.BOOLEAN
    });
    return ModelName;
  };
  
  
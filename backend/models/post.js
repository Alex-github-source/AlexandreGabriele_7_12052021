'use strict';

const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }, onDelete:'CASCADE', 
      }),
        models.Post.hasMany(models.Comment )
    }
    };
  Post.init({
    message:  { type: DataTypes.STRING, allowNull: false },
    link:  { type: DataTypes.STRING, allowNull: true },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
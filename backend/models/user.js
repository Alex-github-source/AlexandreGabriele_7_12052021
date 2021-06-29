'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
    }
   
  };
  User.init({
    
    pseudo: 
     { 
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
        validator: function(v){
            return /[a-zA-Zéèëà]+[ -']?[a-zA-Zéèëà]+[minLength:3]/.test(v); //regex de validation pour les champs du formulaire (empeche les caracteres spéciaux)
        },
        message: props => `${props.value} is not a valid name !`,
        notNull:{msg:'User must have a name'},
        notEmpty:{msg:'Name must not be empty'}
    } 
       },
    email: 
     { 
       type: DataTypes.STRING, 
       allowNull: false,
       validate:{
        notNull:{msg:'User must have an email'},
        notEmpty:{msg:'Email must not be empty'}
       }
      
      },
    password: 
     {
        type: DataTypes.STRING,
         allowNull: false 
        },
    isAdmin:
     { 
       type: DataTypes.BOOLEAN,
       allowNull: false ,
       defaultValue:false}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
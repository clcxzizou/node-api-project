const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : {
        msg :'Le nom est déja pris.'
      },
      validate :{
        notEmpty : {msg : 'Le nom ne peut pas etre vide.'},
        notNull: {msg : 'Le nom est une propriété requise.'}
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt :{msg : 'Utilisez uniquement les nombres entiers pour les points de vie.'},
        min :{
          args: [0],
          msg: 'Les points de vie doivent etre superieur ou égal à 0.'
        },
        max :{
          args : [999],
          msg : 'Les points de vie doivent etre inférieur ou égal à 999.'
        },
        notNull :{msg : `Les points de vie sont une proprièté requise.`} 
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt :{msg : 'Utilisez uniquement les nombres entiers pour les points de dégats.'},
        min :{
          args: [0],
          msg: 'Les points de vie doivent etre superieur ou égal à 0.'
        },
        max :{
          args : [99],
          msg : 'Les points de vie doivent etre inférieur ou égal à 99.'
        },
        notNull :{msg : `Les points de dégats sont une proprièté requise.`} 
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl :{msg : 'Utilisez uniquement des URL valides pour l\'image.'},
        notNull :{msg : `L\'image est une proprièté requise.`} 
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types' , types.join())
      },
      validate :{
        isTypesValid(value){
          if(!value){
            throw new Error('Un pokemon doit au moins avoir 1 type.')
          }
          if(value.split(',').length > 3){
            throw new Error('Un pokemon ne peut pas avoir plus de trois types.')
          }
          value.split(',').forEach(type => {
            if(!value.includes(type)){
              throw new Error(`Le type de Pokemon doit apartenir à la liste suivante : ${validTypes}`)
            }
          })
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
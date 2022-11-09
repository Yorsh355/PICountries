const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: {
            args: true,
            msg: "El nombre solo puede contener letras",
          },
        },
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        //consultar formato de fecha requerido
        type: DataTypes.INTEGER,
      },
      season: {
        type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
      },
    },
    {
      //no pluraliza las tablas
      freezeTableName: true,
      timestamps: false,
    }
  );
};

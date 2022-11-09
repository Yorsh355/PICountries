const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getCountries = async () => {
  try {
    let copyApi = await axios.get("https://restcountries.com/v3/all");
    await copyApi.data.map((country) => {
      if (!country.hasOwnProperty("capital")) {
        country.capital = ["sin capital asignada"];
      }
      return Country.findOrCreate({
        where: { id: country.cca3 },
        defaults: {
          id: country.cca3,
          name: country.name.common,
          flags: country.flags[1],
          continents: country.continents[0],
          capital: country.capital[0],
          subregion: country.subregion,
          area: country.area,
          population: country.population,
        },
      });
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCountries = async (req, res) => {
  let { name } = req.query;
  try {
    if (name) {
      name = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
      const country = await Country.findAll({
        where: { name: { [Op.iLike]: `${name}%` } },
        include: Activity,
      });
      if (!country) res.status(404).send("Pais no encontrado");
      res.status(200).json(country);
    }
    await getCountries();
    let countries = await Country.findAll({
      include: Activity,
    });

    //res.status(200).json(countries);
    res.status(200).json(countries);
  } catch (error) {
    console.log(error.message);
  }
};

const getCountryId = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
      },
    });
    res.status(200).json(country);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCountries,
  getCountryId,
};

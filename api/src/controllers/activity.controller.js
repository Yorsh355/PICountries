const { Activity, Country } = require("../db");

const createActivity = async (req, res) => {
  let { allCountries, name, difficulty, duration, season } = req.body;
  try {
    let activity = await Activity.findOne({
      where: { name, difficulty, duration, season },
    });
    //Crea la actividad en la DB con los parámetros pasados por body y se crea la relación con la tabla country
    if (!activity) {
      activity = await Activity.create(
        {
          name,
          difficulty,
          duration,
          season,
        },
        {
          include: Country,
        }
      );
    }
    let names = allCountries.map((co) => co.name);
    names.forEach(async (co) => {
      //Me aseguro que el nombre que me estan pasando sea formato mayuscula y minuscula
      co = co.charAt(0).toUpperCase() + co.slice(1).toLowerCase();
      //busco el pais que coincida con el nombre que me pasan y en la variable quedaría un obj con la info del pais
      let newCountry = await Country.findOne({ where: { name: co } });
      //Si el pais existe le adiciona la actividad
      if (newCountry) {
        await newCountry.addActivity(activity);
      }
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getActivities = async (req, res) => {
  try {
    let activities = await Activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createActivity,
  getActivities,
};

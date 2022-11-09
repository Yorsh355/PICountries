const { Router } = require("express");
const {
  getAllCountries,
  getCountryId,
} = require("../controllers/countries.controller");
const {
  createActivity,
  getActivities,
} = require("../controllers/activity.controller");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/countries", getAllCountries);
router.get("/countries/:id", getCountryId);
router.post("/activity", createActivity);
router.get("/activities", getActivities);

module.exports = router;

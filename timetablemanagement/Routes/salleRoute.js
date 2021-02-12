const express = require("express");
const Router = express.Router();
const { getAllSalles } = require("../middlewares/salleMiddleware");
const { getSalles } = require("../controllers/salleController");

Router.route("/").post(getAllSalles, getSalles);

module.exports = Router;

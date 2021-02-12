const express = require("express");
const Router = express.Router();
const { getProf } = require("../controllers/profController");
const { selectProfMiddelware } = require("../middlewares/profMiddleware");

Router.route("/").post(selectProfMiddelware, getProf);

module.exports = Router;

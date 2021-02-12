const express = require("express");
const Router = express.Router();
const { getclasse } = require("../controllers/classeController");

Router.route("/").post(getclasse);

module.exports = Router;

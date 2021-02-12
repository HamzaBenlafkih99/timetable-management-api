const express = require("express");
const Router = express.Router();
const { getTypedGroupes, groupeOccupe } = require("../middlewares/groupeMiddelware");
const { groupeAvailble } = require("../controllers/groupeController");

Router.route("/availble").post(getTypedGroupes, groupeOccupe, groupeAvailble);

module.exports = Router;

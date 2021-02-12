const express = require("express");
const bodyParser = require("body-parser");
const groupeRoute = require("./Routes/groupeRoute");
const salleRoute = require("./Routes/salleRoute");
const classeRoute = require("./Routes/classeRoute");
const profRoute = require("./Routes/profRoute");

const app = express();

app.use(bodyParser.json());

app.use("/getClasse", classeRoute);
app.use("/availbleSalle", salleRoute);
app.use("/groupes", groupeRoute);
app.use("/availbleProf", profRoute);

app.listen(5000, () => console.log("server is running on port 5000"));

const { connection } = require("../connection");

const removeDuplicate = (rows) => {
  let unique = {};
  rows.forEach((e) => {
    if (!unique[e.prof]) {
      unique[e.prof] = true;
    }
  });
  return Object.keys(unique);
};

const getProf = (req, res) => {
  const profs = req.profs;
  const { matiere, jour, heure, debut, fin } = req.body;

  const query = `
  select prof from emplois_de_temps 
  where matiere="${matiere}" and jour="${jour}" and heure="${heure}" and not(fin < ${debut} or debut > ${fin})
  `;

  connection.query(query, (err, rows, field) => {
    if (!err) {
      const profOccupe = removeDuplicate(rows);

      profOccupe.forEach((prof) => {
        const index = profOccupe.indexOf(prof);
        if (index > -1) {
          profs.splice(index, 1);
        }
      });

      return res.json({ data: profs });
    } else {
      console.log(err);
    }
  });
};

module.exports = { getProf };

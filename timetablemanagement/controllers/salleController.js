const { connection } = require("../connection");

const removeDuplicate = (rows) => {
  let unique = {};
  rows.forEach((e) => {
    if (!unique[e.salle]) {
      unique[e.salle] = true;
    }
  });
  return Object.keys(unique);
};

const getSalles = (req, res) => {
  const { jour, heure, debut, fin, type, classe } = req.body;
  const salles = req.salles;

  const query = `
  select salle from emplois_de_temps 
  where jour="${jour}" and heure="${heure}" and not(fin < ${debut} or debut > ${fin})
  `;

  connection.query(query, (err, rows, field) => {
    if (!err) {
      const ocuppe = removeDuplicate(rows);

      ocuppe.forEach((occ) => {
        const index = salles.indexOf(occ);
        salles.splice(index, 1);
      });

      res.status(200).json({ data: salles });
    } else {
      console.log(err);
    }
  });
};

module.exports = { getSalles };

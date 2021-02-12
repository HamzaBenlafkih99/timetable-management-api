const { connection } = require("../connection");

const getTypedGroupes = (req, res, next) => {
  const { type, classe } = req.body;
  const query = `
  select g.nom from groupe as g
  inner join classe as c on g.classe_id=c.id
  inner join type_cours as t on g.id_type=t.id_type
  where t.nom="${type}" and c.nom="${classe}"
  `;

  connection.query(query, (err, rows, field) => {
    if (!err) {
      const groupes = rows.map((grp) => {
        return grp.nom;
      });
      req.availbleGroupes = groupes;
      next();
    } else {
      console.log(err);
    }
  });
};

const groupeOccupe = (req, res, next) => {
  const { classe, jour, heure, debut, fin } = req.body;

  const query = `
  select groupe, type_cours as type from emplois_de_temps
  where classe="${classe}" and 
  jour="${jour}" and 
  heure="${heure}" and 
  not(fin < ${debut} or debut > ${fin})
  `;

  connection.query(query, (err, rows, field) => {
    if (!err) {
      req.groupeOccupe = rows;
      next();
    } else {
      console.log(err);
    }
  });
};

module.exports = { getTypedGroupes, groupeOccupe };

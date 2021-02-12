const { connection } = require("../connection");

const getclasse = (req, res) => {
  const { nom } = req.body;
  const query = `
    select cl.nom from classe as cl
    inner join filiere as f on cl.filiere_id=f.id
    where f.nom="${nom}";
  `;

  connection.query(query, (err, rows, field) => {
    if (!err) {
      res.json({ data: rows });
    } else {
      console.log(err.message());
    }
  });
};

module.exports = { getclasse };

const { connection } = require("../connection");

const selectProfMiddelware = (req, res, next) => {
  const { matiere, type } = req.body;

  const query = `select nom from prof where matiere="${matiere}" and ${type}='true'`;
  connection.query(query, (err, rows, field) => {
    if (!err) {
      req.profs = rows.map((row) => {
        return row.nom;
      });
      next();
    } else {
      console.log(err);
    }
  });
};

module.exports = { selectProfMiddelware };

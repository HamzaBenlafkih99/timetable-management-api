const { connection } = require("../connection");

const Groupes = (groupeOccupe, availbleGroupes, currentType) => {
  return new Promise(function (resolve, reject) {
    if (currentType === "TD") {
      const query = `
      select g.nom from groupe as g
      inner join sousgroupe as sg on g.id_groupe=sg.groupe_id
      where sg.nom="${groupeOccupe.groupe}"
      `;

      connection.query(query, (err, rows, field) => {
        const index = availbleGroupes.indexOf(rows[0].nom);
        availbleGroupes.splice(index, 1);

        resolve(availbleGroupes);
      });
    } else {
      const query = `
        select sg.nom from sousgroupe as sg
        inner join groupe as g on g.id_groupe=sg.groupe_id
        where g.nom="${groupeOccupe.groupe}"
        `;

      connection.query(query, (err, rows, field) => {
        rows.forEach((row) => {
          const index = availbleGroupes.indexOf(row.nom);
          availbleGroupes.splice(index, 1);
        });

        resolve(availbleGroupes);
      });
    }
  });
};

async function groupeAvailbleRecursion(groupeOccupe, availbleGroupes, currentType) {
  try {
    if (groupeOccupe[0].type === "Cours") {
      return [];
    } else if (groupeOccupe[0].type === currentType) {
      const index = availbleGroupes.indexOf(groupeOccupe[0].groupe);
      availbleGroupes.splice(index, 1);

      groupeOccupe.splice(0, 1);

      if (groupeOccupe.length === 0) {
        return availbleGroupes;
      }

      return await groupeAvailbleRecursion(groupeOccupe, availbleGroupes, currentType);
    } else {
      const availbleGroupe = await Groupes(groupeOccupe[0], availbleGroupes, currentType);

      groupeOccupe.splice(0, 1);

      if (groupeOccupe.length === 0) {
        return availbleGroupe;
      }

      return await groupeAvailbleRecursion(groupeOccupe, availbleGroupe, currentType);
    }
  } catch (error) {
    console.log(error);
  }
}

const groupeAvailble = async (req, res) => {
  try {
    const { type } = req.body;
    const { availbleGroupes, groupeOccupe } = req;

    const data = await groupeAvailbleRecursion(groupeOccupe, availbleGroupes, type);

    res.json({ data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { groupeAvailble };

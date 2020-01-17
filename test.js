const dotenv = require('dotenv');
dotenv.config();

/*const db = require('./app/db');

db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});*/

// on importe le fichier des relations, qui fait maintenant office "d'annuaire des modèles"
// comme côté relations.js, on exporte tous les modèles, je peux me permettre de faire mon shopping
// et de ne récupérer que les modèles que j'utilise directement dans mon code
const { List } = require('./app/models/relations');

// qui dit await dit async ;-)
const run = async () => {
    // on récupère toutes les listes
    let lists = await List.findAll({
        include: [
            {association: 'cards', include: ['tags']}
        ]
    });

    // et on vérifie ce qu'on a récupéré
    console.table(lists);
};

// le test est déclaré, yapluka
run();
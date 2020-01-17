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

// on importe le modèle à tester
const List = require('./app/models/list');

// qui dit await dit async ;-)
const run = async () => {
    // on récupère toutes les listes
    let lists = await List.findAll();

    // et on vérifie ce qu'on a récupéré
    console.table(lists);
};

// le test est déclaré, yapluka
run();
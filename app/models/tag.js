const Sequelize = require('sequelize');
const db = require('../db');

class Tag extends Sequelize.Model {

};

Tag.init({
  label: Sequelize.TEXT,
  color: Sequelize.INTEGER
}, {
  sequelize: db,
  tableName: "tag",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Tag;
const mongoose = require('mongoose');
const Mechanic = require('./mechanic');

const Rating = sequelize.define('Rating', {
  mechanicId: {
    type: DataTypes.INTEGER,
    references: {
      model: Mechanic,
      key: 'id'
    }
  },
  rating: { type: DataTypes.INTEGER, allowNull: false }
});

Rating.belongsTo(Mechanic, { foreignKey: 'mechanicId' });

module.exports = Rating;
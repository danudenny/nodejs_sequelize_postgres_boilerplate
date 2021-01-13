module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    price: DataTypes.DOUBLE
  }, {
    underscored: true
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Order.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
  };
  return Order;
};
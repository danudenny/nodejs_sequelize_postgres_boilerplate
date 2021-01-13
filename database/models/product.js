module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    underscored: true
  });
  Product.associate = (models) => {
    Product.hasMany(models.Order, {
      foreignKey: 'productId',
      as: 'ordersProduct',
    });
  };
  return Product;
};
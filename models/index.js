const Product = require(`./product`);
const Category = require(`./category`);
const Tag = require(`./tag`);
const ProductTag = require(`./productTag`);

Product.belongsTo(Category);

Category.hasMany(Product);

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: `product_id`
  }
})

Tag.belongsToMany(Product, {
  through:{
    model: ProductTag,
    foreignKey: `tag_id`
  }
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
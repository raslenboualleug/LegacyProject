const { Sequelize, DataTypes } = require("sequelize");

const dbName = "exclusive";
const dbUser = "root";
const dbPass = "root";
const dbHost = "localhost";

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected database");
  })
  .catch((error) => {
    console.error("failed to connect to the database:", error);
  });

const User = require("../Models/User")(sequelize, DataTypes);
const Product = require("../Models/Products")(sequelize, DataTypes);
const Order = require("../Models/Order")(sequelize, DataTypes);
const Wishlist = require("../Models/Wishlist")(sequelize, DataTypes);

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Tables created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create tables:", error);
//   });

const db = {};

db.connection = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Product = Product;
db.Order = Order;
db.Wishlist = Wishlist;

// db.User.hasMany(db.Order, { foreignKey: "userId" });
// db.Product.belongsTo(db.User, { foreignKey: "userId" });

db.User.belongsToMany(db.Product, { through: "Wishlist" });
db.Product.belongsToMany(db.User, { through: "Wishlist" });

module.exports = db;

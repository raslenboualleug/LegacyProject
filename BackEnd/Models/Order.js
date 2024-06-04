module.exports = (connection, DataTypes) => {
    const Order = connection.define("Order", {
      products: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        defaultValue: "pending",
        allowNull: false,
      },
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    });
    return Order;
  };
  
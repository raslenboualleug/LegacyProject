const db = require("./config");

module.exports = {
  
addOrder : async (req, res) => {
  try {
    const { customerName, products, totalAmount, quantity,status, date, userId } = req.body;
    const newOrder = await db.Order.create({
      customerName,
      products,
      totalAmount,
      status,
      quantity,
      userId,
      date
    });

    res.status(201).json({ success: true, message: 'Order added successfully', order: newOrder });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ success: false, message: 'Failed to add order', error: error.message });
  }
},
    getOrder: async (req, res) => {
        const OrderId = req.params.orderId;
        try {
          const order = await db.Order.findByPk(OrderId,{ include: db.User }); 
          if (!order) {
            return res.status(404).send("order not found");
          }
          res.json(order);
        } catch (error) {
          console.error(error);
          res.status(500).send("Error fetching order");
        }
      },

       
    getAllorders: async (req,res)=> {
        try {
          const order = await db.Order.findAll();
          res.json(order);
        } catch (error) {
          console.error(error);
          res.status(500).send("Error fetching products");
        }
      },

     markOrder: async (req, res) => {
      const OrderId = req.params.orderId;
      const { status } = req.body;
      try {
        const order = await db.Order.findByPk(OrderId);
        if (!order) {
          return res.status(404).send('Order not found');
        }
        order.status = status;
        await order.save();
        res.json({ success: true, message: 'Order status updated successfully', order });
      } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: 'Failed to update order status', error: error.message });
      }
    }

}
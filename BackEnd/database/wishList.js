const db = require("./config");

module.exports = {
    getWishlistByUserId: async (req, res) => {
        const userId = req.params.userId;
        try {
            const wishlistItems = await db.Wishlist.findAll({
                where: { UserId: userId }
            });
    
            const productIds = wishlistItems.map(item => item.ProductId);
    
            const products = await db.Product.findAll({
                where: { id: productIds }
            });
    
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error fetching wishlist items");
        }
    },
  addToWishlist: async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).send("User ID and Product ID are required");
    }

    try {
      const existingWishlistItem = await db.Wishlist.findOne({ where: { userId, productId } });

      if (existingWishlistItem) {
        return res.status(400).send("Item is already in the wishlist");
      }

      const wishlistItem = await db.Wishlist.create({ UserId:userId, ProductId:productId });

      res.status(201).send({ message: "Item added to wishlist", wishlistItem });
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      res.status(500).send("Error adding item to wishlist");
    }
  },
  removeFromWishlist: async (req, res) => {
    const { userId,productId } = req.body;
    

    if (!userId || !productId) {
      return res.status(400).send("User ID and Product ID are required");
    }

    try {
      const removedItem = await db.Wishlist.destroy({
        where: { UserId: userId, ProductId: productId }
      });

      if (removedItem === 0) {
        return res.status(404).send("Item not found in the wishlist");
      }

      res.status(200).send({ message: "Item removed from wishlist" });
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      res.status(500).send("Error removing item from wishlist");
    }
}

};

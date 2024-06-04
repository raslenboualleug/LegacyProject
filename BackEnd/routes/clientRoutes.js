const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const User = require('../database/User');
const Order = require('../database/Order');
const wishlist=require('../database/wishList')

const { logIn, signUp } = require('../database/Auth');
const {
  validiSeller,
  protect,
  checkAdminRole,
} = require('../MiddleWares/MiddleWares');

router.get('/products', Product.getAllproducts);
router.get('/products/FS', Product.getTopStockProducts);
router.get('/products/:productId', Product.getOneProduct);
router.get('/products/category/:category', Product.getByCategory);

router.post('/order',Order.addOrder) 

router.get("/wishlist/:userId", wishlist.getWishlistByUserId);
router.post('/wishlist/add',wishlist.addToWishlist)
router.delete("/wishlist/:productId", wishlist.removeFromWishlist);

router.get('/get/:userId',User.getOneUser)
router.get('/:userName',User.getByUsername)
router.put('/up/:userId',User.updateUser)

router.post('/signup', validiSeller, signUp);
router.post('/login', logIn);

module.exports = router;



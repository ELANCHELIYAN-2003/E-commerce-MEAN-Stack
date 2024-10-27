const mongoose = require("mongoose");
mongoose.set('strictQuery', true); // To suppress the deprecation warning
mongoose.connect("mongodb+srv://user_social:Surya%402004@cluster0.3d3l4gg.mongodb.net/food-app", () => {
  console.log("mongodb connection successful!!");
});

// models
// to store product details
const Product = mongoose.model("Product", {
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

// Add product function
const addProduct = (productData) => {
  const product = new Product(productData);
  return product.save();
};

// to store user details
const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
  checkout: [],
  cart: [],
  wishlist: [],
  orders: [
    {
      products: Array,
      total: Number,
      date: Date,
    },
  ],
});

module.exports = {
  Product,
  addProduct,
  User,
};

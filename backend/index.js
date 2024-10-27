const express = require("express");
const cors = require("cors");
const dataService = require("./services/dataServices");
const server = express();
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const { Product, addProduct } = require('./services/db'); // Import addProduct

// Configure CORS to allow requests from frontend
server.use(cors({
  origin: ['https://e-commerce-mean-stack.onrender.com', 'http://localhost:4200','http://localhost:3000'], // Allow both URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Token']
}));

server.use(bodyParser.json());
server.use(express.json());

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Application-specific middleware
const appMiddleware = (req, res, next) => {
  console.log("inside application middleware");
  next();
};

server.use(appMiddleware);

// Token verification middleware
const jwtMiddleware = (req, res, next) => {
  console.log("inside router specific middleware");
  const token = req.headers["access-token"];
  console.log(token);
  try {
    const data = jwt.verify(token, "B68DC6BECCF4A68C3D8D78FE742E2");
    req.email = data.email;
    console.log("valid token");
    next();
  } catch {
    console.log("invalid token");
    res.status(401).json({ message: "Please Login!" });
  }
};

server.get('/', (req, res) => {
  res.send('Welcome to the !');
});

// Register API
server.post("/register", (req, res) => {
  console.log("inside register api");
  console.log(req.body);
  dataService.register(req.body.username, req.body.email, req.body.password)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Login API
server.post("/login", (req, res) => {
  console.log("inside login api");
  console.log(req.body);
  dataService.login(req.body.email, req.body.password)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Fetch all products API
server.get("/all-products", (req, res) => {
  dataService.allProducts().then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// View single product API
server.get("/view-product/:productId", (req, res) => {
  dataService.viewProduct(req.params.productId).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Add to wishlist API
server.post("/addToWishlist", jwtMiddleware, (req, res) => {
  console.log("inside addtowishlist api");
  dataService.addToWishlist(req.body.email, req.body.productId)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Remove from wishlist API
server.put("/removeFromWishlist", jwtMiddleware, (req, res) => {
  console.log("inside removeFromWishlist api");
  dataService.removeFromWishlist(req.body.email, req.body.productId)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Add to cart API
server.post("/addToCart", jwtMiddleware, (req, res) => {
  console.log("inside addToCart api");
  dataService.addToCart(req.body.email, req.body.productId, req.body.count)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Remove from cart API
server.put("/removeFromCart", jwtMiddleware, (req, res) => {
  console.log("inside removeFromWishlist api");
  dataService.removeFromCart(req.body.email, req.body.productId)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Update cart item count API
server.put("/updateCartItemCount", jwtMiddleware, (req, res) => {
  console.log("inside updateCartItemCount api");
  dataService.updateCartItemCount(req.body.email, req.body.productId, req.body.count)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Empty cart API
server.put("/emptyCart", jwtMiddleware, (req, res) => {
  console.log("inside emptyCart api");
  dataService.emptyCart(req.body.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Get wishlist API
server.get("/getWishlist/:email", jwtMiddleware, (req, res) => {
  dataService.getWishlist(req.params.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Get my orders API
server.get("/getMyOrders/:email", jwtMiddleware, (req, res) => {
  dataService.getMyOrders(req.params.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// Checkout API
server.post("/addToCheckout", jwtMiddleware, (req, res) => {
  console.log("inside addToCheckout api");
  dataService.addToCheckout(
      req.body.email,
      req.body.orderID,
      req.body.transactionID,
      req.body.dateAndTime,
      req.body.amount,
      req.body.status,
      req.body.products,
      req.body.detailes
    )
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Fetch all products API
server.get('/api/products', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' });
    } else {
      res.status(200).json(products);
    }
  });
});

// Add a new product API
server.post('/api/products', (req, res) => {
  addProduct(req.body).then((product) => {
    res.status(201).json(product);
  }).catch((err) => {
    res.status(500).json({ message: 'Error adding product' });
  });
});

// Delete a product API
server.delete('/api/products/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting product' });
    } else {
      res.status(200).json(product);
    }
  });
});


# eCommerce Backend

This is a Node.js-based backend application for an eCommerce platform. It provides APIs for managing products, orders, and user authentication.

## Features

- User authentication (register, login)
- Product management (CRUD operations)
- Order management (create and fetch orders)
- Role-based access control
- MongoDB integration for data storage

## Project Structure

```
eCommerce backend/
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
├── server.js                # Entry point of the application
├── config/
│   └── db.js                # MongoDB connection setup
├── controllers/
│   ├── authControllers.js   # User authentication logic
│   ├── orderControllers.js  # Order management logic
│   └── productController.js # Product management logic
├── middlewares/
│   └── authMiddlewares.js   # Authentication and role verification middleware
├── models/
│   ├── orderModel.js        # Order schema
│   ├── productModels.js     # Product schema
│   └── userModels.js        # User schema
└── routes/
    ├── authRoutes.js        # Routes for authentication
    ├── orderRoutes.js       # Routes for orders
    └── productRoutes.js     # Routes for products
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd eCommerce-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=4001
   270MONGO_URL=mongodb://localhost:17/eCommerceBackend
   jwt_secret=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run on `http://localhost:4001`.

## API Endpoints

### Authentication

- **POST** `/register` - Register a new user
- **POST** `/login` - Login a user

### Products

- **GET** `/products` - Fetch all products
- **POST** `/products` - Create a new product
- **PUT** `/products/:productId` - Update a product
- **DELETE** `/products/:productId` - Delete a product

### Orders

- **POST** `/orders` - Create a new order
- **GET** `/orders` - Fetch all orders

## Middleware

- `verifyToken` - Verifies the JWT token from cookies
- `verifyRole` - Checks if the user has the required role

## Database

The application uses MongoDB as the database. The schemas are defined in the `models` directory.

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `jsonwebtoken` - For generating and verifying JWT tokens
- `bcryptjs` - For hashing passwords
- `cookie-parser` - For parsing cookies
- `dotenv` - For managing environment variables

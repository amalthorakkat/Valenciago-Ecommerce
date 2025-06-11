# Valenciago | eCommerce Project

This is a full-stack eCommerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js). The project supports user authentication, product management, cart functionality, and order processing.

---

## Features

- User registration and authentication (with hashed passwords)
- User roles (User/Admin)
- Address management for users
- Product listing and details
- Add to cart and cart management
- Order placement and history
- Admin dashboard for managing products and orders
- Responsive UI with Tailwind CSS

---

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **State Management:** Redux Toolkit
- **Notifications:** Custom Toast (or react-hot-toast)
- **Other:** Axios, dotenv

---

## Folder Structure

```
eCommerce/
│
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the `Backend` folder:
    ```sh
    cd Backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file and add your MongoDB URI and JWT secret:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4. Start the backend server:
    ```sh
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `Frontend` folder:
    ```sh
    cd Frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the frontend development server:
    ```sh
    npm start
    ```

---

## Usage

- Register a new user or login with existing credentials.
- Browse products, add them to your cart, and place orders.
- Admin users can manage products and view all orders.

---

## License

This project is for educational purposes. Please check individual file headers for more information.

---

---

## Contact

For questions or support, please open an issue or contact [amalthorakkat@gmail.com].

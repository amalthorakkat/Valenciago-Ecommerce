// const express = require('express')
// const router = express.Router()
// const userController = require('../controllers/userController')
// const authMiddleware = require('../middlewares/authMiddlewares')

// router.put('/address',authMiddleware.verifyToken,userController.addAddress)
// router.get('/address/selected',authMiddleware.verifyToken,userController.getSelectedAddress)
// router.get("/address", authMiddleware.verifyToken, userController.getAddresses);
// router.put('/address/:addressId', authMiddleware.verifyToken, userController.updateAddress);
// router.delete('/address/:addressId', authMiddleware.verifyToken, userController.deleteAddress);



// module.exports = router;


const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.put("/address", authMiddleware.verifyToken, userController.addAddress);
router.get("/address/selected", authMiddleware.verifyToken, userController.getSelectedAddress);
router.get("/address", authMiddleware.verifyToken, userController.getAddresses);
router.put("/address/:addressId", authMiddleware.verifyToken, userController.updateAddress);
router.delete("/address/:addressId", authMiddleware.verifyToken, userController.deleteAddress);

module.exports = router;

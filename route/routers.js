const express = require("express");
const router = express.Router();
const { getUserById, createUser, getAllUsers,  updateUser, deleteUser } = require('../controllers/userControllers');
const accountControllers = require("../controllers/accountControllers");
const { createTransaction, getTransactionById, getTransactions } = require('../controllers/transactionControllers');
const { checkToken } = require('../middlewares/checkToken');

router.get("/", (req, res) => {
  return res.json({
    message: "Hello World",
  });
});

// user
router.post("/users", checkToken, createUser);
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:userId", checkToken, updateUser);
router.delete("/users/:userId", deleteUser);

// Account
router.post("/accounts", accountControllers.createAccount);
router.get("/accounts", accountControllers.getAllAccounts);
router.get("/accounts/:id", accountControllers.getAccountById);
router.put("/accounts/:id", accountControllers.updateAccount);
router.delete("/accounts/:id", accountControllers.deleteAccount);

// Transaction
router.post("/transactions", checkToken, createTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransactionById);
// router.put("/transactions/:id", transactionControllers.updateTransaction);
// router.delete("/transactions/:id", transactionControllers.deleteTransaction);

module.exports = router;

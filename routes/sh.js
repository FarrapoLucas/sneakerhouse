const express = require('express');
const router = express.Router();
const shControllers = require('../controllers/shControllers');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, transactionsController.getAllTransactions);

router.post('/', authMiddleware, transactionsController.addTransaction);

router.put('/:id', authMiddleware, transactionsController.updateTransactionPut);

router.patch('/:id', authMiddleware, transactionsController.updateTransactionPatch);

router.delete('/:id', authMiddleware, transactionsController.deleteTransaction);

module.exports = router;
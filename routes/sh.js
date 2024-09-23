const express = require('express');
const router = express.Router();
const shControllers = require('../controllers/shControllers');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, shControllers.getAllSneakers);

router.post('/', authMiddleware, shControllers.addSneakers);

router.put('/:id', authMiddleware, shControllers.updateSneakersPut);

router.patch('/:id', authMiddleware, shControllers.updateSneakersPatch);

router.delete('/:id', authMiddleware, shControllers.deleteSneakers);

module.exports = router;
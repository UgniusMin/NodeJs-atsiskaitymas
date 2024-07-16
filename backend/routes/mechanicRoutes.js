const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', mechanicController.createMechanic);
router.put('/:id', mechanicController.updateMechanic);
router.delete('/:id', mechanicController.deleteMechanic);
router.get('/', mechanicController.getAllMechanics);
router.get('/:id', mechanicController.getMechanicById);
router.post('/:id/rate', mechanicController.rateMechanic);

module.exports = router;
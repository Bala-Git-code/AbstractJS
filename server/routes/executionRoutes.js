const express = require('express');
const controller = require('../controllers/executionController');
const validate = require('../middleware/validate');
const { executionSchema } = require('../utils/schemas');

const router = express.Router();

router.post('/run', validate(executionSchema), controller.runWorkflow);
router.get('/:id', controller.getExecution);

module.exports = router;

const express = require('express');
const controller = require('../controllers/workflowController');
const validate = require('../middleware/validate');
const { workflowSchema } = require('../utils/schemas');

const router = express.Router();

router.post('/', validate(workflowSchema), controller.createWorkflow);
router.get('/', controller.listWorkflows);
router.get('/:id', controller.getWorkflow);
router.put('/:id', validate(workflowSchema), controller.updateWorkflow);
router.delete('/:id', controller.deleteWorkflow);

module.exports = router;

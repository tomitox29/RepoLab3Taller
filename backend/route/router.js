const express = require('express');

const router = express.Router();

const incidentController = require('../controllers/incidentController');

router.post('/addIncident', incidentController.addIncidentFn);
router.get('/getIncidents', incidentController.getIncidentsFn);






module.exports = router;
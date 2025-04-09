const incidentService = require('../services/incidentServices.js');


const addIncidentFn = async (req, res) => {
    try {
        console.log(req.body);
        await incidentService.addIncidentDBService(req.body);
        res.status(200).json({ message: "Incident added successfully" });
    }
    catch (error) {
        console.error("Error adding incident:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getIncidentsFn = async (req, res) => {
    try {
        console.log("Inside addIncidentFn")
        const result = await incidentService.getIncidentsDBService();
        res.status(200).json({ message: "Incidents returned successfully", incidents: result.incidents });
    }
    catch (error) {
        console.error("Error getting incident:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = { addIncidentFn, getIncidentsFn }



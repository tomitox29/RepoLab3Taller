var incidentModel = require('../mongodb/schemas/incidentSchema');


module.exports.addIncidentDBService = (incidentData) => {
    return new Promise(async function myFn(resolve, reject) {

        console.log(incidentData);

        var incidentModelData = new incidentModel();

        incidentModelData.titulo = incidentData.titulo;
        incidentModelData.descripcion = incidentData.descripcion;
        incidentModelData.urgencia = incidentData.urgencia;


        try {
            await incidentModelData.save();
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports.getIncidentsDBService = async () => {
    try {
        const result = await incidentModel.find();


        if (result.length > 0) {
            console.log("Incidentes encontrados");
            return { status: true, msg: "Incidentes encontrados", incidents: result };
        } else {
            console.log("No se encontraron Incidentes");
            return { status: false, msg: "No se encontraron Incidentes" };
        }

    } catch (error) {
        console.log("Error al obtener Incidentes:", error);
        return { status: false, msg: "Error al obtener Incidentes" };
    }
};
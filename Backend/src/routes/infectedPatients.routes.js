const {Router} = require ('express')
const 
{    
    getAllInfectedPatients,
    getInfectedPatient,
    getInfectedPatientMobile,
    createInfectedPatient,
    deleteInfectedPatient,
    updateInfectedPatient,
    updateInfectedPatientLocation
} = require('../controllers/infectedPatients.controller')


const router= Router();

router.get('/infectados', getAllInfectedPatients)

router.get('/infectados/:id',getInfectedPatient)

router.get('/infectados/:id/p',getInfectedPatientMobile)

router.post('/infectados',createInfectedPatient)

router.delete('/infectados/:id',deleteInfectedPatient)

router.put('/infectados/:id',updateInfectedPatient)

router.put('/infectados/send/location',updateInfectedPatientLocation)

module.exports = router;
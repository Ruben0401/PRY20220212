const {Router} = require ('express')
const 
{    
    getAllAlerts,
    getAllAlertsPatient,
    getAlert,
    createAlert,
    deleteAlert,
    updateAlert
} = require('../controllers/alerts.controller')


const router= Router();

router.get('/alertas', getAllAlerts)

router.get('/alertas/:dni/patient', getAllAlertsPatient)

router.get('/alertas/:id',getAlert)

router.post('/alertas',createAlert)

router.delete('/alertas/:id',deleteAlert)

router.put('/alertas/:id',updateAlert)

module.exports = router;
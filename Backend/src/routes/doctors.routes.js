const {Router} = require ('express')
const 
{    
    getAllDoctors,
    getDoctor,
    getDoctorlog,
    checkEmailDoctor,
    registerDoctor,
    deleteDoctor,
    updateDoctor
} = require('../controllers/doctors.controller')


const router= Router();

router.get('/doctores', getAllDoctors)

router.post('/doctores/log', getDoctorlog)

router.get('/doctores/:dni',getDoctor)
router.post('/doctores/email',checkEmailDoctor)

router.post('/doctores',registerDoctor)

router.delete('/doctores/:dni',deleteDoctor)

router.put('/doctores/:dni',updateDoctor)

module.exports = router;
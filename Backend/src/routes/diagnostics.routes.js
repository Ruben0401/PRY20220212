const {Router} = require ('express')
const 
{    
    getAllDiagnostics,
    getDiagnostic,
    createDiagnostic,
    deleteDiagnostic,
    updateDiagnostic
} = require('../controllers/diagnostics.controller')


const router= Router();

router.get('/diagnosticos/:dni', getAllDiagnostics)

router.get('/diagnosticos/:id/info',getDiagnostic)

router.post('/diagnosticos',createDiagnostic)

router.delete('/diagnosticos/:id',deleteDiagnostic)

router.put('/diagnosticos/:id',updateDiagnostic)

module.exports = router;
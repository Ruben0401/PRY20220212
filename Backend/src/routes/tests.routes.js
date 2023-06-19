const {Router} = require ('express')
const 
{    
    getAllTests,
    getTest,
    createTest,
    deleteTest,
    updateTest
} = require('../controllers/tests.controller')


const router= Router();

router.get('/pruebas/:dni', getAllTests)

router.get('/pruebas/:id/info',getTest)

router.post('/pruebas',createTest)

router.delete('/pruebas/:id',deleteTest)

router.put('/pruebas/:id',updateTest)

module.exports = router;
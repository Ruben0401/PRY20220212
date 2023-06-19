const {Router} = require ('express')
const 
{    
    getAllCites,
    getCite,
    createCite,
    deleteCite,
    updateCite
} = require('../controllers/cites.controller')


const router= Router();

router.get('/citas/:dni', getAllCites)

router.get('/citas/:id/info',getCite)

router.post('/citas',createCite)

router.delete('/citas/:id',deleteCite)

router.put('/citas/:id',updateCite)

module.exports = router;
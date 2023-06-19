const {Router} = require ('express')
const 
{    
    getAllAlertXUsers,
    getAlertXUser,
    getAlertXUsers,
    createAlertXUser,
    createAlertXUserAll,
    deleteAlertXUser,
    updateAlertXUser
} = require('../controllers/alertsXusers.controller')


const router= Router();

router.get('/alertaxusuarios', getAllAlertXUsers)

router.get('/alertaxusuarios/:id/detail',getAlertXUser)

router.get('/alertaxusuarios/:id',getAlertXUsers)

router.post('/alertaxusuarios',createAlertXUser)

router.post('/alertaxusuariosall',createAlertXUserAll)

router.delete('/alertaxusuarios/:id',deleteAlertXUser)

router.put('/alertaxusuarios/:id',updateAlertXUser)

module.exports = router;
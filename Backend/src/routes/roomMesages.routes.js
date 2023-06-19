const {Router} = require ('express')
const 
{    
    getAllRoomMessages,
    getAllRoomMessagesPatients,
    getAllRoomMessagesDoctors,
    getRoomMessage,
    createRoomMessage,
    deleteRoomMessage,
    updateRoomMessage
} = require('../controllers/roomMessages.controller')


const router= Router();

router.get('/salamensajes', getAllRoomMessages)

router.get('/salamensajes/:dni/pacientes', getAllRoomMessagesPatients)

router.get('/salamensajes/:dni/doctores', getAllRoomMessagesDoctors)

router.get('/salamensajes/:id',getRoomMessage)

router.post('/salamensajes',createRoomMessage)

router.delete('/salamensajes/:id',deleteRoomMessage)

router.put('/salamensajes/:id',updateRoomMessage)

module.exports = router;
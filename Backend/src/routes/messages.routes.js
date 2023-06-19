const {Router} = require ('express')
const 
{    
    getAllMessages,
    getMessage,
    createMessageP,
    createMessageD,
    deleteMessage,
    updateMessage
} = require('../controllers/messages.controller')


const router= Router();

router.get('/mensajes/:idsala', getAllMessages)

router.get('/mensajes/:id/info',getMessage)

router.post('/mensajes/p',createMessageP)
router.post('/mensajes/d',createMessageD)

router.delete('/mensajes/:id',deleteMessage)

router.put('/mensajes/:id',updateMessage)

module.exports = router;
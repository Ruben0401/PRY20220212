const pool = require('../db')

const getAllRoomMessages = async (req,res,next)=>{

    try {
       const result = await pool.query("Select * From salamensaje")
       res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const getAllRoomMessagesPatients = async (req,res,next)=>{
    const {dni} =  req.params
    try {
        const result = await pool.query("Select * From salamensaje where dni_p = $1" , [dni])
        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

const getAllRoomMessagesDoctors = async (req,res,next)=>{
    const {dni} =  req.params
    try {
        const result = await pool.query("Select * From salamensaje where dni_d = $1" , [dni])
        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}


const getRoomMessage = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From salamensaje where id_sala = $1" , [id])

        if (result.rows.length === 0) {
            return res.status(404).json({
                message:'no encontrado'
            })
        }
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const createRoomMessage = async (req,res,next)=>{
    const { fecha_sala,dni_d, dni_p} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO salamensaje (fecha_sala,dni_d, dni_p) VALUES ($1,$2,$3) RETURNING *",
        [
            fecha_sala,dni_d, dni_p
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const deleteRoomMessage= async (req,res,next)=>{
    const {id} =  req.params

    try {

        const result = await pool.query("DELETE FROM salamensaje where id_sala =$1 RETURNING *",[id])
        if (result.rows.length === 0) {
            return res.status(404).json({
                message:'no funciona'
            })
        }
        return res.sendStatus(204);  
        } catch (error) {
            next(error)   
        }
}

const updateRoomMessage = async (req,res,next)=>{

    try {
        const {id}= req.params
        const { fecha_sala,dni_d, dni_p}=req.body
        const result = await pool.query(
        "UPDATE salamensaje SET fecha_sala =$1,dni_d =$2,dni_p=$3 WHERE id_sala =$4 RETURNING *",
        [ fecha_sala,dni_d, dni_p,id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message:'no encontrado'
            })
        }
        return res.json(result.rows[0])     

        } catch (error) {
            next(error)  
        }
}


module.exports = {
    getAllRoomMessages,
    getAllRoomMessagesPatients,
    getAllRoomMessagesDoctors,
    getRoomMessage,
    createRoomMessage,
    deleteRoomMessage,
    updateRoomMessage

}
const pool = require('../db')

const getAllMessages = async (req,res,next)=>{
    const {idsala} =  req.params
    try {
       const allDiagnostics = await pool.query("Select * From mensaje where id_sala = $1",[idsala])
       res.json(allDiagnostics.rows);
    } catch (error) {
        next(error)
    }
}

const getMessage = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From mensaje where id_mensaje = $1" , [id])

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

const createMessageP = async (req,res,next)=>{
    const {  dni_p, id_sala, texto, fecha_mensaje} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO mensaje (  dni_p, id_sala, texto, fecha_mensaje) VALUES ($1, $2, $3, current_timestamp) RETURNING *",
        [
             dni_p, id_sala, texto
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const createMessageD = async (req,res,next)=>{
    const {  dni_d, id_sala, texto} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO mensaje (  dni_d, id_sala, texto, fecha_mensaje) VALUES ($1, $2, $3, current_timestamp) RETURNING *",
        [
            dni_d, id_sala, texto
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const deleteMessage= async (req,res,next)=>{
    const {id} =  req.params

    try {

        const result = await pool.query("DELETE FROM mensaje where id_mensaje =$1 RETURNING *",[id])
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

const updateMessage = async (req,res,next)=>{

    try {
        const {id}= req.params
        const { dni_d, dni_p, id_sala, texto, fecha_mensaje}=req.body
        console.log(req.body,req.params)
        const result = await pool.query(
        "UPDATE mensaje SET  dni_d=$1, dni_p=$2, id_sala=$3, texto=$4, fecha_mensaje=$5 WHERE id_mensaje =$6 RETURNING *",
        [dni_d, dni_p, id_sala, texto, fecha_mensaje,id]);
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
    getAllMessages,
    getMessage,
    createMessageP,
    createMessageD,
    deleteMessage,
    updateMessage

}
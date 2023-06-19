const pool = require('../db')

const getAllAlerts = async (req,res,next)=>{

    try {
       const allAlerts = await pool.query("Select * From alerta")
       res.json(allAlerts.rows);
    } catch (error) {
        next(error)
    }
}

const getAllAlertsPatient = async (req,res,next)=>{
    const {dni} =  req.params
    try {
       const result = 
       await pool.query(
        "SELECT * FROM alertaxusuario left join alerta on alerta.id_alerta = alertaxusuario.id_alerta" 
       +  " left join infectadopaciente on infectadopaciente.dni_p = alertaxusuario.dni_p" 
       +  " where infectadopaciente.estado is null and alertaxusuario.dni_p = $1"
       +  " order by alertaxusuario.id_detallealerta asc", [dni])
       res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const getAlert = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From alerta where id_alerta = $1" , [id])

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



const createAlert = async (req,res,next)=>{
    const { descripcion} = req.body
    
    var fechaFormat = new Date().getTime()
    console.log(fechaFormat)
    try {
        const  result = await pool.query
        (`INSERT INTO alerta (descripcion, fecha) VALUES ($1,to_timestamp(${fechaFormat}/1000.0)) RETURNING *`,
        [
            descripcion
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const deleteAlert= async (req,res,next)=>{
    const {id} =  req.params

    try {

        const result = await pool.query("DELETE FROM alerta where id_alerta =$1 RETURNING *",[id])
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

const updateAlert = async (req,res,next)=>{

    try {
        const {id}= req.params
        const { descripcion, fecha}=req.body
        const result = await pool.query(
        "UPDATE alerta SET descripcion =$1, fecha=$2 WHERE id_alerta =$3 RETURNING *",
        [ descripcion, fecha,id]);
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
    getAllAlerts,
    getAllAlertsPatient,
    getAlert,
    createAlert,
    deleteAlert,
    updateAlert

}
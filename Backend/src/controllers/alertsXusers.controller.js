const pool = require('../db')

const getAllAlertXUsers = async (req,res,next)=>{

    try {
       const result = await pool.query("Select * From alertaxusuario")
       res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const getAlertXUser = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From alertaxusuario where id_detallealerta = $1" , [id])

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

const getAlertXUsers = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From alertaxusuario where id_alerta = $1" , [id])

        if (result.rows.length === 0) {
            return res.status(404).json({
                message:'no encontrado'
            })
        }
        res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const createAlertXUser = async (req,res,next)=>{
    const { id_alerta, dni_p, latitud, longitud} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO alertaxusuario (id_alerta, dni_p, latitud, longitud) VALUES ($1, $2,$3, $4) RETURNING *",
        [
            id_alerta, dni_p, latitud, longitud
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const createAlertXUserAll = async (req,res,next)=>{
    const { descripcion,dni_pI,latitudI,longitudI,dni_pS, latitudS, longitudS} = req.body
    var fechaFormat = new Date().getTime()
    try {
        const  resultAlert = await pool.query
        (`INSERT INTO alerta (descripcion, fecha) VALUES ($1,to_timestamp(${fechaFormat}/1000.0)) RETURNING *`,
        [
            descripcion
        ]
        );
        await pool.query
        ("INSERT INTO alertaxusuario (id_alerta, dni_p, latitud, longitud) VALUES ($1, $2,$3, $4), ($5, $6,$7, $8) RETURNING *;",
        [
            resultAlert.rows[0]["id_alerta"], dni_pS, latitudS, longitudS,resultAlert.rows[0].id_alerta, dni_pI, latitudI, longitudI
        ]
        );
        res.json("bien hecho")
    } catch (error) {
        next(error)
        
    }
}

const deleteAlertXUser = async (req,res,next)=>{
    const {id} =  req.params

    try {

        const result = await pool.query("DELETE FROM alertaxusuario where id_detallealerta =$1 RETURNING *",[id])
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

const updateAlertXUser = async (req,res,next)=>{

    try {
        const {id}= req.params
        const { id_alerta, dni_p, latitud, longitud}=req.body
        const result = await pool.query(
        "UPDATE alertaxusuario SET id_alerta =$1, dni_p=$2, latitud=$3, longitud=$4 WHERE id_detallealerta =$5 RETURNING *",
        [ id_alerta, dni_p, latitud, longitud,id]);
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
    getAllAlertXUsers,
    getAlertXUser,
    getAlertXUsers,
    createAlertXUser,
    createAlertXUserAll,
    deleteAlertXUser,
    updateAlertXUser

}
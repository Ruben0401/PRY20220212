const pool = require('../db')

const getAllCites = async (req,res,next)=>{
    const {dni} =  req.params
    try {
       const result = await pool.query("Select * From cita where dni_p = $1",[dni])
       res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const getCite = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From cita where id_cita = $1" , [id])

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

const createCite = async (req,res,next)=>{
    const { fecha, hora_inicio, hora_fin, dni_p, dni_d} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO cita ( fecha, hora_inicio, hora_fin, dni_p, dni_d) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
            fecha, hora_inicio, hora_fin, dni_p, dni_d
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const deleteCite= async (req,res,next)=>{
    const {id} =  req.params

    try {

        const result = await pool.query("DELETE FROM cita where id_cita =$1 RETURNING *",[id])
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

const updateCite = async (req,res,next)=>{

    try {
        const {id}= req.params
        const { fecha, hora_inicio, hora_fin, dni_p, dni_d}=req.body
        console.log(req.body,req.params)
        const result = await pool.query(
        "UPDATE cita SET  fecha=$1, hora_inicio=$2, hora_fin=$3, dni_p=$4, dni_d=$5 WHERE id_cita =$6 RETURNING *",
        [fecha, hora_inicio, hora_fin, dni_p, dni_d,id]);
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
    getAllCites,
    getCite,
    createCite,
    deleteCite,
    updateCite
}
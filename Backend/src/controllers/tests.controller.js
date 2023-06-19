const pool = require('../db')

const getAllTests = async (req,res,next)=>{
    const {dni} =  req.params
    try {
       const result = await pool.query("Select * From prueba where dni_p = $1",[dni])
       res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const getTest = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From prueba where id_prueba = $1" , [id])

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

const createTest = async (req,res,next)=>{
    const { fecha_prueba, dni_p, tipo_prueba, laboratorio, resultado} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO prueba ( fecha_prueba, dni_p, tipo_prueba, laboratorio, resultado) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
            fecha_prueba, dni_p, tipo_prueba, laboratorio, resultado
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const deleteTest= async (req,res,next)=>{
    const {id} =  req.params

    try {

        const result = await pool.query("DELETE FROM prueba where id_prueba =$1 RETURNING *",[id])
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

const updateTest = async (req,res,next)=>{

    try {
        const {id}= req.params
        const { fecha_prueba, dni_p, tipo_prueba, laboratorio, resultado}=req.body
        console.log(req.body,req.params)
        const result = await pool.query(
        "UPDATE prueba SET  fecha_prueba=$1, dni_p=$2, tipo_prueba=$3, laboratorio=$4, resultado=$5 WHERE id_prueba =$6 RETURNING *",
        [fecha_prueba, dni_p, tipo_prueba, laboratorio, resultado,id]);
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
    getAllTests,
    getTest,
    createTest,
    deleteTest,
    updateTest

}
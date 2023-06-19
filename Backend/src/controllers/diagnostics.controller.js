const pool = require('../db')

const getAllDiagnostics = async (req,res,next)=>{
    const {dni} =  req.params
    try {
       const allDiagnostics = await pool.query("Select * From diagnostico where dni_p = $1",[dni])
       res.json(allDiagnostics.rows);
    } catch (error) {
        next(error)
    }
}

const getDiagnostic = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From diagnostico where id_diagnostico = $1" , [id])

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

const createDiagnostic = async (req,res,next)=>{
    const { dni_p, enfermedad, fecha, estado, descripcion} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO diagnostico ( dni_p, enfermedad, fecha, estado, descripcion) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
             dni_p, enfermedad, fecha, estado, descripcion
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const deleteDiagnostic= async (req,res,next)=>{
    const {id} =  req.params

    try {

        const result = await pool.query("DELETE FROM diagnostico where id_diagnostico =$1 RETURNING *",[id])
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

const updateDiagnostic = async (req,res,next)=>{

    try {
        const {id}= req.params
        const { dni_p, enfermedad, fecha, estado, descripcion}=req.body
        console.log(req.body,req.params)
        const result = await pool.query(
        "UPDATE diagnostico SET  dni_p=$1, enfermedad=$2, fecha=$3, estado=$4, descripcion=$5 WHERE id_diagnostico =$6 RETURNING *",
        [dni_p, enfermedad, fecha, estado, descripcion,id]);
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
    getAllDiagnostics,
    getDiagnostic,
    createDiagnostic,
    deleteDiagnostic,
    updateDiagnostic

}
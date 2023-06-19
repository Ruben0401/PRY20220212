const pool = require('../db')

const getAllInfectedPatients = async (req,res,next)=>{

    const estado="infectado"
    try {
       const result = await pool.query("Select * From infectadopaciente where estado = $1 ",[estado])
       console.log(estado);
       res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const getInfectedPatient = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From infectadopaciente where id_infectado = $1" , [id])

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

const getInfectedPatientMobile = async (req,res,next)=>{
    const {id} =  req.params
    try {
        const result = await pool.query("Select * From infectadopaciente where dni_p = $1" , [id])

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

const createInfectedPatient = async (req,res,next)=>{
    const {  dni_p, latitud, longitud, estado} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO infectadopaciente (dni_p, latitud, longitud, estado) VALUES ($1, $2,$3, $4) RETURNING *",
        [
            dni_p, latitud, longitud, estado
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const deleteInfectedPatient = async (req,res,next)=>{
    const {id} =  req.params

    try {

        const result = await pool.query("DELETE FROM infectadopaciente where id_infectado =$1 RETURNING *",[id])
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

const updateInfectedPatient = async (req,res,next)=>{

    try {
        const {id}= req.params
        const { dni_p, latitud, longitud, estado}=req.body
        const result = await pool.query(
        "UPDATE infectadopaciente SET dni_p =$1, latitud=$2, longitud=$3, estado=$4 WHERE id_infectado =$5 RETURNING *",
        [ dni_p, latitud, longitud, estado,id]);
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

const updateInfectedPatientLocation = async (req,res,next)=>{

    try {
        const {  latitud, longitud,dni_p}=req.body
        const result = await pool.query(
        "UPDATE infectadopaciente SET latitud=$1, longitud=$2 WHERE dni_p =$3 RETURNING *",
        [  latitud, longitud,dni_p]);
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
    getAllInfectedPatients,
    getInfectedPatient,
    getInfectedPatientMobile,
    createInfectedPatient,
    deleteInfectedPatient,
    updateInfectedPatient,
    updateInfectedPatientLocation

}
const pool = require('../db')

const getAllPatients = async (req,res,next)=>{

    try {
       const result = await pool.query("Select * From paciente")
       res.json(result.rows);
    } catch (error) {
        next(error)
    }
}

const getAllPatientsD = async (req,res,next)=>{
    const {dni} =  req.params
    try {
       const result = await pool.query("Select * From paciente where dni_d = $1 ",[dni])
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

const getPatient = async (req,res,next)=>{
    const {dni} =  req.params
    try {
        const result = await pool.query("Select * From paciente where dni_p = $1" , [dni])

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

const checkEmailPatient = async (req,res,next)=>{
    const {correo} = req.body
    try {
        const result = await pool.query("Select * From paciente where correo = $1" , [correo])
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

const getPatientlog = async (req,res,next)=>{
    const {correo, password_p} = req.body
    try {
        const result = await pool.query("Select * From paciente where correo = $1 and password_p =$2 " , [correo,password_p])
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

const registerPatient = async (req,res,next)=>{
    const {dni_p, nombres, apellidos, fecha_nacimiento, sexo, edad, telefono, correo, direccion, password_p,dni_d} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO paciente (dni_p, nombres, apellidos, fecha_nacimiento, sexo, edad, telefono, correo, direccion, password_p,dni_d) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING *",
        [
            dni_p,
            nombres, 
            apellidos, 
            fecha_nacimiento, 
            sexo, 
            edad, 
            telefono, 
            correo, 
            direccion, 
            password_p,
            dni_d
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const deletePatient= async (req,res,next)=>{
    const {dni} =  req.params

    try {

        const result = await pool.query("DELETE FROM paciente where dni_p =$1 RETURNING *",[dni])
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

const updatePatient = async (req,res,next)=>{

    try {
        const {dni}= req.params
        const { nombres, apellidos, fecha_nacimiento, sexo, edad, telefono, correo, direccion, password_p,dni_d}=req.body
        const result = await pool.query(
        "UPDATE paciente SET nombres =$1, apellidos=$2, fecha_nacimiento=$3, sexo=$4, edad=$5, telefono=$6, correo=$7, direccion=$8, password_p=$9,dni_d=$10  WHERE dni_p =$11 RETURNING *",
        [nombres, apellidos, fecha_nacimiento, sexo, edad, telefono, correo, direccion, password_p,dni_d,dni]);
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

const updateDoctorXPatient = async (req,res,next)=>{

    try {
        const {dni}= req.params
        const {dni_d}=req.body
        const result = await pool.query(
        "UPDATE paciente SET dni_d=$1  WHERE dni_p =$2 RETURNING *",
        [dni_d,dni]);
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
    getAllPatients,
    getAllPatientsD,
    getPatient,
    checkEmailPatient,
    getPatientlog,
    registerPatient,
    deletePatient,
    updatePatient,
    updateDoctorXPatient

}
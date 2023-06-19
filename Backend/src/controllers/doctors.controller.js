const pool = require('../db')

const getAllDoctors = async (req,res,next)=>{

    try {
       const result = await pool.query("Select * From doctor")
       res.json(result.rows);
    } catch (error) {
        next(error)
    }
}



const getDoctor = async (req,res,next)=>{
    const {dni} =  req.params
    try {
        const result = await pool.query("Select * From doctor where dni_d = $1" , [dni])

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

const getDoctorlog = async (req,res,next)=>{
    const {correo, password_d} = req.body
    try {
        const result = await pool.query("Select * From doctor where correo = $1 and password_d =$2 " , [correo,password_d])
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

const checkEmailDoctor = async (req,res,next)=>{
    const {correo} = req.body
    try {
        const result = await pool.query("Select * From doctor where correo = $1" , [correo])
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

const registerDoctor = async (req,res,next)=>{
    const {dni_d, nombres, apellidos, fecha_nacimiento, sexo, edad, telefono, correo, especialidad, password_d} = req.body

    try {
        const  result = await pool.query
        ("INSERT INTO doctor (dni_d, nombres, apellidos, fecha_nacimiento, sexo, edad, telefono, correo, especialidad, password_d) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [
            dni_d, nombres, apellidos, fecha_nacimiento, sexo, edad, telefono, correo, especialidad, password_d
        ]
        );
        res.json(result.rows[0])
        
    } catch (error) {
        next(error)
        
    }
}

const deleteDoctor= async (req,res,next)=>{
    const {dni} =  req.params

    try {

        const result = await pool.query("DELETE FROM doctor where dni_d =$1 RETURNING *",[dni])
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

const updateDoctor = async (req,res,next)=>{

    try {
        const {dni}= req.params
        const { nombres, apellidos, fecha_nacimiento, sexo, edad, telefono, correo, especialidad, password_d}=req.body
        const result = await pool.query(
        "UPDATE paciente SET nombres =$1, apellidos=$2, fecha_nacimiento=$3, sexo=$4, edad=$5, telefono=$6, correo=$7, especialidad=$8, password_d=$9 WHERE dni_d =$10 RETURNING *",
        [nombres, apellidos, fecha_nacimiento, sexo, edad, telefono, correo, especialidad, password_d,dni]);
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
    getAllDoctors,
    getDoctor,
    getDoctorlog,
    checkEmailDoctor,
    registerDoctor,
    deleteDoctor,
    updateDoctor

}
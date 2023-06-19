const express=require('express');
const cors = require('cors');
const morgan=require('morgan')
const {port} = require('./config')

const alertsroutes = require('./routes/alerts.routes')
const alertsXusersroutes = require('./routes/alertsXusers.routes')
const citesroutes = require('./routes/cites.routes')
const diagnosticsroutes = require('./routes/diagnostics.routes')
const doctorsroutes = require('./routes/doctors.routes')
const infectedPatientsroutes = require('./routes/infectedPatients.routes')
const messagesroutes = require('./routes/messages.routes')
const patientsroutes = require('./routes/patients.routes')
const roomMessagesroutes = require('./routes/roomMesages.routes')
const testsroutes = require('./routes/tests.routes')




const app=express();

app.use(cors())

app.use(morgan('dev'))
app.use(express.json())

app.use(alertsroutes)
app.use(alertsXusersroutes)
app.use(citesroutes)
app.use(diagnosticsroutes)
app.use(doctorsroutes)
app.use(infectedPatientsroutes)
app.use(messagesroutes)
app.use(patientsroutes)
app.use(roomMessagesroutes)
app.use(testsroutes)





app.use((err,req,res,next) =>{
    
    return res.json({
        
        message: err.message,
        
    })

})

app.listen(port, ()=>{
    console.log(`Running nodejs app on port: ${port}`)
})

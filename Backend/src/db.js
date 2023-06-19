const { Pool }=require('pg')
const{db}=require('./config')

const pool=new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database,
    ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
      
})

module.exports = pool;
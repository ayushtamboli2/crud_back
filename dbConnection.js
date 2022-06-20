const mysql = require('mysql2')

//Connestion with Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nic@1234',
    database: 'crud',
    port: '3306'
})

//for connection check 
connection.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Mysql database connected successfuly")
    }
})

module.exports = connection;
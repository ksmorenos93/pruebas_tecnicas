import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const salt=10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db= mysql.createConnection({
    host:"localhost",
    port:3306, // este es el puerto donde se encuentra la base de datos.
    database:'signup',
    user:"root",
    password:"Mzsqlpassword.",
    
    
});

db.connect(function (err) {
    if(err){
        console.log("error occurred while connecting");
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });
 

console.log(db)
app.post('/register', (req,res) => {
    const sql = "INSERT INTO login (name,email,password) VALUES (?)";// aqui el nombre de las columnas en la base de datos va sin comillas. "values" son los valores que 
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => { // se envian desde el formulario del lado del cliente.
        if(err) return res.json({Error: "Error for hassing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
       db.query(sql,[values],(err, result) =>{
        if(err) return res.json({Error: "Inserting data Error in server"});
        return res.json({Status:"Success"});
       } )    
    })
              
})


app.post('/login', (req,res) => {
    const sql = 'SELECT * from login WHERE email = ? '; //here we just select the email, not the password, because the password is hash or protected
    db.query(sql,[req.body.email], (err,data) => {
        if(err) return res.json({Error: "login error in server"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err,response)=>{ // this is the password that we obtain from the frontend converted to string.
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    return res.json({Status:"Success"});
                } else {
                    return res.json({Error:"Password not matched"});
                }
            })
        }else {
            return res.json ({Error:"No email existed"})
        }
    })
})



app.listen(3000, () => {
    console.log("Running in port 3000. ..");
})
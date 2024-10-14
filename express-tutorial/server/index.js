const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
app.use(cors());
const jsonParser = bodyParser.json();
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "simulasi",
});

app.get('/buku',(req,res)=> {
    pool.getConnection((err, connection)=>{
        if (err) throw err;

        connection.query("SELECT * from buku", (err,rows)=>{
            connection.release();

            if (!err){
                res.status(200).json({data: rows});
            }else{
                res.status(500).json({data: err});
            }
        })
    })
});

app.post('/buku',jsonParser,(req,res)=> {
    pool.getConnection((err, connection)=>{
        if (err) throw err;
        const params = req.body;
        connection.query("INSERT INTO buku SET ?", params, (err,rows)=>{
            connection.release();
            if (!err){
                res.status(200).json({data: rows});
            }else{
                res.status(500).json({data: err});
            }
        })
    })
});

app.get('/buku/:id',(req,res)=> {
    pool.getConnection((err, connection)=>{
        if (err) throw err;

        connection.query("SELECT * from buku where id = ?", [req.params.id],(err,rows)=>{
            connection.release();

            if (!err){
                res.status(200).json({data: rows});
            }else{
                res.status(500).json({data: err});
            }
        })
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
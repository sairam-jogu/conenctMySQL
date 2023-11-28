const mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'student'
})

app.use(bodyParser.json());

// Inserting details of All the Students

app.post('/addStudent',(req,res)=>{
    const {roll ,name ,branch ,age} = req.body;
    connection.query('INSERT INTO student_info (id,name,branch,age) VALUES (?,?,?,?)',[roll,name,branch,age],(err,results)=>{
        if(err) throw err;
        res.json({id: results.insertId,roll,name,branch,age});
    })
})

//// Fetching Details of All the Students

app.get('/getStudents',(req,res)=>{
    connection.query('SELECT * FROM student_info',(err,results)=>{
        if(err){
            console.log("Error in fetching details");
            return;
        }
        res.json(results);
    })
})

///Fetching Details of Single Student

app.get('/getStudent/:id',(req,res)=>{
    const studentId = req.params.id;
    connection.query('SELECT * FROM student_info WHERE id = ?',[studentId],(err,results)=>{
        if(err){
            console.log('Error fetching student: '+err.message);
            return;
        }
        res.json(results);
    })
})


// Deleting a Record from the table;

app.delete('/deleteStudent/:id',(req,res)=>{
    const studentId = req.params.id;
    connection.query('Delete FROM student_info Where id = ?',[studentId],(err,results)=>{
        if(err){
            console.log('Error in deleteing the Record',err.message);
            return;
        }
        res.json({'message':'Record Deleted Succesfully'});
    })
})


// Updating the Record from the table;

app.put('/updateStudent/:id',(req,res)=>{
    const {name,branch,age} = req.body;
    const studentId = req.params.id;
    connection.query('Update student_info SET name = ?,branch= ?,age= ? WHERE id= ?',[name,branch,age,studentId],(err,results)=>{
        if(err){
            console.log('Error in Updating Student',err.message);
            return;
        }
        res.json({id:studentId,name,branch,age,"message":'Updated Succesfully'});
    })
})



app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})
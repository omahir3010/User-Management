const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'*',
    database:'learn',
    port:3306
});
//READ COMPLETE DATA!
app.get('/user',(req,res)=>{
    let qr = `select * from user`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'ERROR OCCURED!')
        }
        if(result.length>0){
            res.send({
                message: 'ALL USER DATA!',
                data:result
            });
        }
    })
});

//READ SINGLE DATA!

app.get('/user/:id',(req,res)=>{

    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log('ERROR OCCURED! ' ,err);
        }
        if(result.length>0){
            res.send({
                message: `USER DATA WITH ID ${gID}✅`,
                data:result
            });
        }
        else{
            res.send({
                message:'data not found!'
            })
        }
    })

})

//CREATE C=>CRUD

app.post('/user',(req,res)=>{
   let id = req.body.id;
   let fullName = req.body.fullname;
   let eMail = req.body.email;
   let mobile = req.body.mobile;
   
   let qr = `insert into user(id,fullname,email,mobile)
    values(${id},'${fullName}', '${eMail}', '${mobile}')`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
            res.send({
                message: 'data inserted'
            });


    })
})



//UPDATE DATA!
app.put('/user/:id',(req,res)=>{
    let id = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mobile = req.body.mobile;


   let qr = `update user set fullname = '${fullName}' , email = '${eMail}' , mobile= '${mobile}'  where id = ${id} `;

   db.query(qr,(err,result)=>{
    if(err){
        console.log(err);
    }
        res.send({
            message: 'data updated'
        });


});
})

//DELETE

app.delete('/user/:id',(req,res)=>{
    let qId = req.params.id;

    let qr = ` delete from user where id = ${qId}`

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({
                message:'data deleted!'
            })
        }


    })
})

db.connect(err=>{
    if(err){
        console.log('ERROR OCCURED! ',err);
    }
    else{
        console.log('Database Connected!');
    }
})



app.listen(3000,()=>{
    console.log('Listening to PORT 3000');
})

//will contain all of user related routes
const express = require('express');
const mysql = require('mysql');
const router = express.Router(); //use a router to map to endpoint
router.get('/messages', (req, res)=>{
    console.log("Show some messages");
    res.end();
});

router.get("/users", (request, res)=>{ 
    const connection = getConnection();
    connection.query('SELECT * FROM users', (err, rows, fields)=>{ //query, 2nd argument is value for ?
        if(err){
            console.log("Query failed: "+ err); //if query error
            res.sendStatus(500);
            res.end();
            return;
        }
        console.log("Maybe fetched successfully");
        //res.send(err);
        const users = rows.map((row)=>{ //format response how you want to
            return {id: row.id, first: row.firstName, last: row.lastName};
        })
        res.json(users);//send response if worked
    });
    //res.send("Nodemon auto updates when source changes");
});

router.get("/users/:id", (req,res)=>{ //connect to server with value for id
    console.log("Fetching user with id: " + req.params.id); 
    const connection = getConnection(); //connect to mysql server db
    const userId = req.params.id; //get input id from req.params
    const queryString = "SELECT * FROM users WHERE id = ?";
    connection.query(queryString, [userId], (err, rows, fields)=>{ //query, 2nd argument is value for ?
        if(err){
            console.log("Query failed: "+ err); //if query error
            res.sendStatus(500);
            res.end();
            return;
        }
        console.log("Maybe fetched successfully");
        //res.send(err);
        const users = rows.map((row)=>{ //format response how you want to
            return {id: row.id, first: row.firstName, last: row.lastName};
        })
        res.json(users);//send response if worked
    });
    //res.end();
});

router.post('/users_create', (req,res)=>{
    console.log("New user");
    const firstName = req.body.create_first;
    const lastName = req.body.create_last;
    
    const connection = getConnection();
    const queryString = "INSERT INTO users (firstName, lastName) VALUES(?,?)";
    connection.query(queryString, [firstName, lastName], (err, rows, fields)=>{
        if(err){
            console.log("Failed to insert: "+ err); //if query error
            res.sendStatus(500);
            return;
        }
        console.log("Inserted new user with ID ", rows.insertId);
        res.end();
    });
    
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'landoftheHigh77',
    database: 'db1'
});

function getConnection(){
    return pool;
    /*mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'landoftheHigh77',
        database: 'db1'
    });*/
}

module.exports = router; //export the router with the endpoints it handles
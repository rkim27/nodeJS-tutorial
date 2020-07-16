//load app server using express
const express = require('express'); //load up express
const app = express(); //create new instance of express
const morgan = require('morgan');
const mysql = require('mysql');

app.use(morgan('short'));

//have to tell server how to handle get requests with .get() to a specific endpoint, this endpoint here is "/"
app.get("/", (request, res)=>{ 
    console.log("Responding to root route");
    res.send("Hello from root");
});

app.get("/users", (request, res)=>{ 
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'landoftheHigh77',
        database: 'db1'
    });
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

app.get("/users/:id", (req,res)=>{ //connect to server with value for id
    console.log("Fetching user with id: " + req.params.id); 
    const connection = mysql.createConnection({ //connect to mysql server
        host: 'localhost',
        user: 'root',
        password: 'landoftheHigh77',
        database: 'db1'
    });
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

//server can be pinged at localhost:3001
app.listen(3001, ()=>{ //set up server to listen to port 3001
    console.log('Server is up and listening on port 3001');
});
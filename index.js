
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

//Connect to a mysql database
var connection = mysql.createConnection({
        host:'localhost',
        user: 'master',
        password:'masterpassword',
        database: 'mydb'
});
connection.connect();
const app = express();
app.use(bodyParser.json());
app.get('/greeting',(req,res) => {
        res.json('Hello world');
});
//get list of names
app.get('/list',(req,res) => {
        query = 'SELECT username FROM USERS;';
        connection.query(query,(e,r,f) => {
        if(e) {
        console.log(e);
        }
        res.json({'message':'list successful.','users':r.values()});
        });
});
// Handle insert operations to our database
app.post('/register',(req,res) => {
        let n = req.body.username;
        query = `INSERT INTO USERS(username) VALUES ('`+n+`');`
        connection.query(query,(e,r,f)=> {
                console.log(r);
                res.json({'message': 'Add successful.','users':r});
        });
});

app.post('/clear',(req,res) => {
        query = `DELETE FROM USERS`
        connection.query(query,(e,r,f)=> {
                console.log(r);
                res.json({'message': 'clear successful.','users':r});
        });
});



var http = require('http').Server(app);
const PORT = 80;
http.listen(PORT,function() {
        console.log('Listening');
});

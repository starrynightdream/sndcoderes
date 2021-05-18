const path = require('path');

const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'and secret in there',
    resave: false,
    saveUninitialized: true,
}));

app.use('/', express.static( path.join( __dirname, "/public/")));

app.post('/postUrl', async (req, res) =>{
    // get data
    req.body
    res.json({
        //res data

    });
});

app.get('/', (req, res) =>{
    res.sendFile( path.join(__dirname, "view/index.html")); // 相对路径
});

app.listen(port, ()=>{
    console.log('now run at port' + port);
});
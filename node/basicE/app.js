const path = require('path');
const cp = require('child_process');

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

app.get('/run_script/', (req, res)=>{
    // run script
    let key = req.body.key;
    let file = '';
    switch(key)
    {
        case 'fileName1':
            file = 'filePath1';
            break;
        default:
            file = 'def or err'
    }
    if (file)
        res.json({
            stdout: 'no such file'
        });
    
    // there is python script, changeable
    const commend = `python ${ path.join(__dirname, file)}`;
    let pyThread = cp.exec(commend, (err, stdout, stderr) =>{
        if (err){
            console.error(err);
            res.json({
                stdout: 'err'
            });
            return;
        }
        console.log('输出>');
        console.log(stdout);
        console.log('错误#');
        console.log(stderr);

        res.json({
            stdout
        });
    });

    pyThread.on('exit', (code) =>{
        // 可做退出处理
    });
});

app.get('/', (req, res) =>{
    res.sendFile( path.join(__dirname, "view/index.html")); // 相对路径
});

app.listen(port, ()=>{
    console.log('now run at port' + port);
});
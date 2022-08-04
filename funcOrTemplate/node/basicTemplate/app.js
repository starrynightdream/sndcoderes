const path = require('path');
const cp = require('child_process');

const express = require('express');
const session = require('express-session');
const ejs = require('ejs')

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'and secret in there',
    resave: false,
    saveUninitialized: true,
}));

app.set('views', path.join(__dirname, '/view')); 
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/', express.static( path.join( __dirname, "/public/")));

// 跨域请求允许
app.all('*', (req, res, next)=>{
    // 允许的域，*为任意域名
    res.header("Access-Control-Allow-Origin","*");
    // 允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    // 允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options')
        res.send(200);  //让options尝试请求快速返回
    else
        next();
});

app.post('/postUrl', async (req, res) =>{
    // post data
    req.body
    res.json({
        //res data

    });
});

app.get('/data/:code', async (req, res) =>{
    // get data
    req.query
    // url data
    req.params
    res.status(200).end('code');
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
    
    // 在这里运行的是python脚本，命令根据具体需求变更
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
    res.render('index');
    // res.sendFile( path.join(__dirname, "view/index.html")); // 相对路径
});

app.listen(port, ()=>{
    console.log('now run at port' + port);
});
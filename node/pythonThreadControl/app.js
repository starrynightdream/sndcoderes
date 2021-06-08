const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const express = require('express');

const app = express();
const port = 3000;

const threadObj = {};

app.get('/run_script/:script', (req, res)=>{
    // run script
    // let key = req.body.key;
    let key = req.params.script;
    if (!key.endsWith('.py')){
        key += '.py';
    }
    let file = path.join( __dirname, 'pythonScripts/', key);
    
    if (!fs.existsSync(file)){
        res.json(`no such file ${key}`);
    }

    // 在这里运行的是python脚本，命令根据具体需求变更
    // const commend = `python ${file}`;

    let pyThread = cp.spawn('python', [file]);

    pyThread.stdout.on('data', (data) =>{
        console.log(`stdout> ${data}`);
    });

    pyThread.on('exit', (code) =>{
        // 可做退出处理
        console.log(`exit code ${code}`);
    });

    threadObj[key] = pyThread;
    res.end('run now');
});


app.get('/kill/:script', (req, res)=>{
    // run script
    // let key = req.body.key;
    let key = req.params.script;
    if (!key.endsWith('.py')){
        key += '.py';
    }

    if (threadObj[key]){
        threadObj[key].kill();
        res.json('ok');
    } else {
        res.json('false');
    }
});

app.listen(port, (err) =>{
    if (err){
        console.log(err)
    } else {
        console.log(`run at port ${port}`);
    }
})
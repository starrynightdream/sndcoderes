const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost', // 默认数据库在本机
    user: 'root',
    password: 'password',
    database: 'yourdb',
    timezone: 'Hongkong',
    charset: 'utf8',
});

// 连接数据库
connection.connect();

// 基础写法
// use let result = await dao.funcName
const funcName = ({param1, param2}) =>{
    // let sql = `select * from user where username = '${username}' and password = '${password}'`;
    let sql = `sql line replace string '${param1}' number/double ${param2}`;
    return new Promise( (resolve, reject) =>{

        connection.query(sql, (err, result) =>{
        
            if (err)
            {
                console.log('err: ', err);
                reject(err);
                return;
            }
            resolve(result);
            return result;
        });
    });
}

module.exports = {
    funcName
}
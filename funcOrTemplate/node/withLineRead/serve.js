const fs = require('fs')
const readline = require('readline')
const http = require('http')
const path = require('path')
const app = require('express')()

const dataSource = 'data.csv'
const port =9999

/**
 * 将文件每次返回一行
 * 存在bug 暂时不要使用
 * @return None
 */
function reader(title = true) {
    let readObj = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, dataSource))
    })
    return (res) =>{
        readObj.resume()
        readObj.on('line', (input) =>{
            res.end(input)
            readObj.pause()
        })

        readObj.on('close', ()=>{
            readObj = readline.createInterface({
                input: fs.createReadStream(path.join(__dirname, dataSource))
            })
        })
    }
}

const data_reader = reader()

app.get('/', (req, res) =>{
    data_reader(res)
})

app.listen(port, ()=>{
    console.log(`run at port ${port}`)
})
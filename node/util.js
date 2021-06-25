const os = require('os');
const fs = require('fs');
const path = require('path');

/**
 * 获取所有ip地址
 * @returns 所有ip地址的列表
 */
const getAllIpAddress = () =>{
    const networkInterface = os.networkInterfaces();

    const ans = [];
    Object.keys( networkInterface).forEach( key =>{

        networkInterface[key].forEach( item =>{
            ans.push(item.address);
        });
    });
    return ans;
}

/**
 * 
 * @param {Date} date 希望格式化的时间，默认为当前
 * @param {string} pattern 格式化模板， 默认 yyyy-MM-dd
 * @returns 
 */
const mysqlDateFormate = function (date, pattern) {
    if (!date) {
        date = new Date;
    } else {
        if (!isDate(date)) {
            date = new Date(date);
        }
    }
    pattern = pattern || 'yyyy-MM-dd';
    var y = date.getFullYear().toString();
    var o = {
        M: date.getMonth() + 1, //month
        d: date.getDate(), //day
        h: date.getHours(), //hour
        m: date.getMinutes(), //minute
        s: date.getSeconds() //second
    };
    pattern = pattern.replace(/(y+)/ig, function (a, b) {
        return y.substr(4 - Math.min(4, b.length));
    });
    for (var i in o) {
        pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
            return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
        });
    }
    return pattern;
}

const readJSONFile = async (filePath, warn = false) =>{

    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, 'utf-8', (err, data)=>{

            if (err) {
                if (warn)
                    console.error(err);
                reject(err);
                return null;
            }else{
                let ans = JSON.parse(data);
                resolve(ans)
                return ans;
            }
        });
    });
}

const findAllFileLike = async (dir='./', typelist=[], warn = false) =>{
    
    if (typelist.length === 0) {

        return new Promise((resolve, reject) =>{
            resolve([]);
            reject("没有指定元素");
            return [];
        });
    }
    let checkBOX = {};
    for (let fn of typelist){
        checkBOX[fn] = true;
    }
    let ans = [];
    return new Promise(async (resolve, reject) =>{

        fs.readdir(dir,async (err, files) =>{
            if (err){
                if (warn){
                    console.warn(err);
                }
                reject(ans);
                return ans;
            }

            for (let name of files) {
                let checkFilePath = path.join(dir, name);
                let status = fs.statSync(checkFilePath);
                let isF = status.isFile();
                let isD = status.isDirectory();

                if (isF){
                    let extendN = name.split('.')[1];
                    if (checkBOX[extendN]){
                        ans.push(checkFilePath);
                    }
                }
                if (isD){
                    let inside = await findAllFileLike(checkFilePath, typelist, warn);
                    ans.push(...inside);
                }
            } // end of forEach
            resolve(ans);
        }); // end of readdir
    }); // end of Promise
}


const main = async()=>{
    // let ans = await findAllFileLike('./', ['md', 'js'], true);
    // console.log(ans);
}

main()

module.exports = {
    getAllIpAddress, mysqlDateFormate, readJSONFile, findAllFileLike
}
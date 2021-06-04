const os = require('os');

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

module.exports = {
    getAllIpAddress, mysqlDateFormate
}
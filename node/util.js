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

module.exports = {
    getAllIpAddress
}
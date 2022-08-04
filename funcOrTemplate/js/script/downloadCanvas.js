// 在浏览器环境运行
// 下载页面所有canvas内的内容。
let cs = document.getElementsByTagName('canvas');
let a = document.createElement('a');
let i = 0;
for (let c of cs){
    a.href = c.toDataURL();
    a.download = `docu${i++}.png`;
    a.click();
}
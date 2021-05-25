// 原生js的ajax实现

const ajax = {
    get : (url, data, fn) =>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function(){

            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304){
                fn.call(this, xhr.responseText);
            }
        };

        xhr.send(data);
    },
    post : (url, data, fn) =>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {

            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304){
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send(data);
    }
}
//发起亲求先调用这个函数

$.ajaxPrefilter(function (options) {

    //再发器亲求之前来统一根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);


    //统一为有权限的接口设置headers接口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    if (options.url.indexOf('/my/') !== -1) {
        options.complete = function (res) {
            //console.log(11);
            //在complete回调函数中可以使用res.responsejosn拿到服务器响应回来的数据
            //console.log(res);
            if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
                location.href = '/logoin.html';
                localStorage.removeItem('token');
            }
        }
    }

})
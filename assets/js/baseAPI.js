//发起亲求先调用这个函数

$.ajaxPrefilter(function (options) {

    //再发器亲求之前来统一根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
})
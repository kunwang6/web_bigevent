$(function () {

    //定义一个查询参数对象
    //需要将请求参数对象提交到服务器
    var p = {
        pagenum: 1,//页码值 默认请求第一页数据
        pagesize: 2,//每页显示多少条数据
        cate_id: '',//文章分类的 Id
        state: ''//文章的状态，可选值有：已发布、草稿
    }


    //  获取文章数据的方法
    function inittable() {

        $.ajax({
            method: 'GET',
            URL: '/my/article/list',
            data: p,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章列表失败')
                }
                console.log(res);
                //模板引擎渲染页面数据
                // var htmlstr = templeate('tpl_tab', res);
                // $('tbody').html(htmlstr);
            }
        })
    }



    inittable();
})
$(function () {



    //调用函数或取用户信息
    getUserinfo();
    var layer = layui.layer;
    $('#ogou').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1清空本地存储的token
            localStorage.removeItem('token');

            //跳转到登录页
            location.href = '/logoin.html';

            //layer.close(index);
        });
    })


})

//获取用户信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderavatar(res.data);
        },
        //请求成功或者失败都需掉这个函数
        // complete: function (res) {
        //     //console.log(11);
        //     //在complete回调函数中可以使用res.responsejosn拿到服务器响应回来的数据
        //     //console.log(res);
        //     if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
        //         location.href = '/logoin.html';
        //         localStorage.removeItem('token');
        //     }
        // }
    })
}
//渲染用沪头像 

function renderavatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    //设置文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }

}
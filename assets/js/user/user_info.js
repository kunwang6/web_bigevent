$(function () {
    var form = layui.form;
    form.verify({
        nikename: function (val) {
            if (val.length > 6) {
                return '昵称必须在1-6之间'
            }
        }

    })

    inituserinfo();
    var layer = layui.layer;
    //初始化基本信息
    function inituserinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // var name = res.data;
                // $('#username').val(name.username);
                // $('#nickname').val(name.nickname);
                //调用form。val为表单赋值
                form.val('formuserinfo', res.data);
            }
        })
    }



    $('#btn_reset').on('click', function (e) {
        e.preventDefault();
        inituserinfo();
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('重置信息失败');
                }

                layer.msg('更新信息成功')
                //调用父页面的方法重新跟新信息
                window.parent.getUserinfo();
            }
        })
    })

})
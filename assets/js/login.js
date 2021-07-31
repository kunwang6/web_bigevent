$(function () {
    //点击去注册账号的链接
    $('.floot_right').on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    //点击去登录账号的链接
    $('.aa').on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    //从layui获取form对象
    var form = layui.form;
    var layaer = layui.layer;
    //通过form.verify自定义校验规则
    form.verify({
        //自定义了一个pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            var pwd = $('#firstpwd').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layaer.msg(res.message)
            };
            //console.log(res.message);
            //弹出框提示用户
            layaer.msg('注册成功，请登录');
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        var data = $('#form_login').serialize();
        e.preventDefault();
        $.post('/api/login', { username: $('#form_login [name=username]').val(), password: $('#form_login [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layaer.msg('登录失败')
            }
            layaer.msg('登录成功');
            console.log(res.token);
            //将登路成功的token保存到 localstorage中
            localStorage.setItem('token', res.token);
            //跳转到后台主页
            location.href = '/index.html'
        })
    })




})
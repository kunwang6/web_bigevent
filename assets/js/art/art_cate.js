$(function () {
    //获取文章分类的列表
    function initcatelist() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章列表失败')
                }
                var htmlStar = template('tpl_table', res);
                $('#tbody1').html(htmlStar);

            }
        })
    }
    var indexadd = null;
    $('#addcate').on('click', function () {
        indexadd = layer.open({
            area: ['500px', '260px'],
            type: 1,
            title: '添加文章分类'
            , content: $('#dialog-add').html()
        });
    })

    //通过代理绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('添加失败');
                }
                layui.layer.msg('添加成功');
                //根据索引挂壁弹出岑
                layui.layer.close(indexadd);
                initcatelist();
            }


        })
    })
    var form = layui.form;
    var indexedit = null;
    $('.layui-table').on('click', '#btn_edit', function () {
        indexedit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类'
            , content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类的列表失败')
                }
                //console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        //console.log(666); 
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $('#form-edit').serialize(),//this也可以
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新文章分类的列表失败')
                }
                layui.layer.close(indexedit);
                layui.layer.msg('更新文章分类的列表成功')
                initcatelist();
            }
        })
    })

    $('#tbody1').on('click', '#delete', function () {
        //console.log(666);
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除文章分类失败');
                    }
                    layui.layer.msg('删除文章分类成功');
                    initcatelist();

                }
            })

            layer.close(index);
        });
    })



    initcatelist();


})
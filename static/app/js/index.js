$(function(){
    //弹出表格创建/编辑框
    $("#openCreateWindow").click(function(){
        var editWindow = $('#myModal');
        editWindow.find("#id").val("");
        editWindow.find("#title").val("");
        editWindow.find("#presentation").val("");
        editWindow.modal();
    });


    //提交表格
    $("#summitTable").click(function(){
        console.log("-----");
        var formData = $("#tableContent").serialize();
        $.post('./editTable/',formData,function (msg) {
                if('ok'=== msg){
                    window.location.reload();
                }else if('UNIQUE constraint failed: ec_exceltable.name'){
                    var warning = "<div class='alert alert-warning'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-hidden='true'>&times;</a>" +
                        "存在相同标题的表格,请变更标题</div>";
                    $(".modal-body").prepend(warning);
                }else {
                    var warning = "<div class='alert alert-warning'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-hidden='true'>&times;</a>" +
                        "后台发生错误</div>";
                    $(".modal-body").prepend(warning);
                }
            }
        );
    });

    //删除表格
    $("#tables").on("click","button[name=delete]",function (event) {
        // console.log($(event.target).parentsUntil("div[tabid]").last().parent().attr("tabid"));
        var card = $(event.target).parentsUntil("div[tabid]").last().parent();
        var tabid = card.attr("tabid");
        $.get('./deleteTable/'+tabid+'/',function (msg) {
                if ('ok' === msg) {
                    card.remove();
                } else {
                    alert("删除失败:"+msg);
                }
            }
        );
    });

    $("#tables").on("click","button[name=edit]",function (event) {
        var divs = $(event.target).parentsUntil("div[tabid]");
        var tabid = divs.last().parent().attr("tabid");
        var title = divs.find("h4").text();
        var presentation = divs.find("p").text();

        var editWindow = $('#myModal');
        editWindow.find("#id").val(tabid);
        editWindow.find("#title").val(title);
        editWindow.find("#presentation").val(presentation);
        editWindow.modal();
    });

    $("#tables").on("click","button[name=view]",function (event) {
        var divs = $(event.target).parentsUntil("div[tabid]");
        var tabid = divs.last().parent().attr("tabid");
        $(location).attr('href', "../table?tabid="+tabid);
    });

});
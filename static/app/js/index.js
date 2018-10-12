$(function(){
    //弹出表格创建/编辑框
    $("#openCreateWindow").click(function(){
        $('#myModal').modal();
    });

    $("#summitCreateTable").click(function(){
        console.log("-----");
        $("#tableContent").submit();
    });
});
$(function () {
    var utils = {
        //10转26进制 从下标得到列名 如:25 = BA
        getColumn: function (columnIndex) {
            var column = String.fromCharCode(65 + (columnIndex%25));
            var multiple = parseInt(columnIndex / 25);
            if (multiple > 0) {
                column = this.getColumn(multiple)+column;
            }
            return column;
        },
        //26进制转10 从列名得到下标 如:BA = 25
        getColumnIndex:function(column){
            var columnIndex = 0;
            for(var i = 0;i<column.length;i++){
                columnIndex += Math.pow(25,column.length-1-i)*(column.charCodeAt(i)-65);
            }
            return columnIndex;
        },
        freshTableIndex:function () {
            $("tr[id!='tableHead']").each(function(i,itemTr){
                $.each(itemTr.cells,function(j,itemTd){
                    itemTd.setAttribute("rowIndex",i);
                    var columnIndex = utils.getColumn(j - 1);
                    itemTd.setAttribute("columnIndex", columnIndex);
                    if(columnIndex == '@'){
                        itemTd.innerHTML=i;
                    }
                });
            });
        }
    };
    window.utils = utils;
    var data = [
        {param1: "1,001", param2: "Lorem", param3: "ipsum", param4: "dolor", param5: "sit"},
        {param1: "1,002", param2: "amet", param3: "consectetur", param4: "adipiscing", param5: "elit"},
        {param1: "1,003", param2: "Integer", param3: "nec", param4: "odio", param5: "Praesent"},
        {param1: "1,003", param2: "libero", param3: "Sed", param4: "cursus", param5: "ante"},
        {param1: "1,004", param2: "dapibus", param3: "diam", param4: "Sed", param5: "nisi"},
        {param1: "1,005", param2: "Nulla", param3: "quis", param4: "sem", param5: "at"},
        {param1: "1,006", param2: "nibh", param3: "elementum", param4: "imperdiet", param5: "Duis"},
        {param1: "1,007", param2: "sagittis", param3: "ipsum", param4: "Praesent", param5: "mauris"},
        {param1: "1,008", param2: "Fusce", param3: "nec", param4: "tellus", param5: "sed"},
        {param1: "1,009", param2: "augue", param3: "semper", param4: "porta", param5: "Mauris"},
        {param1: "1,010", param2: "massa", param3: "Vestibulum", param4: "lacinia", param5: "arcu"},
        {param1: "1,011", param2: "eget", param3: "nulla", param4: "Class", param5: "aptent"},
        {param1: "1,012", param2: "taciti", param3: "sociosqu", param4: "ad", param5: "litora"},
        {param1: "1,013", param2: "torquent", param3: "per", param4: "conubia", param5: "nostra"},
        {param1: "1,014", param2: "per", param3: "inceptos", param4: "himenaeos", param5: "Curabitur"},
        {param1: "1,006", param2: "nibh", param3: "elementum", param4: "imperdiet", param5: "Duis"},
        {param1: "1,007", param2: "sagittis", param3: "ipsum", param4: "Praesent", param5: "mauris"},
        {param1: "1,008", param2: "Fusce", param3: "nec", param4: "tellus", param5: "sed"},
        {param1: "1,009", param2: "augue", param3: "semper", param4: "porta", param5: "Mauris"},
        {param1: "1,010", param2: "massa", param3: "Vestibulum", param4: "lacinia", param5: "arcu"},
        {param1: "1,011", param2: "eget", param3: "nulla", param4: "Class", param5: "aptent"},
        {param1: "1,012", param2: "taciti", param3: "sociosqu", param4: "ad", param5: "litora"},
        {param1: "1,013", param2: "torquent", param3: "per", param4: "conubia", param5: "nostra"},
        {param1: "1,014", param2: "per", param3: "inceptos", param4: "himenaeos", param5: "Curabitur"},
        {param1: "1,006", param2: "nibh", param3: "elementum", param4: "imperdiet", param5: "Duis"},
        {param1: "1,007", param2: "sagittis", param3: "ipsum", param4: "Praesent", param5: "mauris"},
        {param1: "1,008", param2: "Fusce", param3: "nec", param4: "tellus", param5: "sed"},
        {param1: "1,009", param2: "augue", param3: "semper", param4: "porta", param5: "Mauris"},
        {param1: "1,010", param2: "massa", param3: "Vestibulum", param4: "lacinia", param5: "arcu"},
        {param1: "1,011", param2: "eget", param3: "nulla", param4: "Class", param5: "aptent"},
        {param1: "1,012", param2: "taciti", param3: "sociosqu", param4: "ad", param5: "litora"},
        {param1: "1,013", param2: "torquent", param3: "per", param4: "conubia", param5: "nostra"},
        {param1: "1,014", param2: "per", param3: "inceptos", param4: "himenaeos", param5: "Curabitur"},
        {param1: "1,015", param2: "sodales", param3: "ligula", param4: "in", param5: "libero"}
    ];
    //fill data
    data.forEach(function (row, rowIndex) {
        var tds = "<tr><td rowIndex='"+rowIndex+"' columnIndex='@'>" + rowIndex + "</td>";
        var columnIndex = 0;
        for (var param in row) {
            tds += "<td rowIndex='" + rowIndex + "' columnIndex='" + utils.getColumn(columnIndex) + "'>" + row[param] + "</td>";
            columnIndex++;
        }
        tds += "</tr>";
        $("#tableBody").append(tds);
    });

    //右键菜单 -行|格子
    $("#tableBody").contextmenu(function (event) {
        window.row = event.target.innerHTML;
        $("#columnMenu").hide("fast");
        var itemMenu = $("#itemMenu");
        var lis = itemMenu.find("li[name='numberCell']");
        if(event.target.getAttribute("columnIndex") == '@'){
            lis.show();
        }else {
            lis.hide();
        }
        itemMenu.hide();
        itemMenu.show("fast");
        itemMenu.offset({top:event.pageY,left:event.pageX});
        return false;
    });

    //右键菜单 -列
    $("#tableHead").contextmenu(
        function (event) {
            $("#itemMenu").hide("fast");
            window.column = event.target.innerHTML;
            if (window.column == '#') return false;

            var columnMenu = $("#columnMenu");
            columnMenu.hide();
            columnMenu.show("fast");
            columnMenu.offset({top:event.pageY,left:event.pageX});
            //return false为了屏蔽默认事件
            return false;
        }
    );

    //点击空白后隐藏右键菜单
    $("#mainDiv").click(function () {
        $("#itemMenu").hide("fast");
        $("#columnMenu").hide("fast");
    });

    //列插入
    $("#insertColumn").click(function () {
        var index = window.column.charCodeAt(0) - 65;
        console.log(index);
        var ths = $("#tableHead th[id!='rowNumber']");
        console.log(ths);
        ths.eq(index).before("<th>" + utils.getColumn(index) + "</th>");
        ths.each(function (i, item) {
            if (index <= i) {
                item.innerHTML = utils.getColumn(i+1);
            }
        });
        $("td[columnIndex='"+window.column+"']").before("<td></td>");
        utils.freshTableIndex();
    });

    //列删除
    $("#deleteColumn").click(function () {
        var index = window.column.charCodeAt(0) - 65;
        var ths = $("#tableHead th[id!='rowNumber']");
        ths.eq(index).remove();
        ths.each(function (i, item) {
            if (index <= i) {
                item.innerHTML = utils.getColumn(i-1);
            }
        });
        $("td[columnIndex='"+window.column+"']").remove();
        utils.freshTableIndex();
    });

    //行插入
    $("#insertRow").click(function(){
        var row = window.row;
        var tr = "<tr>";
        var tds = $("td[rowIndex='"+row+"']");
        for(var i = 0; i<tds.length;i++){
            tr += "<td></td>"
        }
        tr += "</tr>";
        tds.parent().before(tr);
        utils.freshTableIndex();
    });


    //行删除
    $("#deleteRow").click(function(){
        var tds = $("td[rowIndex='"+row+"']");
        tds.parent().remove();
        utils.freshTableIndex();
    });
});
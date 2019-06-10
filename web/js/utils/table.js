/**
 * 封装表格处理函数
 * @returns {Object}
 * @constructor
 */
function TableInit() {
    var tableInit = new Object();
    /**
     * 初始化表格
     * @param param
     * @constructor
     */
    tableInit.Init = function (param) {
        //请求数据
        $.ajax({
            type: 'post',
            url: param.url,
            dataType: "json",
            data: param.data,
            success: function (data) {
                $(param.id).bootstrapTable('destroy');
                $(param.id).bootstrapTable({
                    pagination: true,
                    sortable: false,
                    toolbar: param.toolbar,
                    pageNumber: param.pageNumber,
                    striped: true,
                    search: param.search,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100],
                    data: data,
                    columns: param.columns,
                    showExport: param.export,              //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
                    exportDataType: "basic",              //basic', 'all', 'selected'.
                    exportTypes: ['excel', 'xlsx'],	    //导出类型
                    //exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
                    exportOptions: {
                        // ignoreColumn: [6,7],            //忽略某一列的索引
                        fileName: '费用清单',              //文件名称设置
                        worksheetName: 'Sheet1',          //表格工作区名称
                        tableName: '费用清单',
                        excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
                        //onMsoNumberFormat: DoOnMsoNumberFormat
                    }
                });
            },
            error: function () {
                console.log('获取数据失败!');
            }
        });
    };
    return tableInit;
}
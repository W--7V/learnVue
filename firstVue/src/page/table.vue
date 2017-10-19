<style>
#element_table{
    width: calc(100% - 240px);
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
}
</style>



<template>
    <div>
        <el-input style="width:200px" placeholder="标题" class="filter-item"/>
        <el-table :data="tableData" border id="element_table" >
            <el-table-column type="index" width="50" ></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        </el-table>
        <!-- <p>{{msg}}</p> -->
    </div>
</template>

<script>
import axios from 'axios'
    var tableData=[{
            "createTime":"2017-10-17",  
            "updateTime":"2017-10-18"
        },{
            "createTime":"2017-10-19",  
            "updateTime":"2017-10-20"
        }];

    export default {
        data:function() {
            return {
                tableData:tableData
            };
        },
        created: function(){
            this.$ajax.post('http://localhost/providerInfo/list').then((response) => {
                console.log(response);
            })


            // axios({
            //     method:'post',
            //     url:'/api/providerInfo/list',
            // }).then((response) => {
            //     console.log(response);
            // })
        },methods:{
            //时间格式化
            dateFormat:function(row, column) {
               var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
            }
        }
    }
</script>


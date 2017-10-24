<template>
    <div>
        <table-comp :build="build" v-on:search="subSearch" v-on:reset="subReset"></table-comp>
    </div>
</template>

<script>
import tableComp from './tableComp'
export default {
    data:function(){
        return {
            build:{
                top:[{
                    type:'input',
                    placeholder:'姓名',
                    name:'name'
                },{
                    type:'select',
                    placeholder:'性别',
                    name:'gender',
                    options:[
                        '男','女'
                    ]
                },{
                    type:'button',
                    placeholder:'搜索',
                    name:'subSearch',
                    invokeMethod:'search',
                    func:undefined
                },{
                    type:'button',
                    placeholder:'清空',
                    name:'subReset',
                    invokeMethod:'reset',
                    func:undefined
                }],
                table:[{
                    prop:'loginName',
                    label:'登录名'
                },{
                    prop:'name',
                    label:'姓名'
                },{
                    prop:'gender',
                    label:'性别'
                },{
                    prop:'age',
                    label:'年龄'
                }],
                bottom:{
                    pagesize:[20,50,100]
                },
                searchFun:undefined
            }
        }
    },
    components:{
        tableComp
    },
    created:function(){
        this.build.top[2].func = this.getList
        this.build.searchFun = this.getList
    },
    methods:{
        subSearch:function(name){
            this.getList()
            
            this.$message({
                message: '被子组件调用'+name,
                type: 'success'
            })
        },
        subReset:function(name){
            this.$message({
                message: '被子组件调用'+name,
                type: 'success'
            })
        },
        invokBySubComp:function(name){
            
            for(var item in this){
                if(item === subSearch){
                    this.item("123");
                }
            }
        },
        getList(subComp) {
            subComp.listLoading = false
            var qs = require('querystring');

            this.$ajax({
                url:'http://localhost/member/list',
                method:'post',
                async: false,
                // data:qs.stringify(this.listQuery)
            }).then((response) => {
                subComp.list = response.data.rows
                subComp.total = response.data.total
                subComp.listLoading = true
            })
        },
    }
}
</script>
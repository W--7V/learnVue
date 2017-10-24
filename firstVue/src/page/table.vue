
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
                    placeholder:'地址',
                    name:'address'
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
                    invokeMethod:'search'
                },{
                    type:'button',
                    placeholder:'清空',
                    name:'subReset',
                    invokeMethod:'reset'
                }],
                table:[{
                    prop:'address',
                    label:'地址'
                },{
                    prop:'contactMan',
                    label:'联系人'
                },{
                    prop:'providerName',
                    label:'供应商'
                },{
                    prop:'empbaseInfoName',
                    label:'对接人'
                }],
                bottom:{
                    pagesize:[20,50,100]
                },
                func:{
                },
            },
            listQuery: {
                page: 1,
                rows: 20,
            },
            list: null,
            total: null,
            listLoading: false,
        }
    },
    components:{
        tableComp
    },
    created:function(){
        // console.log(this.build)
        this.build.func = this.getList
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
            // var func = eval(name)
            // this.subSearch(name)
            // func(name)
            // this.$message({
            //     message: '被子组件调用'+name,
            //     type: 'success'
            // })
        },
        getList(compo) {
            compo.listLoading = false
            var qs = require('querystring');

            this.$ajax({
                url:'http://localhost/providerInfo/list',
                method:'post',
                async: false,
                // data:qs.stringify(this.listQuery)
            }).then((response) => {
                compo.list = response.data.rows
                compo.total = response.data.total
                compo.listLoading = true
                console.log(compo);
            })
        },
    }
}
</script>


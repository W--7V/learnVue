
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
                    func:undefined

                },{
                    type:'button',
                    placeholder:'清空',
                    name:'subReset',
                    func:undefined
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
                searchFun:undefined,
                listQuery: {
                    address:undefined,
                    page: 1,
                    rows: 20
                },
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
        this.build.top[2].func = this.getList
        this.build.searchFun = this.getList
    },
    methods:{
        getList(subComp) {
            subComp.listLoading = false
            var qs = require('querystring');

            this.$ajax({
                url:'http://localhost/providerInfo/list',
                method:'post',
                async: false,
                data:qs.stringify(subComp.listQuery)
            }).then((response) => {
                subComp.list = response.data.rows
                subComp.total = response.data.total
                subComp.listLoading = true
            })
        },
    }
}
</script>


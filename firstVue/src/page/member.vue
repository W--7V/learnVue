<template>
    <div>
        <table-comp :build="build"></table-comp>
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
                    placeholder:'登录名',
                    name:'loginName'
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
                    func:undefined
                },{
                    type:'button',
                    placeholder:'清空',
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
                searchFun:undefined,
                listQuery: {
                    page: 1,
                    limit: 20,
                    loginName:undefined,
                    gender:undefined
                },
                list:[],
                total:undefined,
                listLoading:undefined
            }
        }
    },
    components:{
        tableComp
    },
    created:function(){
        this.build.top[2].func = this.getList
        this.build.top[3].func = this.reset
        this.build.searchFun = this.getList
    },
    methods:{
        getList() {
            this.listLoading = false
            var qs = require('querystring');

            this.$ajax({
                url:'http://localhost/member/list',
                method:'post',
                async: false,
                data:qs.stringify(this.build.listQuery)
            }).then((response) => {
                this.build.list = response.data.rows
                this.build.total = response.data.total
                this.build.listLoading = true
            })
        },
        reset(){
            for(var p in this.build.listQuery){
                if(p != "page" && p != "limit"){
                    this.build.listQuery[p]=undefined
                }
            }
            console.log(this.build.listQuery)
        }
    }
}
</script>
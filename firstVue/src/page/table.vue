
<template>
    <div>
        <table-comp :build="build" v-on:invok="invokBySubComp"></table-comp>
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
                    name:'search',
                    invokeMethod:'search'
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
                }
            }
        }
    },
    components:{
        tableComp
    },
    methods:{
        invokBySubComp:function(){
            this.$message({
                message: '被子组件调用',
                type: 'success'
            })
        },
        search:function(){
            
        }
    }
}
</script>


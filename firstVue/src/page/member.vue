<template>
    <div>
        <table-comp :build="build"></table-comp>
        <el-dialog title="成员信息" :visible.sync="dialogPvVisible" size="small">
            <el-form :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="登录名">
                    <el-input v-model="temp.loginName" />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="temp.name" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="temp.gender" />
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="temp.age" />
                </el-form-item>
            </el-form>
            <span class="dialog-footer" align="center">
                <el-button type="primary" @click="save()" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import tableComp from './tableComp'
var qs = require('querystring');
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
                },{
                    type:'button',
                    placeholder:'新增',
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
            },
            dialogPvVisible:false,
            temp: {
                loginName:undefined,
                name:undefined,
                gender:undefined,
                age:undefined
            },
        }
    },
    components:{
        tableComp
    },
    created:function(){
        this.build.top[2].func = this.getList
        this.build.top[3].func = this.reset
        this.build.top[4].func = this.addDialog
        this.build.searchFun = this.getList
    },
    methods:{
        getList() {
            this.listLoading = false
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
        },
        addDialog(){
            this.dialogPvVisible = true
        },
        save(){
            this.$ajax({
                url:'http://localhost/member/saveOrUpdate',
                method:'post',
                async: false,
                data:qs.stringify(this.temp)
            }).then((response) => {
                // this.build.list = response.data.rows
                // this.build.total = response.data.total
                // this.build.listLoading = true
                this.dialogPvVisible = false
                this.getList()
            })
        }
    }
}
</script>
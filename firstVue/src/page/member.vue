<template>
    <div>
        <table-comp :build="build"></table-comp>
        <el-dialog title="成员信息" :visible.sync="addDialogVisible" size="small">
            <el-form :model="addTemp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="登录名">
                    <el-input v-model="addTemp.loginName" />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="addTemp.name" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="addTemp.gender" clearable>
                        <el-option v-for="option in genderOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="addTemp.age" />
                </el-form-item>
            </el-form>
            <span class="dialog-footer" align="center">
                <el-button type="primary" @click="save()" >确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="成员信息" :visible.sync="editDialogVisible" size="small">
            <el-form :model="editTemp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="登录名">
                    <el-input v-model="editTemp.loginName" />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editTemp.name" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="editTemp.gender">
                        <el-option v-for="option in genderOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="editTemp.age" />
                </el-form-item>
            </el-form>
            <span class="dialog-footer" align="center">
                <el-button type="primary" @click="update()" >确 定</el-button>
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
            build:{},
            addDialogVisible:false,
            editDialogVisible:false,
            addTemp: {
                loginName:undefined,
                name:undefined,
                gender:undefined,
                age:undefined
            },
            editTemp: {
                loginName:undefined,
                name:undefined,
                gender:undefined,
                age:undefined
            },
            genderOptions: [{
                value: 0,
                label: '男'
            },{
                value: 1,
                label: '女'
            }]
        }
    },
    components:{
        tableComp
    },
    created:function(){
        this.build = {
            top:[{
                type:'input',
                placeholder:'登录名',
                name:'loginName'
            },{
                type:'select',
                placeholder:'性别',
                name:'gender',
                options:[
                    {label:'男', value:0},
                    {label:'女', value:1}
                ]
            },{
                type:'button',
                placeholder:'搜索',
                func:this.getList
            },{
                type:'button',
                placeholder:'清空',
                func:this.resetQuery
            },{
                type:'button',
                placeholder:'新增',
                func:this.addDialog
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
            },{
                label:'操作',
                operations:[{
                    label: '删除',
                    func:this.delete_
                },{
                    label: '编辑',
                    func:this.editDialog
                }]
            }],
            bottom:{
                pagesize:[20,50,100]
            },
            listQuery: {
                page: 1,
                rows: 20,
                loginName:undefined,
                gender:undefined
            },
            list:[],
            total:undefined,
            listLoading:undefined
        }
        this.getList()
    },
    methods:{
        resetAddTemp(){
            for(var i in this.addTemp){
                this.addTemp[i] = undefined
            }
        },
        getList() {
            this.listLoading = false
            this.$ajax({
                url:'http://localhost/member/list',
                method:'get',
                async: false,
                params:this.build.listQuery
            }).then((response) => {
                this.build.list = response.data.rows
                this.build.total = response.data.total
                this.build.listLoading = true
            })
        },
        resetQuery(){
            for(var p in this.build.listQuery){
                if(p != "page" && p != "rows"){
                    this.build.listQuery[p]=undefined
                }
            }
            this.getList()
        },
        addDialog(){
            this.resetAddTemp()
            this.addDialogVisible = true
        },
        save(){
            this.$ajax({
                url:'http://localhost/member/saveOrUpdate',
                method:'post',
                data:qs.stringify(this.addTemp)
            }).then((response) => {
                // this.build.list = response.data.rows
                // this.build.total = response.data.total
                // this.build.listLoading = true
                this.addDialogVisible = false
                this.getList()
            })
        },
        editDialog(row){
            this.editDialogVisible = true
            this.editTemp = row
        },
        update(){
            this.$ajax({
                url:'http://localhost/member/saveOrUpdate',
                method:'patch',
                data:qs.stringify(this.editTemp)
            }).then((response) => {
                // this.build.list = response.data.rows
                // this.build.total = response.data.total
                // this.build.listLoading = true
                this.editDialogVisible = false
                this.getList()
            })
        },
        delete_(row){
            var id = row.id
            this.$ajax({
                url:'http://localhost/member/softDelete',
                method:'delete',
                params:{id:id}
            }).then(response => {
                this.getList()
            })
        }
    }
}
</script>
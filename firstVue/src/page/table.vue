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
        <el-input style="width:200px" placeholder="标题" class="filter-item" v-model="listQuery.address"/>
        <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" placeholder="重要性">
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
        <el-table :data="list" border id="element_table" fit highlight-current-row element-loading-text="加载数据。。。">
            <el-table-column type="index" width="50" ></el-table-column>
            <el-table-column prop="address" label="地址" align="center"></el-table-column>
            <el-table-column prop="contactMan" label="联系人" align="center"></el-table-column>
            <el-table-column label="供应商" align="center">
                <template scope="scope">
                    <span class="link-type" @click='handleFetchPv(scope.row)'>{{scope.row.providerName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template scope="scope">
                    <el-button size="small" type="danger">删除</el-button>
                    <el-button size="small" @click="handleFetchPv(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-show="listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="服务商信息" :visible.sync="dialogPvVisible" size="small">
            <el-form :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="名称">
                    <el-input v-model="temp.providerName" />
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="temp.address" />
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="temp.contactMan" />
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="temp.contactPhone" />
                </el-form-item>
                <!-- <el-form-item label="时间">
                    <el-date-picker v-model="temp.empbaseInfo.createTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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

    const calendarTypeOptions = [
        { key: 'CN', display_name: '中国' },
        { key: 'US', display_name: '美国' },
        { key: 'JP', display_name: '日本' },
        { key: 'EU', display_name: '欧元区' }
    ]

    export default {
        data:function() {
            return {
                tableData:tableData,
                list: null,
                total: null,
                listLoading: false,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    address: undefined,
                    sort: '+id'
                },
                temp: {
                    id: undefined,
                    importance: 0,
                    remark: '',
                    timestamp: 0,
                    title: '',
                    type: '',
                    status: 'published'
                },
                importanceOptions: [1, 2, 3],
                calendarTypeOptions,
                sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
                statusOptions: ['published', 'draft', 'deleted'],
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                dialogPvVisible: false,
                pvData: [],
                showAuditor: false,
                tableKey: 0
            };
        },
        created: function(){
            this.listLoading = false
            this.$ajax.post('http://localhost/providerInfo/list').then((response) => {
                this.list = response.data.rows
                this.total = response.data.total
                this.listLoading = true
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
            },
            getList() {
                this.listLoading = false
                var qs = require('querystring');

                this.$ajax({
                    url:'http://localhost/providerInfo/list',
                    method:'post',
                    data:qs.stringify(this.listQuery)
                }).then((response) => {
                    this.list = response.data.rows
                    this.total = response.data.total
                    this.listLoading = true
                })
            },
            handleFilter() {
                this.listQuery.page = 1
                this.getList()
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            timeFilter(time) {
                if (!time[0]) {
                    this.listQuery.start = undefined
                    this.listQuery.end = undefined
                    return
                }
                this.listQuery.start = parseInt(+time[0] / 1000)
                this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
            },
            handleModifyStatus(row, status) {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                row.status = status
            },
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row)
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
            },
            handleDelete(row) {
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                const index = this.list.indexOf(row)
                this.list.splice(index, 1)
            },
            create() {
                this.temp.id = parseInt(Math.random() * 100) + 1024
                this.temp.timestamp = +new Date()
                this.temp.author = '原创作者'
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                })
            },
            update() {
                this.temp.timestamp = +this.temp.timestamp
                for (const v of this.list) {
                    if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1, this.temp)
                    break
                    }
                }
                this.dialogFormVisible = false
                this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success',
                    duration: 2000
                })
            },
            resetTemp() {
                this.temp = {
                    id: undefined,
                    importance: 0,
                    remark: '',
                    timestamp: 0,
                    title: '',
                    status: 'published',
                    type: ''
                }
            },
            handleFetchPv(pv) {
                console.log(pv);
                this.temp = Object.assign({}, pv)
                this.dialogPvVisible = true
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                    return parseTime(v[j])
                    } else {
                    return v[j]
                    }
                }))
            }
        }
    }
</script>


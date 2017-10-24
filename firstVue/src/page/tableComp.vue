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
        <!-- <el-input style="width:200px" placeholder="标题" class="filter-item" v-model="listQuery.address"/>
        <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" placeholder="重要性">
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button> -->
        <template v-for="item in this.build.top">
            <template v-if="item.type === 'input'">
                <el-input style="width:200px" :placeholder="item.placeholder" class="filter-item" v-model="item.name" :key="item.type"/>
            </template>
            <template v-else-if="item.type === 'select'">
                <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="item.placeholder" :key="item.type">
                    <el-option v-for="op in item.options" :key="op" :label="op" :value="op"></el-option>
                </el-select>
            </template>
            <template v-else-if="item.type === 'button'">
                <el-button class="filter-item" type="primary" icon="search" @click="handleFilter(item)" :key="item.type">{{item.placeholder}}</el-button>
            </template>
        </template>

        <el-table :data="list" border id="element_table" fit highlight-current-row element-loading-text="加载数据。。。">
            <el-table-column type="index" width="50" ></el-table-column>
            
            <!-- <el-table-column prop="address" label="地址" align="center"></el-table-column>
            <el-table-column prop="contactMan" label="联系人" align="center"></el-table-column>
            <el-table-column label="供应商" align="center">
                <template scope="scope">
                    <span class="link-type" @click='handleFetchPv(scope.row)'>{{scope.row.providerName}}</span>
                </template>
            </el-table-column> -->

            <template v-for="item in this.build.table">
                <el-table-column :prop="item.prop" :label="item.label" align="center" :key="item.label"></el-table-column>
            </template>
            <el-table-column label="操作" align="center" width="150">
                <template scope="scope">
                    <el-button size="small" type="danger">删除</el-button>
                    <el-button size="small" @click="handleFetchPv(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-show="listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                :page-sizes="this.build.bottom.pagesize" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
            <span class="dialog-footer" align="center">
                <el-button type="primary" @click="update()" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data:function() {
            return {
                list: null,
                total: null,
                listLoading: false,
                listQuery: {
                },
                temp: {
                },
                dialogPvVisible: false,
            };
        },
        props:['build'],
        created: function(){
            this.listQuery = Object.assign({}, this.build.listQuery)
            this.build.searchFun(this);
            console.log(this.build.top)
            // axios({
            //     method:'post',
            //     url:'/api/providerInfo/list',
            // }).then((response) => {
            //     console.log(response);
            // })
        },methods:{
            // getList() {
            //     this.listLoading = false
            //     var qs = require('querystring');

            //     this.$ajax({
            //         url:'http://localhost/providerInfo/list',
            //         method:'post',
            //         data:qs.stringify(this.listQuery)
            //     }).then((response) => {
            //         this.list = response.data.rows
            //         this.total = response.data.total
            //         this.listLoading = true
            //     })
            // },
            handleFilter(item) {
                this.listQuery.page = 1
                item.func(this)
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.build.searchFun(this);
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.build.searchFun(this);
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
                var qs = require('querystring');

                this.$ajax({
                    url:'http://localhost/providerInfo/saveOrUpdate',
                    method:'post',
                    data:qs.stringify(this.temp)
                }).then((response) => {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                })
                this.dialogPvVisible = false
                // this.$notify({
                //     title: '成功',
                //     message: '更新成功',
                //     type: 'success',
                //     duration: 2000
                // })
            },
            handleFetchPv(pv) {
                this.temp = Object.assign({}, pv)
                this.dialogPvVisible = true
            }
        }
    }
</script>


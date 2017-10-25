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
        <template v-for="item in this.build.top">
            <template v-if="item.type === 'input'">
                <el-input style="width:200px" :placeholder="item.placeholder" class="filter-item" v-model="build.listQuery[item.name]"  :key="item.type"/>
            </template>
            <template v-else-if="item.type === 'select'">
                <el-select clearable style="width: 90px" class="filter-item" v-model="build.listQuery[item.name]" :placeholder="item.placeholder" :key="item.type">
                    <el-option v-for="op in item.options" :key="op" :label="op" :value="op"></el-option>
                </el-select>
            </template>
            <template v-else-if="item.type === 'button'">
                <el-button class="filter-item" type="primary" icon="search" @click="handle(item)" :key="item.type">{{item.placeholder}}</el-button>
            </template>
        </template>

        <el-table :data="build.list" border id="element_table" fit highlight-current-row element-loading-text="加载数据。。。">
            <el-table-column type="index" width="50" ></el-table-column>

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
        <div v-show="build.listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="build.listQuery.page"
                :page-sizes="build.bottom.pagesize" :page-size="build.listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="build.total">
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
                temp: {
                },
                dialogPvVisible: false,
            };
        },
        props:['build'],
        created: function(){
            this.build.searchFun();
        },methods:{
            handle(item){
                item.func()
            },
            handleSizeChange(val) {
                this.build.listQuery.limit = val
                this.build.searchFun(this);
            },
            handleCurrentChange(val) {
                this.build.listQuery.page = val
                this.build.searchFun(this);
            },
            create() {
            },
        }
    }
</script>


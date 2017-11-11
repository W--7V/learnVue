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
        <template v-for="item in this.top">
            <template v-if="item.type === 'input'">
                <el-input style="width:200px" :placeholder="item.placeholder" class="filter-item" v-model="listQuery[item.name]"  :key="item.type"/>
            </template>
            <template v-else-if="item.type === 'select'">
                <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery[item.name]" :placeholder="item.placeholder" :key="item.type">
                    <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value"></el-option>
                </el-select>
            </template>
            <template v-else-if="item.type === 'button'">
                <el-button class="filter-item" type="primary" icon="search" @click="handle(item)" :key="item.type">{{item.placeholder}}</el-button>
            </template>
        </template>

        <el-table :data="list" border id="element_table" fit highlight-current-row element-loading-text="加载数据。。。">
            <el-table-column type="index" width="50" ></el-table-column>
            <template v-for="item in this.table">
                <el-table-column v-if="item.operations" :key="item.label" :prop="item.prop" :label="item.label" :min-width="item.width">
                    <template scope="scope">
                        <el-button v-for="operation in item.operations" :key="operation.label" size="small" type="danger" @click="operation.func(scope.row)">{{operation.label}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column v-else :prop="item.prop" :label="item.label" align="center" :formatter="item.formatter" :key="item.label"></el-table-column>
            </template>
        </el-table>
        <div v-show="true" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                :page-sizes="bottom.pagesize" :page-size="listQuery.rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  data: function() {
    return {
      temp: {
      },
      dialogPvVisible: false
    }
  },
  props: ['top', 'table', 'bottom', 'listQuery', 'total', 'list'],
  created: function() {
            // console.log(this.top)
  },
  methods: {
    handle(item) {
      item.func()
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
                // this.searchFun(this);
    },
    handleCurrentChange(val) {
                // this.listQuery.page = val
                // this.searchFun(this);
    }

  }
}
</script>


<template>
    <div>
        <table-comp :top="top" :table="table" :bottom="bottom" :listQuery="listQuery" :total="total" :list="list"></table-comp>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" size="small">
            <el-tabs v-model="activeName"  @tab-click="handleClick">
                <el-tab-pane label="form 表单" name="first">
                    <el-form :model="ruleForm" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                        <el-form-item label="登录名">
                            <el-input v-model="ruleForm.loginName" />
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="ruleForm.name" />
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select v-model="ruleForm.gender" clearable>
                              <el-option v-for="option in genderOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input v-model="ruleForm.age" />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="任务明细" name="second">
                    <el-table border :data="detailArray">
                        <el-table-column prop="name" label="名称"><el-input></el-input></el-table-column>
                        <el-table-column prop="amount" label="数量"></el-table-column>
                        <el-table-column prop="price" label="单价"></el-table-column>
                        <el-table-column prop="total" label="总价"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <span class="dialog-footer" align="center">
                <el-button v-if="dialogStatus == 'create'" type="primary" @click="save()" >保 存</el-button>
                <el-button v-else type="primary" @click="update()" >保 存</el-button>
                <el-button v-if="activeName == 'second'" type="primary" @click="addDetail" >添加明细</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import tableComp from './tableComp'
// import { list } from '@/api/member.js'
var qs = require('querystring')
export default {
  data: function() {
    return {
      top: '',
      table: '',
      bottom: '',
      listQuery: '',
      list: [],
      total: '',
      listLoading: '',
      dialogVisible: false,
      activeName: 'first',
      detailArray: [],
      ruleForm: {
        loginName: undefined,
        name: undefined,
        gender: undefined,
        age: undefined
      },
      textMap: {
        create: '新增成员信息',
        update: '编辑成员信息'
      },
      dialogStatus: '',
      genderOptions: [{
        value: 0,
        label: '男'
      }, {
        value: 1,
        label: '女'
      }]
    }
  },
  components: {
    tableComp
  },
  created: function() {
    this.top = [{
      type: 'input',
      placeholder: '登录名',
      name: 'loginName'
    }, {
      type: 'select',
      placeholder: '性别',
      name: 'gender',
      options: [
        { label: '男', value: 0 },
        { label: '女', value: 1 }
      ]
    }, {
      type: 'button',
      placeholder: '搜索',
      func: this.getList
    }, {
      type: 'button',
      placeholder: '清空',
      func: this.resetQuery
    }, {
      type: 'button',
      placeholder: '新增',
      func: this.addDialog
    }]
    this.table = [{
      prop: 'loginName',
      label: '登录名'
    }, {
      prop: 'name',
      label: '姓名'
    }, {
      prop: 'genderName',
      label: '性别'
      // formatter:this.genderFormat
    }, {
      prop: 'age',
      label: '年龄'
    }, {
      label: '操作',
      operations: [{
        label: '删除',
        func: this.delete_
      }, {
        label: '编辑',
        func: this.editDialog
      }]
    }]
    this.bottom = {
      pagesize: [20, 50, 100]
    }
    this.listQuery = {
      page: 1,
      rows: 20,
      loginName: undefined,
      gender: undefined
    }
    this.list = []
    this.total = undefined
    this.listLoading = undefined
    this.getList()
  },
  methods: {
    resetruleForm() {
      for (var i in this.ruleForm) {
        this.ruleForm[i] = undefined
      }
    },
    getList() {
      console.log(this.listQuery)

      this.listLoading = false
      // list(this.listQuery).then((response) => {
      this.$ajax({
        url: 'http://localhost:8089/assistant/member/list',
        method: 'get',
        async: false,
        params: this.listQuery
      }).then((response) => {
        this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = true
        // console.log(this.list)
      })
    },
    resetQuery() {
      for (var p in this.listQuery) {
        if (p !== 'page' && p !== 'rows') {
          this.listQuery[p] = undefined
        }
      }
      this.getList()
    },
    addDialog() {
      this.resetruleForm()
      this.detailArray = []
      this.dialogVisible = true
      this.dialogStatus = 'create'
    },
    save() {
      this.$ajax({
        url: 'http://localhost/member/save',
        method: 'post',
        data: qs.stringify(this.ruleForm)
      }).then((res) => {
        this.$message({ message: res.data.msg, type: 'success' })
        this.dialogVisible = false
        this.getList()
      })
    },
    editDialog(row) {
      this.dialogVisible = true
      this.ruleForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      console.log(row)
      console.log(this.ruleForm)
    },
    update() {
      console.log(qs.stringify(this.ruleForm))
      this.$ajax({
        url: 'http://localhost/member/save',
        method: 'post',
        data: qs.stringify(this.ruleForm)
      }).then((res) => {
        this.$message({ message: res.data.msg, type: 'success' })
        this.dialogVisible = false
        this.getList()
      })
    },
    delete_(row) {
      var id = row.id
      this.$ajax({
        url: 'http://localhost/member/softDelete',
        method: 'delete',
        params: { id: id }
      }).then(response => {
        this.getList()
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    addDetail() {
      console.log('1111')
      this.detailArray.push({ name: '', amount: '', price: '', total: '' })
    },
    genderFormat(row, column, cellValue) {
      if (row.gender === 0) {
        row.genderName = '男'
      } else {
        row.genderName = '女'
      }
      // console.log(row)
    }
  }
}
</script>
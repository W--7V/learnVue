<template lang="html" style="float:right">
  <el-menu default-active="1" id="nav-menu" theme="dark">
    <div class="logo">
      <router-link to="/">
        <!--<img src="../../assets/images/logo.svg" />-->
      </router-link>
    </div>

    <el-menu-item index="1"><router-link to="/" class="nav-link"><i class="el-icon-message"></i>首页</router-link></el-menu-item>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>可视化数据</template>
      <el-menu-item index="2-1"><router-link to="/page1" class="nav-link">折线</router-link></el-menu-item>
      <el-menu-item index="2-2"><router-link to="/page2" class="nav-link">混合图</router-link></el-menu-item>
      <el-menu-item index="2-3"><router-link to="/page2" class="nav-link">扇形图</router-link></el-menu-item>
      <el-menu-item index="2-4"><router-link to="/table" class="nav-link">Table</router-link></el-menu-item>
    </el-submenu>
    <el-menu-item index="3"><router-link to="/page3" class="nav-link"><i class="el-icon-message"></i>仓储管理</router-link></el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name:'NavMenu',
  props:['items'],
  created:function(){
    console.log(this.items)
  }
}
</script>

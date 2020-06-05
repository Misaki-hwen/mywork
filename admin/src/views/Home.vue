<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>人员架构
          </template>
        <el-menu-item-group>
          <template slot="title">人员角色</template>
          <el-menu-item index="/role/create">新建角色</el-menu-item>
          <el-menu-item index="/role/createemployees">新建人员</el-menu-item>
          <el-menu-item index="/role/manage">人员分配</el-menu-item>
          <el-menu-item index="/role/list">角色列表</el-menu-item>
          <el-menu-item index="/role/employees">人员列表</el-menu-item>
          <el-menu-item index="/role/managelist">分配列表</el-menu-item>
          <!-- <el-menu-item index="/role/save">111</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
       <router-view :key="$route.path"></router-view>
        
    </el-main>
  </el-container>
</el-container>
</template>


<script>
export default {
  name: 'Home',
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
}
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>


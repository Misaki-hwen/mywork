<template>
  <div >
    <h1>角色列表</h1>
    <el-table :data="roles">
      <!-- <el-table-column prop="_id" label="ID">
      </el-table-column> -->
      <!-- <el-table-column prop="parent.name" label="上级分类" >
      </el-table-column>
      <el-table-column prop="user.name" label="员工" >
      </el-table-column> -->
      <el-table-column prop="name" label="名称" >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/role/createemployees/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roles:[]
    }
  },
  methods: {
    async fetch(){
      let res = await this.$http.get('/getemployee');
      // console.log(res);
      this.roles = res.data.data
    },
    remove(row){
      console.log(row);
      this.$confirm(`确定是否要删除角色“${row.name}”?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await this.$http.delete(`/deleteemployee/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        })
    }
  },
  created() {
    this.fetch();
  },
}
</script>


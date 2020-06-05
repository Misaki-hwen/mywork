<template>
  <div >
    <h1>{{id?'编辑':'新建'}}人员</h1>
    <el-form label-width='120px' @submit.native.prevent="save">
      <el-form-item label='名称'>
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props:{
    id:{}
  },
  data() {
    return {
      model:{},
      parents:[],
      employees:[],
      // options: [],
      // list:[],
      // loading: false,
    }
  },
  methods: {
    async save(){
      if(this.id){
        await this.$http.put(`/addemployee/${this.id}`,this.model);
      }else{
        await this.$http.post('/addemployee',this.model);
      }
      
      this.$router.push('/role/employees');
      this.$message({
        type:'success',
        message:'保存成功'
      })
      
    },
    async fetch(){
      const res = await this.$http.get(`/getbyidemployee/${this.id}`);
      this.model = res.data.data;
    },
    async fetchParents(){
      const res = await this.$http.get('/get')
      this.parents = res.data.data
    },
    async fetchEmployees(){
      const res = await this.$http.get('/getemployee')
      this.employees = res.data.data;
      console.log(this.employees);
      this.employees.filter(item => {
        if(item.name){
          return this.list.push( { value: item._id, label: item.name })
        } 
      });
    }
  },
  created() {
    //编辑页面有id属性时候查找id对应的数据
    this.id && this.fetch();
    this.fetchParents();
    this.fetchEmployees();
  },
}
</script>
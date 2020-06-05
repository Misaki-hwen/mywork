<template>
  <div >
    <h1>{{id?'编辑':'新建'}}人员</h1>
    <el-form label-width='120px' @submit.native.prevent="save">
      <el-form-item label='上级分类'>
        <el-select v-model="model.roleName">
          <el-option 
          v-for="item in parents"
          :key="item._id"
          :label="item.name"
          :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='名称'>
        <el-select 
        v-model="model.user"
         multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading">
          <el-option
          v-for="(item,i) in employees"
          :key="i"
          :label="item.name"
          :value="item._id"></el-option>
        </el-select>
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
      options: [],
      list:[],
      loading: false,
    }
  },
  methods: {
    async save(){
    
      if(this.id){
        await this.$http.post(`/addtomiddlewarebyid`,{id:this.id,user:this.model.user});
        // await this.$http.post(`/addtomiddlewarebyidya/${this.id}`,this.model);
      }else{
        await this.$http.post('/addtomiddleware',this.model);
      }
      
      this.$router.push('/role/managelist');
      this.$message({
        type:'success',
        message:'保存成功'
      })
      
    },
    async fetch(){
      const res = await this.$http.get(`/getmanagebyid/${this.id}`);
    
      this.model = res.data.data;
    },
    async fetchParents(){
      const res = await this.$http.get('/get')
      this.parents = res.data.data
    },
    async fetchEmployees(){
      const res = await this.$http.get('/getemployee')
      this.employees = res.data.data;
      // console.log(this.employees);
      // this.employees.filter(item => {
      //   if(item.name){
      //     return this.list.push( { value: item._id, label: item.name })
      //   } 
      // });
    },
    remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.employees.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
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
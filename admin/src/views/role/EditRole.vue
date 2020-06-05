<template>
  <div >
    <h1>{{id?'编辑':'新建'}}角色</h1>
    <el-form label-width='120px' @submit.native.prevent="save">
      <!-- <el-form-item label='上级分类'>
        <el-select v-model="model.parent">
          <el-option 
          v-for="item in parents" 
          :key="item._id"
          :label="item.name"
          :value="item._id"></el-option>
        </el-select>
      </el-form-item> -->
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
      parents:[]
    }
  },
  methods: {
    async save(){
      if(this.id){
        // await this.$http.put(`/add/${this.id}`,this.model);
        await this.$http.post('/addbyid',{ _id:this.id, name:this.model.name });
        
      }else{
        await this.$http.post('/add',this.model);
      }
      
      this.$router.push('/role/list');
      this.$message({
        type:'success',
        message:'保存成功'
      })
      
    },
    async fetch(){
      // const res = await this.$http.get(`/manage/role/getbyid/${this.id}`);
      const res = await this.$http.get('/getbyid',{params:{_id:this.id}});
      this.model = res.data.data;
    },
    async fetchParents(){
      const res = await this.$http.get('get');
      this.parents = res.data.data;
    }
  },
  created() {
    //编辑页面有id属性时候查找id对应的数据
    this.id && this.fetch();
    this.fetchParents();
  },
}
</script>
<template>
  <div v-loading="loading">
    <el-form class="form" :model="formData" ref="form" label-width="120px" :rules="rules">
      
      <div v-show="page==1">
        <el-form-item label="年度" prop="year">
          <el-date-picker
            :picker-options="pickerOptions"
            class="dataPicker"
            v-model="year"
            type="year"
            value-format="yyyy"
            placeholder="请选择年度">
          </el-date-picker>
        </el-form-item>
      </div>

      <div v-show="page==2">
        <el-form-item label="培训类型" prop="type">
          <el-input v-model="formData.type" />
        </el-form-item>
        <el-form-item label="培训学时" prop="hours">
          <el-input v-model="formData.hours" />
        </el-form-item>
        <el-form-item label="参与部门" prop="partakeDepartment">
          <el-input v-model="formData.partakeDepartment" />
        </el-form-item>
        <el-form-item label="参与人员" prop="personnel">
          <el-input v-model="formData.personnel" />
        </el-form-item>
        <el-form-item label="培训内容" prop="content">
          <el-input type="textarea" v-model="formData.content" />
        </el-form-item>
        <el-form-item label="组织部门" prop="organizeDepartment">
          <el-input v-model="formData.organizeDepartment" />
        </el-form-item>
        <el-form-item label="授课人" prop="lecturer">
          <el-input v-model="formData.lecturer" />
        </el-form-item>
        <el-form-item label="实施日期" prop="implementData">
          <el-date-picker
            class="dataPicker"
            v-model="formData.implementData"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form>

    <el-form :model="formData">
      <div v-show="page==3">
        <el-form-item label="用人单位职业卫生培训计划" prop="annex_plan">
          <el-upload
            action=""
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove1"
            :auto-upload="false"
            multiple
            :on-change="fileChange1"
            :file-list="formData['annex_plan']"
            >
            <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="用人单位负责人、职业卫生管理人员职业卫生培训证明" prop="annex_prove">
          <el-upload
            action=""
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove2"
            :auto-upload="false"
            multiple
            :on-change="fileChange2"
            :file-list="formData['annex_prove']"
            >
            <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="年度职业卫生培训工作总结" prop="annex_summary">
          <el-upload
            action=""
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove3"
            :auto-upload="false"
            multiple
            :on-change="fileChange3"
            :file-list="formData['annex_summary']"
            >
            <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="年度职业卫生培训资料" prop="annex_data">
          <el-upload
            action=""
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove4"
            :auto-upload="false"
            multiple
            :on-change="fileChange4"
            :file-list="formData['annex_data']"
            >
            <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>

    <div class="btnBlock">
      <el-button v-show="page>1" @click="page-=1">上一页</el-button>
      <el-button v-show="page<3" @click="page+=1">下一页</el-button>
      <el-button v-show="page==3" @click="submit">提交</el-button>
    </div>
    
  </div>  
</template>

<script>
export default {
  props: ['formData', 'formType'],
  data() {
    return {
      page: 1,
      rules: {
        year: {required: true, message: '请输入年度'},
        type: {required: true, message: '请输入培训类型'},
        hours: {required: true, message: '请输入培训类型'},
        partakeDepartment: {required: true, message: '请输入培训类型'},
        personnel: {required: true, message: '请输入培训类型'},
        content: {required: true, message: '请输入培训类型'},
        organizeDepartment: {required: true, message: '请输入培训类型'},
        lecturer: {required: true, message: '请输入培训类型'},
        implementData: {required: true, message: '请输入培训类型'},
        annex: {required: true, message: '请输入培训类型'},
      },
      year:2010,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      fileList: {
        annex_prove: []
      },
      delFileList: [],
      loading: false
    }
  },
  methods: {
    async submit() {
      // console.log(Object.keys(this.formData))
      let newData = new FormData()
      let keys = Object.keys(this.formData)
      // console.log(this.formData)
      // 文件上传
      keys.forEach(item => {
        if(item == 'annex_plan' || item == 'annex_prove' || item == 'annex_summary' || item == 'annex_data') {
          // console.log(item)
          this.formData[item].forEach((val, i) => {
            console.log(val.raw != undefined)
            newData.append(item + '_' + i, (val.raw != undefined) ? val.raw : JSON.stringify(val))
          })
        } else {
          newData.append(item, this.formData[item])
          
        }
      })
      this.$refs.form.validate(async valid => {
        if(valid) {
          this.loading = true
          if (this.formType == 'add') {
            let res = await this.axios.post('/propagate', newData, {
              headers: { 'content-type': 'multipart/form-data' }
            })
            if(res.data.status == 200) {
              this.loading = false
              // 如果后台响应成功，则触发事件关闭弹窗
              this.$emit('handleSuccess', true)
            }
          } else { // 修改表单单条数据
            newData.append('delFileList', JSON.stringify(this.delFileList))
            // console.log(this.formData)
            let res = await this.axios.post('/propagate/'+this.formData._id, newData)
            if(res.data.status == 200) {
              this.loading = false
              // 如果后台响应成功，则触发事件关闭弹窗
              this.$emit('handleSuccess', true)
            }
          }
        } else {
          this.formData.year ? this.page = 2 : this.page = 1
          this.$message.error('请检查表单')
        }
      })
    },
    handleRemove1(file, fileList) {
      this.formData.annex_plan = fileList
      if(file._id) {
        this.delFileList.push(file)
      }
    },
    handleRemove2(file, fileList) {
      this.formData.annex_prove = fileList
      if(file._id) {
        this.delFileList.push(file)
      }
    },
    handleRemove3(file, fileList) {
      this.formData.annex_summary = fileList
      if(file._id) {
        this.delFileList.push(file)
      }
    },
    handleRemove4(file, fileList) {
      this.formData.annex_data = fileList
      if(file._id) {
        this.delFileList.push(file)
      }
    },
    handlePreview(file) {
      let extendName = file.name.split('.')[1]
      if(extendName == 'jpg' || extendName == 'png' || extendName == 'mp4' || extendName == 'pdf') {
        let a = document.createElement('a')
        a.href = file.raw ? URL.createObjectURL(file.raw) : 'http://127.0.0.1:7001/public/uploads/' + file.staticName
        a.target = '_blank'
        a.click()
      }
    },
    fileChange1(file, FileList) {
      this.formData.annex_plan = FileList
    },
    fileChange2(file, FileList) {
      this.formData.annex_prove = FileList
    },
    fileChange3(file, FileList) {
      this.formData.annex_summary = FileList
    },
    fileChange4(file, FileList) {
      this.formData.annex_data = FileList
    },
  },
}
</script>

<style lang="scss" scoped>
  .form {
    width: 100%;
    text-align: center;
  }
  .dataPicker {
    width: 100%
  }
  .btnBlock {
    text-align: center;
  }
</style>
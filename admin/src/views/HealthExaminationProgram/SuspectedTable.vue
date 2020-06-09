<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>疑似职业病患者表</span>
        <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">
            上一页
        </el-button>
    </div>
    <!-- 附件上传 -->
    <el-form>
        <el-form-item prop="uploadSingleFile" :inline="false" label="附件上传区:">
        <el-upload multiple :on-preview="handlePictureCardPreview" action="" :file-list="fileList" :on-change='onChangeReport' :auto-upload="false" :on-remove="onRemoveReport">
            <el-button size="small" type="primary">体检报告（上传）</el-button>
            <div slot="tip" class="el-upload__tip">只能上传图片、pdf类型文件</div>
        </el-upload>
        <el-dialog :visible.sync="showDialogReport">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div class="el-form-item__error">{{reportFileErr}}</div>
    </el-form-item>
    </el-form>
    <el-divider></el-divider>

    <!-- 模板下载 -->
    <div class="template">
        <el-popover placement="right" trigger="hover">
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
            <p></p>
            <el-link @click.prevent="add()">手动录入</el-link>
            <el-button slot="reference" type='primary' size='mini'>新建</el-button>
        </el-popover>
        <el-button size="mini" type="primary" plain="" @click.stop='handleDownload' style="margin-left:16px;">下载模板</el-button>
    </div>
    <el-divider></el-divider>

    <!-- 表单 -->
    <el-table :data="SuspectedTable" style="width: 100%">
        <el-table-column prop="num" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
                {{scope.row.sex = 0 ? '男' : '女'}}
            </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="position" label="岗位">
        </el-table-column>
        <el-table-column prop="factorOfDanger" label="危害因素">
        </el-table-column>
        <el-table-column prop="illness" label="可能导致的职业病">
        </el-table-column>
        <el-table-column prop="CwithO" label="结论与意见">
        </el-table-column>
        <el-table-column prop="status" label="落实情况">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="update(scope)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="del(scope)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <div class="corss-line"></div>
    <div class="buttons">
        <el-button @click.prevent="add()">新增</el-button>
        <el-button type="primary" @click.prevent="submit()">提交</el-button>
        <el-button type="warning" @click.prevent="reset()">重置</el-button>
    </div>

    <!-- 1.新增信息对话框 -->
    <el-dialog title="新增数据" :visible.sync="showAddDialog">
        <el-form :model="form" label-position="left">
            <el-form-item label="序号:">
                <el-input v-model="form.num"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio label="0">男 </el-radio>
                    <el-radio label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄:">
                <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="岗位:">
                <el-input v-model="form.position"></el-input>
            </el-form-item>
            <el-form-item label="危害因素:">
                <el-input v-model="form.factorOfDanger"></el-input>
            </el-form-item>
            <el-form-item label="可能导致的职业病:">
                <el-input v-model="form.illness"></el-input>
            </el-form-item>
            <el-form-item label="结论与意见:">
                <el-input v-model="form.CwithO" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="落实情况:">
                <el-input v-model="form.status" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showAddDialog = false">取 消</el-button>
            <el-button type="primary" @click="saveInfoDialog()">保 存</el-button>
        </div>
    </el-dialog>
    <!-- 2.更新信息对话框 -->
    <el-dialog title="修改数据" :visible.sync="showUpdateDialog">
        <el-form :model="form" label-position="left">
            <el-form-item label="序号:">
                <el-input v-model="form.num"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio label="0">男 </el-radio>
                    <el-radio label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄:">
                <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="岗位:">
                <el-input v-model="form.position"></el-input>
            </el-form-item>
            <el-form-item label="危害因素:">
                <el-input v-model="form.factorOfDanger"></el-input>
            </el-form-item>
            <el-form-item label="可能导致的职业病:">
                <el-input v-model="form.illness"></el-input>
            </el-form-item>
            <el-form-item label="结论与意见:">
                <el-input v-model="form.CwithO" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="落实情况:">
                <el-input v-model="form.status" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showUpdateDialog = false">取 消</el-button>
            <el-button type="primary" @click="updateInfoDialog()">保 存</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index2.vue'
export default {
    components: {
        UploadExcelComponent
    },
    data() {
        return {
            form: {},
            SuspectedTable: [],
            showAddDialog: false,
            showUpdateDialog: false,
            total: -1,
            pagenum: 1,
            pagesize: 2,
            fileList:[],
            reportFileErr:'',
            showDialogReport: false,
            dialogImageUrl: '',
            originalFile:[],
            updateIndex:'',
            formId : '',
        }
    },
    methods: {
        // 附件上传
        async onRemoveReport(file, filelist) {
            console.log(file)
            console.log(filelist)
            this.$confirm(`确定移除“${file.name}”?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let str = file.url.split('public/');
                await this.$http.post('/deleteInllnessFile', {
                    _id: this.formId,
                    file: str[1]
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
        },
        onChangeReport(file, filelist) {
            console.log(file);
            this.fileList = filelist
            this.fileList = filelist
            if (file.raw.type === 'image/jpg' || file.raw.type === 'image/gif' || file.raw.type === 'image/bmp' || file.raw.type ===
                'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'application/pdf') {
                this.approvalFileErr = ''
            } else {
                this.approvalFileErr = '请上传图片、pdf或word文件!'
            }
        },
        handlePictureCardPreview(file) {
            console.log(file)
            let fileSplite = file.name.split('.')
            if (fileSplite[fileSplite.length - 1] === 'pdf') {
                let a = document.createElement('a')
                a.href = file.raw ? URL.createObjectURL(file.raw) : file.url
                a.target = '_blank'
                a.click()
            } else {
                this.reportFileErr = file.raw ? URL.createObjectURL(file.raw) : file.url
                this.reportFileErr = true
            }
        },
        // 分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.fetchSuspectedTable()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.fetchSuspectedTable()
        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1
            if (isLt1M) {
                return true
            }
            this.$message({
                message: 'Please do not upload files larger than 1m in size.',
                type: 'warning'
            })
            return false
        },
        // 模板导入
        handleSuccess({
            results
        }) {
            results.map(item => {
                return this.SuspectedTable.push({
                    num: item.序号,
                    name: item.姓名,
                    // sex: `${item.性别='男'?1:0} `,
                    age: item.年龄,
                    position: item.岗位,
                    factorOfDanger: item.危害因素,
                    illness: item.可能导致的职业病,
                    CwithO: item.结论与意见,
                    status: item.落实情况,
                })
            })
        },
        handleDownload() {
            let a = document.createElement('a')
            a.href = 'http://127.0.0.1:7001/public/excel/疑似职业病患者表.xlsx'
            a.click()
        },
        //表单
        add() {
            this.showAddDialog = true
        },
        async submit() {
            let params = new FormData()
            params.append('formData', JSON.stringify(this.SuspectedTable))
            params.append('companyId','人生无极限有限公司')
            this.fileList.forEach((item, i) => {
                item.raw && params.append('file' + i, item.raw)
            })
            params.append('originalFile',JSON.stringify(this.originalFile))
            this.$http.post('/insertSuspectInfo', params)
            this.fetchSuspectedTable();

        },
        async del(scope) {
            this.$confirm(`确定移除?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                this.SuspectedTable.splice(scope.$index,1)
            })
            
        },
        
        async saveInfoDialog() {
            let res = await this.$http.post('/addSuspectInfo', this.form)
            console.log(res);
            const {
                code,
                msg
            } = res.data
            if (code === 200) {
                this.$message.success(msg);
                this.showAddDialog = false;
                this.fetchSuspectedTable();
                this.form = {}
            }
        },
        async update(scope) {
            this.updateIndex = scope.$index;
            console.log(scope.row)
            this.form = scope.row
            if(scope.row.sex){
                let sex = scope.row.sex === '女' ? '1' : '0'
                this.form.sex = sex
            }
            console.log(this.form)
            this.showUpdateDialog = true

        },
        async updateInfoDialog() {
            this.SuspectedTable.splice(this.updateIndex,1,this.form)
            this.showUpdateDialog = false;
        },

        async fetchSuspectedTable() {
            let res = await this.$http.get('/findSuspectInfo')
            console.log(res)
            this.formId = res.data.data._id;
            this.SuspectedTable = res.data.data.formData;
            this.fileList = res.data.data.fileList.map(item => {
                    return {
                        name: item.name,
                        url: 'http://localhost:7001/public/' + item.webname
                    };
                })
            this.originalFile = res.data.data.fileList
        }
    },
    mounted() {
        this.fetchSuspectedTable()
    },
}
</script>

<style scoped>
.template {
    width: 50%;
    margin: 0;
    display: flex;
}

.clearfix {
    display: flex;
    align-items: center;
    position: relative;
}

.clearfix .el-button {
    position: absolute;
    right: 15px;
}
</style>

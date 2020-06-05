<template>
<el-card header="个人防护用品管理 " class="card-box">

    <el-form ref="uploadFile" label-width="150px" label-position="left" :model="form">
        <!-- 发票 -->
        <el-form-item prop="uploadSingleFile" :inline="false" label="发票上传区:">
            <el-upload :before-remove="beforeRemove" :on-preview="handlePictureCardPreview" action="" :file-list="form.invioceFile" :on-change='onChangeInvioce' :auto-upload="false" :on-remove="onRemoveInvoice">
                <el-button size="small" type="primary">采购发票（上传）</el-button>
                <div slot="tip" class="el-upload__tip">只能上传图片、pdf类型文件</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div class="el-form-item__error">{{approvalFileErr}}</div>
        </el-form-item>
        <!-- 三证 -->
        <el-form-item :before-remove="beforeRemove" prop="uploadMulFile" :inline="false" label="三证上传区:">
            <el-upload :on-preview="handlePictureCardPreview" action="" :file-list="form.certificationFile" :on-change='onChangecertification' :auto-upload="false" :on-remove="onRemovecertification">
                <el-button size="small" type="primary">三证（上传）</el-button>
                <div slot="tip" class="el-upload__tip">只能上传图片、pdf类型文件</div>
            </el-upload>
            <div class="el-form-item__error">{{approvalFileErr}}</div>
        </el-form-item>
        <el-divider></el-divider>
        <div class="template">
            <el-button size="small" type="primary" plain="" @click.stop='handleDownload'>下载模板</el-button>
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        </div>
        <el-divider></el-divider>
        <!-- 表单 -->
        <el-form-item label="表单填写区">
            <el-table :data="form.tableData" ref="table" border style="width: 100%">
                <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
                <el-table-column label="车间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.studio"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="用品名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.pname"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="型号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sku"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.quantity"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="领取人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.receiveMan"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="领取日期">
                    <template slot-scope="scope">
                        <div class="block">
                            <el-date-picker v-model="scope.row.date" type="date" placeholder="选择日期时间" size="large">
                            </el-date-picker>
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="防护用品供应商单位" width="200">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.companyName"></el-input>
                    </template>
                </el-table-column> -->
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click.prevent="delData(scope)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
    </el-form>
    <div class="corss-line"></div>
    <div class="buttons">
        <el-button @click.prevent="additem()">新增</el-button>
        <el-button type="primary" @click.prevent="submitform()">提交</el-button>
        <el-button type="warning" @click.prevent="reset()">重置</el-button>
    </div>
</el-card>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
export default {
    components: {
        UploadExcelComponent
    },
    data() {
        return {
            certificationFile:[],
            invioceFile:[],
            form: {
                tableData: [],
                invioceFile: [],
                certificationFile: [],
            },
            fileList: [],
            approvalFileErr: '',
            oldApproval: [],
            formId: '',
            dialogVisible: false,
            dialogImageUrl: ''

        }
    },
    methods: {
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
        handleSuccess({
            results,
            header
        }) { //导入excel表格返回的值
            console.log(results)

            let params = results.map(item => {
                return {
                    studio: item.车间,
                    pname: item.用品名称,
                    sku: item.型号,
                    quantity: item.数量,
                    date: item.领取日期,
                    receiveMan: item.领取人,
                    // companyName: item.防护用品单位
                }
            })
            console.log(params);
            this.form.tableData = params
            this.tableHeader = header
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
                this.dialogImageUrl = file.raw ? URL.createObjectURL(file.raw) : file.url
                this.dialogVisible = true
            }
        },
        onChangeInvioce(file, filelist) {
            console.log(file);
            this.fileList = filelist
            this.form.invioceFile = filelist
            console.log(this.form.invioceFile)
            if (file.raw.type === 'image/jpg' || file.raw.type === 'image/gif' || file.raw.type === 'image/bmp' || file.raw.type ===
                'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'application/pdf') {
                this.approvalFileErr = ''
            } else {
                this.approvalFileErr = '请上传图片、pdf或word文件!'
            }
        },
        onChangecertification(file, filelist) {
            console.log(file);
            this.fileList = filelist
            this.form.certificationFile = filelist
            console.log(this.form.certificationFile)
            if (file.raw.type === 'image/jpg' || file.raw.type === 'image/gif' || file.raw.type === 'image/bmp' || file.raw.type ===
                'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'application/pdf') {
                this.approvalFileErr = ''
            } else {
                this.approvalFileErr = '请上传图片、pdf或word文件!'
            }
        },
        async onRemoveInvoice(file, filelist) {
            console.log(file)
            console.log(filelist)
            this.$confirm(`确定移除“${file.name}”?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let str = file.url.split('public/');
                await this.$http.post('/deletefile', {
                    _id: this.formId,
                    invoice: str[1]
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
        },
        async onRemovecertification(file, filelist) {
            console.log(file)
            console.log(filelist);
            this.$confirm(`确定移除“${file.name}”?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let str = file.url.split('public/');
                await this.$http.post('/deletefile', {
                    _id: this.formId,
                    certifications: str[1]
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
        },
        beforeRemove(file) {
            this.$confirm(`确定移除 ${ file.name }？`);
            // console.log(fileList)

        },
        handleDownload() {
            let a = document.createElement('a')
            a.href = 'http://127.0.0.1:7001/public/excel/防护用品模板.xlsx'
            a.click()
        },
        // 增加行
        additem() {
            this.form.tableData.push({
                studio: '',
                pname: '',
                sku: '',
                quantity: '',
                date: '',
                receiveMan: '',
                // companyName: '',
            });
        },
        async delData(scope) {
            console.log(scope.$index)
            this.$confirm(`确定是否要删除数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(async () => {
                    // await this.$http.post('/deletedefendproduct', {
                    //     _id: scope.row._id,
                    //     formId: this.formId
                    // })
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                    this.form.tableData.splice(scope.$index, 1)

                })
        },
        async submitform() {
            let params = new FormData()
            params.append('formData', JSON.stringify(this.form.tableData))
            params.append('companyId', '人生无极限有限公司')
            // params.append('invoice', this.form.invioceFile[0].raw)
            this.form.invioceFile.forEach((item, i) => {
                item.raw && params.append('invoice' + i, item.raw)
            })
            
            this.form.certificationFile.forEach((item, i) => {
                item.raw && params.append('certification' + i, item.raw)
            })
            params.append('invioceFile',JSON.stringify(this.invioceFile))
            params.append('certificationFile',JSON.stringify(this.certificationFile))
            if (this.form) {
                let res = await this.$http.post('/upload', params)
                console.log(res)
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                });
            } else {
                this.$message({
                    type: 'warning',
                    message: '请填写完整再提交!'
                });
            }
        },
        async reset() {
            this.form = {
                tableData: [],
                invioceFile: [],
                certificationFile: [],
            }
        },
        async fetch() {
            const res = await this.$http.get('/getdefendproduct')
            if (res.data.data) {
                this.formId = res.data.data._id;
                this.form.tableData = res.data.data.formData;
                this.form.certificationFile = res.data.data.certifications.map(item => {
                    return {
                        name: item.name,
                        url: 'http://localhost:7001/public/' + item.webname
                    };
                })
                this.form.invioceFile = res.data.data.invoice.map(item => {
                    return {
                        name: item.name,
                        url: 'http://localhost:7001/public/' + item.webname
                    };
                })
                this.certificationFile = res.data.data.certifications
                this.invioceFile = res.data.data.invoice
                // this.form.invioceFile.push({
                //     name: res.data.data.invoice.name,
                //     url: 'http://localhost:7001/public/' + res.data.data.invoice.webname
                // })
            }
            console.log(res)
        },
    },
    mounted() {
        this.fetch();
    },
}
</script>

<style>
body .el-table th.gutter {
    display: table-cell !important
}
.el-input__inner{
    width:83%;
}
.box-card {
    width: 90%;
    height: 100%;
    margin: 0 auto;
}

.font-small {
    font-size: 14px;
    color: rgb(200, 208, 214);
    margin: 0 auto;
    text-align: center;
}

.corss-line {
    margin-top: 30px;
    border: 1px solid rgb(200, 208, 214);
}

.buttons {
    margin-top: 30px;
    text-align: center;
}

.uploadImage {
    width: 90%;
}

.template {
    display: flex;
}
</style>

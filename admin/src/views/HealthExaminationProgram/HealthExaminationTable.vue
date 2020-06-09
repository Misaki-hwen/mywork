<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>职业健康检查结果汇总表</span>
        <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">
            上一页
        </el-button>
    </div>
    <div class="template">
        <!-- <el-button size="mini" style="margin-left:16px;" @click.prevent="add">新增</el-button> -->
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
    <el-table :data="HealthExaminationTable" style="width: 100%">
        <el-table-column prop="checkDate" label="检查日期">
            <template slot-scope="scope">
                {{scope.row.checkDate | fmtdate}}
            </template>
        </el-table-column>
        <el-table-column prop="organization" label="检查机构">
        </el-table-column>
        <el-table-column prop="checkType" label="体检种类">
            <template  slot-scope="scope">
                {{scope.row.checkType == 0 ? '上岗前': scope.row.checkType == 1 ? '在岗期间' : '离岗时'}}
            </template>
        </el-table-column>
        <el-table-column prop="shouldCheckNum" label="应检人数">
        </el-table-column>
        <el-table-column prop="actuallNum" label="实检人数">
        </el-table-column>
        <el-table-column label="检查结果（人数）">
            <el-table-column prop="normal" label="未见异常" width="120">
            </el-table-column>
            <el-table-column prop="re_examination" label="复查" width="120">
            </el-table-column>
            <el-table-column prop="suspected" label="疑似" width="120">
            </el-table-column>
            <el-table-column prop="forbid" label="禁忌症" width="120">
            </el-table-column>
            <el-table-column prop="otherDisease" label="其他疾患" width="120">
            </el-table-column>
        </el-table-column>
        <el-table-column prop="comment" label="备注">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="update(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row)"></el-button>
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
            <el-form-item label="检查时间:">
                <el-date-picker size="large" v-model="form.checkDate" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="检查机构:">
                <el-input v-model="form.organization"></el-input>
            </el-form-item>
            <el-form-item label="体检种类">
                <el-radio-group v-model="form.checkType">
                    <el-radio label="0">上岗前 </el-radio>
                    <el-radio label="1">在岗期间</el-radio>
                    <el-radio label="2">离岗时</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="应检人数:">
                <el-input v-model="form.shouldCheckNum"></el-input>
            </el-form-item>
            <el-form-item label="实检人数:">
                <el-input v-model="form.actuallNum"></el-input>
            </el-form-item>
            <el-form-item label="未见异常人数:">
                <el-input v-model="form.normal"></el-input>
            </el-form-item>
            <el-form-item label="复查人数:">
                <el-input v-model="form.re_examination"></el-input>
            </el-form-item>
            <el-form-item label="疑似人数:">
                <el-input v-model="form.suspected"></el-input>
            </el-form-item>
            <el-form-item label="禁忌症人数:">
                <el-input v-model="form.forbid"></el-input>
            </el-form-item>
            <el-form-item label="其他疾患人数:">
                <el-input v-model="form.otherDisease"></el-input>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input v-model="form.comment" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showAddDialog = false">取 消</el-button>
            <el-button type="primary" @click="saveInfoDialog()">保 存</el-button>
        </div>
    </el-dialog>
    <!-- 2.更新信息对话框 -->
    <el-dialog title="更新数据" :visible.sync="showUpdateDialog">
        <el-form :model="form" label-position="left">
            <el-form-item label="检查时间:">
                <el-date-picker size="large" v-model="form.checkDate" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="检查机构:">
                <el-input v-model="form.organization"></el-input>
            </el-form-item>
            <el-form-item label="体检种类">
                <el-radio-group v-model="form.checkType">
                    <el-radio label="0">上岗前 </el-radio>
                    <el-radio label="1">在岗期间</el-radio>
                    <el-radio label="2">离岗时</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="应检人数:">
                <el-input v-model="form.shouldCheckNum"></el-input>
            </el-form-item>
            <el-form-item label="实检人数:">
                <el-input v-model="form.actuallNum"></el-input>
            </el-form-item>
            <el-form-item label="未见异常人数:">
                <el-input v-model="form.normal"></el-input>
            </el-form-item>
            <el-form-item label="复查人数:">
                <el-input v-model="form.re_examination"></el-input>
            </el-form-item>
            <el-form-item label="疑似人数:">
                <el-input v-model="form.suspected"></el-input>
            </el-form-item>
            <el-form-item label="禁忌症人数:">
                <el-input v-model="form.forbid"></el-input>
            </el-form-item>
            <el-form-item label="其他疾患人数:">
                <el-input v-model="form.otherDisease"></el-input>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input v-model="form.comment" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
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
            HealthExaminationTable: [],
            showAddDialog: false,
            showUpdateDialog: false,
            total: -1,
            pagenum: 1,
            pagesize: 2,
        }
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.fetchHealthCheckTable()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.fetchHealthCheckTable()
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
        handleSuccess({
            results
        }) {
            this.HealthExaminationTable = []
            results.map(item => {
                return this.HealthExaminationTable.push({
                    checkDate: item.检查日期,
                    organization: item.检查机构,
                    checkType: item.体检种类,
                    shouldCheckNum: item.应检人数,
                    actuallNum: item.实检人数,
                    normal: item.未见异常,
                    re_examination: item.复查,
                    suspected: item.疑似,
                    forbid: item.禁忌症,
                    otherDisease: item.其他疾患,
                    comment: item.备注,
                })
            })
        },
        handleDownload() {
            let a = document.createElement('a')
            a.href = 'http://127.0.0.1:7001/public/excel/职业健康检查结果汇总表.xlsx'
            a.click()
        },
        add() {
            this.showAddDialog = true
        },
        async submit() {
            await this.$http.post('/updateManyCheckInfo', {
                params: this.HealthExaminationTable
            })
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            this.fetchHealthCheckTable();

        },
        async del(row) {

            this.$confirm(`确定移除?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.post('/deleteCheckInfo', {
                    _id: row._id
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetchHealthCheckTable();
            })

        },
        async update(row) {
            this.form = row
            this.showUpdateDialog = true
        },
        async saveInfoDialog() {
            let res = await this.$http.post('/addCheckInfo', this.form)
            console.log(res);
            const {
                code,
                msg
            } = res.data
            if (code === 200) {
                this.$message.success(msg);
                this.showAddDialog = false;
                this.fetchHealthCheckTable();
                this.form = {}
            }
        },
        async updateInfoDialog() {
            let res = await this.$http.post('/updateCheckInfo', this.form)
            console.log(res);
            const {
                code,
                msg
            } = res.data
            if (code === 200) {
                this.$message.success(msg);
                this.showUpdateDialog = false;
                this.fetchHealthCheckTable();
            }
        },

        async fetchHealthCheckTable() {
            // let params = {
            //     pagesize:this.pagesize,
            //     pagenum:this.pagenum
            // }
            let res = await this.$http.get('/getCheckInfo')
            console.log(res)
            this.HealthExaminationTable = res.data.data;
        }
    },
    mounted() {
        this.fetchHealthCheckTable()
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

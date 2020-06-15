<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>职业病危害事故报告和处理记录</span>
        <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">
            上一页
        </el-button>
    </div>
    <div class="tableHeader">
        <div class="template">
            <el-popover placement="right" trigger="hover">
                <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                <p></p>
                <el-link @click.prevent="add()">手动录入</el-link>
                <el-button slot="reference" type='primary' size='mini'>新建</el-button>
            </el-popover>
            <el-button size="mini" type="primary" plain="" @click.stop='handleDownload' style="margin-left:16px;">下载模板</el-button>
        </div>
        <div style="float:right">
            <el-select size="mini" v-model="selectYear" placeholder="请选择" @change="chooseYear">
                <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>

    <el-divider></el-divider>

    <!-- 表单 -->
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="year" label="年份">
        </el-table-column>
        <el-table-column prop="company" label="企业名称">
        </el-table-column>
        <el-table-column prop="principal" label="法人">
        </el-table-column>
        <el-table-column prop="accidentReport" label="事故报告">
        </el-table-column>
        <el-table-column prop="contact" label="联系电话">
        </el-table-column>
        <el-table-column prop="takeplace" label="发生时间">
        </el-table-column>
        <el-table-column prop="site" label="发生场所">
        </el-table-column>
        <el-table-column prop="postContent" label="岗位及工作内容">
        </el-table-column>
        <el-table-column prop="contactPeople" label="接触人数">
        </el-table-column>
        <el-table-column prop="infected" label="发病人数">
        </el-table-column>
        <el-table-column prop="treated" label="送医院治疗人数">
        </el-table-column>
        <el-table-column prop="die" label="死亡人数">
        </el-table-column>
        <el-table-column prop="factorName" label="能产生职业病的有害因素名称">
        </el-table-column>
        <el-table-column prop="describe" label="事故经过简述">
        </el-table-column>
        <el-table-column prop="opinion" label="对事故原因和性质的初步认定意见">
        </el-table-column>
        <el-table-column prop="reportTime" label="报告时间">
        </el-table-column>
        <el-table-column label="操作" width="130">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="update(scope)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <div class="corss-line"></div>
    <div class="buttons">
        <el-button type="primary" @click.prevent="submit()">提交</el-button>
    </div>
    <!-- 1.新增信息对话框 -->
    <el-dialog title="新增数据" :visible.sync="showAddDialog">
        <el-form :model="form" label-position="left">
            <div v-show="page==1">
                <el-form-item label="年度" prop="year">
                    <el-date-picker class="dataPicker" v-model="form.year" type="year" value-format="yyyy" placeholder="请选择年度">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div v-show="page==2">
                <el-form-item label="企业名称:">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="法人:">
                    <el-input v-model="form.principal"></el-input>
                </el-form-item>
                <el-form-item label="事故报告:">
                    <el-input v-model="form.accidentReport"></el-input>
                </el-form-item>
                <el-form-item label="未见异常人数:">
                    <el-input v-model="form.normal"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="form.contact"></el-input>
                </el-form-item>
                <el-form-item label="发生时间:">
                    <el-input v-model="form.takeplace"></el-input>
                </el-form-item>
                <el-form-item label="发生场所:">
                    <el-input v-model="form.site"></el-input>
                </el-form-item>
                <el-form-item label="岗位及工作内容:">
                    <el-input v-model="form.postContent"></el-input>
                </el-form-item>
                <el-form-item label="接触人数:">
                    <el-input v-model="form.contactPeople"></el-input>
                </el-form-item>
                <el-form-item label="发病人数:">
                    <el-input v-model="form.infected"></el-input>
                </el-form-item>
                <el-form-item label="送医院治疗人数:">
                    <el-input v-model="form.treated"></el-input>
                </el-form-item>
                <el-form-item label="死亡人数:">
                    <el-input v-model="form.die"></el-input>
                </el-form-item>
                <el-form-item label="能产生职业病的有害因素名称:">
                    <el-input v-model="form.factorName"></el-input>
                </el-form-item>
                <el-form-item label="事故经过简述:">
                    <el-input v-model="form.describe"></el-input>
                </el-form-item>
                <el-form-item label="对事故原因和性质的初步认定意见:">
                    <el-input v-model="form.opinion"></el-input>
                </el-form-item>
                <el-form-item label="报告时间:">
                    <el-date-picker size="large" v-model="form.checkDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button v-show="page>1" @click="page-=1">上一页</el-button>
            <el-button v-show="page<2" @click="page+=1">下一页</el-button>
            <el-button v-show="page==2" @click="saveInfoDialog()" type="primary">提交</el-button>
        </div>
    </el-dialog>
    <!-- 2.更新信息对话框 -->
    <el-dialog title="新增数据" :visible.sync="showUpdateDialog">
        <el-form :model="form" label-position="left">
            <div v-show="page==1">
                <el-form-item label="年度" prop="year">
                    <el-date-picker class="dataPicker" v-model="form.year" type="year" value-format="yyyy" placeholder="请选择年度">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div v-show="page==2">
                <el-form-item label="企业名称:">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="法人:">
                    <el-input v-model="form.principal"></el-input>
                </el-form-item>
                <el-form-item label="事故报告:">
                    <el-input v-model="form.accidentReport"></el-input>
                </el-form-item>
                <el-form-item label="未见异常人数:">
                    <el-input v-model="form.normal"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="form.contact"></el-input>
                </el-form-item>
                <el-form-item label="发生时间:">
                    <el-input v-model="form.takeplace"></el-input>
                </el-form-item>
                <el-form-item label="发生场所:">
                    <el-input v-model="form.site"></el-input>
                </el-form-item>
                <el-form-item label="岗位及工作内容:">
                    <el-input v-model="form.postContent"></el-input>
                </el-form-item>
                <el-form-item label="接触人数:">
                    <el-input v-model="form.contactPeople"></el-input>
                </el-form-item>
                <el-form-item label="发病人数:">
                    <el-input v-model="form.infected"></el-input>
                </el-form-item>
                <el-form-item label="送医院治疗人数:">
                    <el-input v-model="form.treated"></el-input>
                </el-form-item>
                <el-form-item label="死亡人数:">
                    <el-input v-model="form.die"></el-input>
                </el-form-item>
                <el-form-item label="能产生职业病的有害因素名称:">
                    <el-input v-model="form.factorName"></el-input>
                </el-form-item>
                <el-form-item label="事故经过简述:">
                    <el-input v-model="form.describe"></el-input>
                </el-form-item>
                <el-form-item label="对事故原因和性质的初步认定意见:">
                    <el-input v-model="form.opinion"></el-input>
                </el-form-item>
                <el-form-item label="报告时间:">
                    <el-date-picker size="large" v-model="form.checkDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button v-show="page>1" @click="page-=1">上一页</el-button>
            <el-button v-show="page<2" @click="page+=1">下一页</el-button>
            <el-button v-show="page==2" @click="updateInfoDialog()" type="primary">提交</el-button>
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
            page: 1,
            form: {},
            tableData: [],
            showAddDialog: false,
            showUpdateDialog: false,
            total: -1,
            pagenum: 1,
            pagesize: 2,
            selectYear: '',
            years: '',

        }
    },
    methods: {
        async chooseYear(val = '') {
            console.log(val)
            const res = await this.$http.get('/findReportYear', {
                params: {
                    year: this.selectYear
                }
            })
            console.log(res)
            this.tableData = []
            this.tableData = res.data.data

        },
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
            this.tableData = []
            results.map(item => {
                return this.tableData.push({
                    year: item.年份, // 年度
                    company: item.企业名称,
                    principal: item.法人,
                    accidentReport: item.事故报告,
                    contact: item.联系电话,
                    takeplace: item.发生时间,
                    site: item.发生场所,
                    postContent: item.岗位及工作内容,
                    contactPeople: item.接触人数,
                    infected: item.发病人数,
                    reated: item.送医院治疗人数,
                    die: item.死亡人数,
                    factorName: item.能产生职业病的有害因素名称,
                    describe: item.事故经过简述,
                    opinion: item.对事故原因和性质的初步认定意见,
                    reportTime: item.报告时间,
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
            await this.$http.post('/updateManyReportInfo', {
                params: this.tableData
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
                await this.$http.post('/deleteReportInfo', {
                    _id: row._id
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetchHealthCheckTable();
            })

        },
        async update(scope) {
            console.log(scope.row)
            this.form = scope.row
            this.showUpdateDialog = true
        },
        async saveInfoDialog() {
            let res = await this.$http.post('/addReportInfo', this.form)
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
            let res = await this.$http.post('/updateReportInfo', this.form)
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
        async getAllYears() {
            this.years = this.tableData.map(item => {
                return {
                    label: this.$moment(item.year).format('YYYY'),
                    value: item.year
                }
            })
            this.years.unshift({
                label: '全部',
                value: ''
            })
            console.log(this.years);
        },
        async fetchHealthCheckTable() {
            let res = await this.$http.get('/getReportInfo')
            console.log(res)
            this.tableData = res.data.data;
            console.log(this.tableData)
            let year = this.tableData.map(item => {
                return item.year
            })
            year.sort()

            function unique(year) {
                return Array.from(new Set(year))
            }
            console.log('==========')
            console.log(unique(year))
            this.years = unique(year).map(item => {
                return {
                    label: `${item}年`,
                    value: item
                }
            })
            this.years.unshift({
                label: '全部',
                value: ''
            })
            console.log(this.years)
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

.tableHeader {
    display: flex;
}
</style>

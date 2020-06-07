<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>档案目录</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="text item">
        <el-table :data="documents" stripe>
            <el-table-column prop="documentName" label="档案名称">
                <template slot-scope="scope">
                    <router-link :to="{path:scope.row.link}">{{scope.row.documentName}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" style="float: right;">
                <template>
                    <el-button type="primary" icon="el-icon-edit"></el-button>
                    <el-button type="primary" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            documents: [{
                documentName: '职业健康检查结果汇总表',
                link:'HealthExaminationTable'
            }, {
                documentName: '疑似职业病患者表',
                link:'SuspectedTable'
            }, {
                documentName: '防护用品管理列表',
                link:'defend'
            }]
        }
    },
}
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>

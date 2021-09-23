<template>
    <el-dialog
            title="人员更新"
            :visible.sync="visible"
            width="60%"
            append-to-body
            :close-on-click-modal="false">
        <el-form ref="form" :model="form" label-width="140px" :rules="rules">
            <el-form-item label="姓名" class="suggest-content" prop="name">
                <el-input type="textarea" :rows="1" placeholder="姓名" clearable
                          v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="岗位" class="suggest-content" prop="job">
                <el-input type="textarea" :rows="1" placeholder="岗位" clearable
                          v-model="form.job"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" class="suggest-content" prop="idNumber">
                <el-input type="textarea" :rows="1" placeholder="身份证号码" clearable
                          v-model="form.idNumber"></el-input>
            </el-form-item>
            <el-form-item label="社保证明" class="suggest-content" prop="sbFile">
                <div style="margin: auto;height: 100%;display: flex;justify-content: center;align-items: center;">
                    <image-box :file.sync="form.sbFile"></image-box>
                </div>
            </el-form-item>
            <el-form-item label="身份证" class="suggest-content" prop="sfFile">
                <div style="margin: auto;height: 100%;display: flex;justify-content: center;align-items: center;">
                    <image-box :file.sync="form.sfFile"></image-box>
                </div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="updatePeople">保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import ImageBox from "@components/imageBox";

    export default {
        name: "userInfoDialog",
        components: {ImageBox},
        props: {
            unitId: {
                type: Number,
                require: true,
            },
            inForm: {
                type: Object,
                default: () => {
                    return {
                        id: null,
                        name: null,
                        job: null,
                        idNumber: null,
                        sbFile: {
                            url: null,
                            fileId: -1,
                        },
                        sfFile: {
                            url: null,
                            fileId: -1,
                        },
                    }
                },
            },
        },

        watch: {
            visible(val) {
                if (val) {
                    this.form = this.inForm;
                }
            }
        },

        data() {
            return {
                form: {
                    id: null,
                    name: null,
                    job: null,
                    idNumber: null,
                    sbFile: {
                        url: null,
                        fileId: -1,
                    },
                    sfFile: {
                        url: null,
                        fileId: -1,
                    },
                },
                rules: {
                    name: [
                        {required: true, message: '请填写名字'}
                    ],
                    job: [
                        {required: true, message: '请填写岗位'}
                    ],
                    idNumber: [
                        {required: true, message: '请填写身份证'},
                        {pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '你的身份证格式不正确' }
                    ],
                    sbFile: [
                        {
                            type: 'object',
                            required: true,
                            message: '请上传社保证明',
                            fields: {url: {required: true, message: '请上传社保证明'}}
                        }
                    ],
                    sfFile: [
                        {
                            type: 'object',
                            required: true,
                            message: '请上传身份证',
                            fields: {url: {required: true, message: '请上传社保证明'}}
                        }
                    ],
                },
                visible: false,
            }
        },

        mounted() {
        },

        methods: {
            updatePeople() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.form['unitId'] = this.unitId;
                        this.axiosSaveOrUpdate().then(res => {
                            if (res.data.code === 200) {
                                this.visible = false;
                                this.$message.success("操作成功");
                            }
                        });
                    } else return false;
                });
            },

            axiosSaveOrUpdate() {
                return this.axiosP.post("unit-people/saveOrUpdate", this.form);
            },

            showDialog() {
                this.visible = true;
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-dialog__header {
        text-align: center;
    }

    /deep/ .suggest-content .el-form-item__content > .el-row {
        /*设置垂直居中*/
        display: flex;
        align-items: center;
    }

    /*子绝父相,儿子需要绝对值，父亲必须相对，儿子不会，父亲当然要写点注释*/
    .suggest-content {
        position: relative;
        margin: 20px 0;
    }

    /*设置标签垂直居中*/
    /deep/ .suggest-content .el-form-item__label {
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        position: absolute;
    }
</style>

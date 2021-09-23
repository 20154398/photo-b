<template>
    <span>
    <div class="image-box" v-if="file.url">
        <el-image class="image-content" :src="file.url"></el-image>
        <div class="button-bg" @click="remove || removeDefalut()">
            <i class="el-icon-delete"></i>
        </div>
    </div>
    <el-upload
            v-else
            :ref="'upload'"
            action="foo"
            :http-request="httpRequest || uploadDefalut"
            :limit="1"
            :show-file-list="false"
            list-type="picture-card"
            accept="image/png,image/gif,image/jpg,image/jpeg">
        <i slot="default" class="el-icon-plus"></i>
    </el-upload>
    </span>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "image-box",
        props: {
            file: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            httpRequest: Function,
            remove: Function,
        },

        methods: {
            removeDefalut() {
                return this.axiosP.post("files/delete/" + this.file.fileId).then(() => {
                    this.$emit("update:file", {'url': '', 'fileId': -1});
                });
            },

            uploadDefalut(params) {
                const file = params.file;
                let formdata = new FormData();
                formdata.append('file', file);
                this.fileAxios({
                    url: '/files/upload',
                    method: 'post',
                    data: formdata,
                    processData: false,// 告诉axios不要去处理发送的数据(重要参数)
                    contentType: false,   // 告诉axios不要去设置Content-Type请求头
                    headers: {
                        'Authorization': this.token
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success('上传成功！');
                        this.$emit("update:file", res.data.data);
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            }
        },

        computed: {
            ...mapState({
                token: state => state.global.token,
            }),
        }
    }
</script>

<style scoped>
    .image-box {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .image-content {
        user-select: none;
        height: 100%;
        width: 100%;
    }

    .image-box:hover .button-bg {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .button-bg {
        display: none;
    }

    .button-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.4);
    }

</style>

<template>
    <el-dialog
            :title="title"
            :visible.sync="visible"
            width="60%"
            append-to-body>
        <el-image class="image-content" :src="url"></el-image>
    </el-dialog>
</template>

<script>
    export default {
        name: "imageDialog",

        props: {
            url: {
                type: String,
                default: function () {
                    return {};
                }
            },
            title: {
                type: String,
                default: function () {
                    return {};
                }
            },
        },

        data() {
            return {
                visible: false,
            }
        },

        methods: {
            showDialog() {
                this.visible = true;
            }
        }
    }
</script>

<style scoped>

</style>

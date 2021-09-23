<template>
    <div class="h100" style="display:flex">
        <div class="h100" style="width: 240px">
            123
        </div>
        <el-divider class="h100" direction="vertical"></el-divider>
        <div class="h100" style="width: calc(100% - 240px)">
            <div style="height: calc(85% - 60px);width:100%;">
                <el-image draggable="false" style="height: 100%;" v-if="curPhoto !== null" fit="contain"
                          :src="curPhoto.bigPhoto"/>
            </div>
            <el-row align="middle" type="flex"
                    style="height: 15%; margin:10px 0;">
                <el-col class="el-icon-arrow-left" :span="2" @click.native="prePage">
                </el-col>
                <el-col :span="20" class="h100">
                    <el-row class="h100" type="flex" justify="space-between">
                        <el-col class="h100" :span="Math.floor(24 / pageSize)" v-for="(item, index) in list"
                                :key="item.smallPhoto">
                            <el-row class="h100" style="display: flex;justify-content:center;align-items: center">
                                <el-image :class="[curPhotoNum === index ? 'check-border' : 'non-border']" draggable="false" @click="selectPhoto(item, index)" style="height: 100%;max-height: 100%"
                                          fit="contain"
                                          :src="item.smallPhoto"/>
                            </el-row>
                            <el-row>
                                第 {{(curPage - 1) * pageSize + index + 1}} 张 / {{total}} 张
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="el-icon-arrow-right" :span="2" @click.native="nextPage">
                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>
    import ImageBox from "../components/imageBox";

    export default {
        name: "home",
        components: {ImageBox},
        data() {
            return {
                list: [
                    {
                        smallPhoto: null,
                        bigPhoto: null
                    },
                    {
                        smallPhoto: null,
                        bigPhoto: null
                    },
                    {
                        smallPhoto: null,
                        bigPhoto: null
                    },
                    {
                        smallPhoto: null,
                        bigPhoto: null
                    },
                    {
                        smallPhoto: null,
                        bigPhoto: null
                    },
                ],
                curPhoto: {
                    smallPhoto: null,
                    bigPhoto: null
                },
                pageSize: 5,
                curPage: 1,
                total: 8,
                curPhotoNum: 0,
            }
        },

        methods: {
            search() {
                return this.axiosP.get("user-folder/search", {
                    params: {
                        phone: "18002332181"
                    }
                })
            },

            prePage() {
                console.log("prePage")
            },

            nextPage() {
                console.log("nextPage")
            },

            selectPhoto(item, index) {
                this.curPhotoNum = index;
                this.curPhoto = item;
            },
        },

        mounted() {
            this.search().then(res => {
                if (res.data.code === 200) {
                    this.list = res.data.data.slice(0, 8);
                    this.curPhotoNum = 0;
                    this.curPhoto = this.list[0];
                }
            })
        },


    }
</script>

<style scoped>

    .non-border {
        border: 2px solid #ebebeb;
    }

    .check-border {
        border: 2px solid #ff4d51;
    }

    .set-top {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    .p-t-60 {
        padding-top: 60px;
    }
</style>

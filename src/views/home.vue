<template>
    <div class="h100">
        <el-menu v-if="this.isModel" :default-active="activeIndex" class="el-menu-demo set-top" mode="horizontal" @select="handleSelect">
            <el-menu-item index="refinement-photo">
                成 片
            </el-menu-item>
            <el-menu-item index="original-photo">
                原 片
            </el-menu-item>
        </el-menu>
        <div class="h100" :class="this.isModel ? 'p-t-80' : ''" style="display:flex;">
            <div class="h100" style="width: 240px; padding: 0 20px">
                <div v-for="(item, index) in albumList" :key="index"
                     :class="curAlbumNum === index ? 'check-border' : 'non-border'"
                     @click="selectAlbum(item, index)" style="padding: 10px">
                    <el-row>
                        <el-image draggable="false" style="height: 120px;width:160px" v-if="item.url !== null"
                                  fit="cover"
                                  :src="item.url"></el-image>
                    </el-row>
                    <el-row>
                        {{item.name}}
                    </el-row>
                </div>
            </div>
            <!--        <el-divider class="h100" direction="vertical"></el-divider>-->
            <div class="h100" style="width: calc(100% - 240px)">
                <div style="height: calc(85% - 60px);width:100%;">
                    <el-image draggable="false" style="height: 100%;margin-top: 20px" v-if="curPhoto !== undefined && curPhoto !== null"
                              fit="contain"
                              :src="curPhoto.smallPhoto"/>
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
                                    <el-image :class="[curPhotoNum === index ? 'check-border' : 'non-border']"
                                              draggable="false" @click="selectPhoto(item, index)"
                                              style="height: 100px;max-height: 100%;width: 100px;"
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

    </div>

</template>

<script>
    import ImageBox from "../components/imageBox";
    import {mapState} from 'vuex';

    export default {
        name: "home",
        components: {ImageBox},
        data() {
            return {
                list: [],
                curPhoto: {
                    smallPhoto: null,
                    bigPhoto: null
                },
                curAlbum: {
                    url: null,
                    name: null,
                },
                pageSize: 9,
                curPage: 1,
                total: null,
                curPhotoNum: 0,
                curAlbumNum: 0,
                activeIndex: 'refinement-photo',
                albumList: [],
            }
        },

        methods: {
            searchPhoto() {
                this.axiosP.get(this.activeIndex + "/search/" + this.token, {
                    params: {
                        "pageSize": this.pageSize,
                        "currPage": this.curPage,
                        "albumName": this.curAlbum.name
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        this.list = res.data.data.records;
                        this.curPhotoNum = 0;
                        this.curPhoto = this.list[0];
                        this.total = res.data.data.total;
                    }
                });
            },

            searchAlbum() {
                this.axiosP.get(this.activeIndex + "/searchAlbum/" + this.token).then(res => {
                    if (res.data.code === 200) {
                        this.albumList = res.data.data;
                        this.selectAlbum(this.albumList[0], 0);
                    }
                });
            },

            prePage() {
                if (this.curPage > 1) {
                    this.curPage--;
                    this.searchPhoto();
                }
            },

            nextPage() {
                this.curPage++;
                this.searchPhoto();
            },

            selectPhoto(item, index) {
                this.curPhotoNum = index;
                this.curPhoto = item;
            },

            selectAlbum(item, index) {
                this.curAlbumNum = index;
                this.curAlbum = item;
                this.curPage = 1;
                this.searchPhoto();
            },

            handleSelect(index) {
                this.activeIndex = index;
                this.searchAlbum();
            },
        },

        mounted() {
            this.searchAlbum();
        },

        computed: {
            ...mapState({
                token: state => state.global.token,
                isModel: state => state.global.isModel,
            }),
        }
    }
</script>

<style scoped>

    .non-border {
        border: 2px solid #ebebeb;
        margin: 10px 0;
    }

    .check-border {
        border: 2px solid #ff4d51;
        margin: 10px 0;
    }

    .set-top {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
        margin: auto;
    }

    .p-t-80 {
        padding-top: 80px;
    }
</style>

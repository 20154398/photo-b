<template>
    <el-container class="container" :my-expanded="expanded">
        <el-header class="project-header-container">
            <el-container direction="vertical" class="project-header-wrapper">
                <el-row :gutter="10" justify="center" align="middle">
                    <el-col :span="24">
                        <el-button :icon="expanded?'el-icon-s-unfold':'el-icon-s-fold'" @click="expandMenu"
                                   type="primary" circle style="position: absolute; right:10px;top:0;"></el-button>
                    </el-col>
                </el-row>
                <b v-if="!expanded" class="project-header-text">任务清单</b>
                <b v-else class="project-header-text">{{selectProjectName}}</b>
                <el-row v-show="!expanded" justify="center" align="middle">
                    <el-col :span="19">
                        <el-input v-model="input" placeholder="请输入任务名"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-button @click="clean()" icon="el-icon-delete" type="primary" circle></el-button>
                    </el-col>
                </el-row>
            </el-container>
        </el-header>
        <el-divider v-if="!expanded" direction="horizontal"></el-divider>
        <el-footer class="footer" v-show="!expanded">
            <el-tree
                    class="filter-tree"
                    :data="projectList"
                    :props="defaultProps"
                    :load="loadNode"
                    :highlight-current="true"
                    lazy
                    :node-key="'id'"
                    @node-click="nodeClick"
                    :filter-node-method="filterNode"
                    ref="tree">
            </el-tree>
        </el-footer>
    </el-container>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: "projectList",

        props: {
            expanded: {
                type: Boolean,
                default: false
            }
        },

        watch: {
            input: function (data) {
                if (data === '') {
                    this.clean();
                }
                this.$refs.tree.filter(data);
            },
        },

        data() {
            return {
                selectProjectName: '当前无选中',
                input: '',
                projectList: [],
                showList: [],
                rowClass: {
                    backgroundColor: '#ffffff'
                },
                defaultProps: {
                    label: 'name',
                    isLeaf: 'leaf',
                },
                treeDataCache:[],
            };
        },

        methods: {
            expandMenu() {
                this.$emit('expanded');
            },

            nodeClick(data, node, e) {
                if (data.level === 1) {
                    this.$router.push({name: 'project', params: {pid: data.id}});
                }
                if (data.level === 2) {
                    this.$router.push({name: 'task', params: {tid: data.id, pid: node.parent.data.id, deptId: data.deptId}});
                }
                let name = data.name;
                while (node.parent.level !== 0) {
                    name = node.parent.data.name + '↓' + name;
                    node = node.parent;
                }
                this.selectProjectName = "当前选中↧" + name;
            },

            filterNode(value, data) {
                if (!value) return true;
                return data.type === 1 || data.name.indexOf(value) !== -1;
            },

            loadNode(node, resl) {
                debugger
                if (node.level === 0) {
                    return resl(this.projectList);
                } else {
                    this.axiosSearchTask(node.data.id).then(res => {
                        if (res.data.code === 200) {
                            this.treeDataCache = res.data.data;
                            return resl(res.data.data);
                        } else {
                            return resl([]);
                        }
                    }).finally(()=>{
                        let id = this.$route.params.pid;
                        if (this.$route.params.tid) {
                            this.treeDataCache.some(item=>{
                                if (item.id === Number(this.$route.params.tid)) {
                                    this.selectProjectName = this.selectProjectName + '↓' + item.name;
                                    id = this.$route.params.tid;
                                    return true;
                                }
                            })?this.$refs.tree.setCurrentKey(id):this.$router.push('/home');
                        }
                    })
                }
            },

            clean() {
                this.input = '';
                this.$refs.tree.setCurrentKey(null);
                this.selectProjectName = '当前无选中';
                this.$router.push('/home');
            },

            axiosSearchProject() {
                return this.axiosP.get("project/search");
            },

            axiosSearchTask(projectId) {
                return this.axiosP.get("task/search/" + projectId);
            },

            updateProject(){
                this.axiosSearchProject().then(res => {
                    if (res.data.code === 200) {
                        this.projectList = res.data.data;
                    } else {
                        this.$router.push('/home');
                    }
                    let flag = false;
                    for (const project of this.projectList) {
                        if (project.id == this.$route.params.pid){
                            this.selectProjectName = '当前选中↧' + project.name;
                            flag = true;
                        }
                    }
                    if (flag) {
                        this.$nextTick(()=>{
                            this.$refs.tree.store.setDefaultExpandedKeys([this.$route.params.pid]);
                        })
                    } else {
                        this.$router.push('/home');
                    }
                });
            },

            updateTask() {

                this.axiosSearchTask(this.$route.params.pid).then(res2 => {
                    if (res2.data.code === 200) {
                        this.$refs.tree.updateKeyChildren(this.$route.params.pid, res2.data.data);
                        let id = this.$route.params.pid;
                        if (this.$route.params.tid) {
                            for (const task of res2.data.data) {
                                if(task.id == this.$route.params.tid){
                                    this.selectProjectName = this.selectProjectName + '↓' + task.name;
                                    id = this.$route.params.tid;
                                }
                            }
                            if (id === this.$route.params.pid) this.$router.push('/home');
                        }
                        this.$refs.tree.setCurrentKey(id);
                    } else {
                        this.$router.push('/home');
                    }
                });
            },
        },

        mounted() {
            this.eventBus.$on('updateProjectListKeyChildren', data => {
                this.updateTask();
            });
            this.updateProject();
        },

        destroyed() {
            this.eventBus.$off('updateProjectListKeyChildren');
        },

        computed: {
            ...mapState({
                selectedProject: state => state.global.selectedProject,
            }),
        }
    };
</script>

<style scoped lang="scss">
    .el-header {
        background-color: #ffffff;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .el-main {
        background-color: #ffffff;
    }

    .container {
        height: 100%;
    }

    .footer {
        height: calc(100% - 250px) !important;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .footer::-webkit-scrollbar {
        display: none;
    }

    .footer .is-active {
        background-color: rgba(64, 158, 255, 0.3);
    }

    .footer .el-menu-item {
        //边框
        border: solid 1px #e6e6e6;
        //间隔
        margin: 0 0 20px 0;
        //圆角
        border-radius: 20px;
        line-height: 50px;
    }

    .footer .el-menu {
        border-right: none;
    }

    .project-header-container {
        height: 140px !important;
    }

    .project-header-text {
        font-size: 24px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .el-row {
        margin: 10px 2px !important;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    @keyframes colorGradient {
        0% {
            opacity: 0.1;
            color: #000000;
        }
        100% {
            color: #ffffff;
            background-color: #409eff;
        }
    }

    /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
        animation: colorGradient 2s;
        animation-iteration-count: 2;
        animation-fill-mode: both;
    }

    .container[my-expanded=true] {
        width: 60px;
        overflow: hidden;

        .el-header {
            align-items: flex-start;
        }

        .project-header-container {
            padding: 0;
            height: 100% !important;
        }

        .project-header-wrapper {
            height: 100%;
        }

        .project-header-text {
            font-size: 28px;
            height: calc(100% - 40px);
            line-height: 32px;
            display: block;
            width: 30px;
            margin: 40px auto;
            letter-spacing: 2px;
        }

        .el-row {
            margin: 10px 2px !important;
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }

</style>

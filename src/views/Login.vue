<template>
    <div class="loginGroup" v-loading="loading">
        <div class="loginBox" v-on:keyup.enter="onSubmit('loginform')">
            <!-- <div class="loginTitle">login  &nbsp;<b>wise DMP</b></div> -->
            <div class="loginTitle">
                <b>小太阳的小网站</b>
            </div>
            <el-form ref="loginform" :model="loginform" label-width="0px">
                <div class="m-b-30">
                    <el-form-item prop="accountInput">
                        <el-input v-model="loginform.accountInput" maxlength="100" placeholder="请输入账号" clearable
                                  prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                </div>
<!--                <div class="m-b-50">-->
<!--                    <el-form-item prop="passwordInput">-->
<!--                        <el-input placeholder="请输入密码" maxlength="100" v-model="loginform.passwordInput" show-password-->
<!--                                  prefix-icon="el-icon-lock"></el-input>-->
<!--                    </el-form-item>-->
<!--                </div>-->
                <el-button type="primary" @click="onSubmit('loginform')">登 录</el-button>
            </el-form>
            <p class="copyright"></p>
        </div>
        <canvas id="canvas" color="255, 255, 255" opacity="0.8" count="300"></canvas>
    </div>
</template>

<script>
    export default {
        // 应用的组件
        components: {},

        // 初始化数据
        data() {
            return {
                loginform: {
                    accountInput: '',
                    passwordInput: ''
                },
                rules: {
                    accountInput: [
                        {required: true, message: '请输入账号'}
                    ],
                    passwordInput: [
                        {required: true, message: '请输入密码'}
                    ]
                },
                loading: false
            }
        },

        // 数据格式化
        computed: {},

        // 方法集合
        methods: {
            // 登录数据请求
            axiosLogin() {
                return this.userAxios.post('user/login', {
                    phone: this.loginform.accountInput,
                    password: this.commonJ.Encrypt("123")
                })
            },

            // 提交登录
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 请求登录
                        this.axiosLogin().then((res) => {
                            if (res.data.code === 200) {
                                this.$store.commit('setToken', res.data.data);
                                this.loading = true;
                                // 储存用户信息到local
                                let userDate = JSON.stringify({
                                    token: res.data.data
                                });
                                this.commonJ.setLocalStorage('wisewalkId', userDate);
                                // 跳转
                                if (this.loginform.accountInput === 'admin'){
                                    this.$router.push('/admin');
                                }else {
                                    this.$router.push('/home');
                                }
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false
                    }
                })
            }
        },

        // 生命周期-准备创建dom之前
        beforeCreate() {

        },

        // 生命周期-准备创建dom
        created() {

        },

        // 生命周期-dom创建之后
        mounted() {
            // this.animationBG();
        },

        // 生命周期-销毁后
        beforeDestroy() {

        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.historyPath = from.path
            })
        }
    }
</script>

<style lang="scss">
    .loginGroup {
        background: url('~@/assets/images/bg-login.jpg') no-repeat 50% 68%;
        background-size: cover;
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
    }

    .loginBox {
        width: 400px;
        height: 400px;
        position: fixed;
        left: 50%;
        top: 50%;
        margin: -200px 0 0 -200px;
        background: rgb(245, 245, 245); /* Old browsers */
        /* IE9 SVG, needs conditional override of 'filter' to 'none' */
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2Y1ZjVmNSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjE5JSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ijc3JSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmNWY1ZjUiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
        background: -moz-linear-gradient(top, rgba(245, 245, 245, 1) 0%, rgba(255, 255, 255, 1) 19%, rgba(255, 255, 255, 1) 77%, rgba(245, 245, 245, 1) 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(245, 245, 245, 1)), color-stop(19%, rgba(255, 255, 255, 1)), color-stop(77%, rgba(255, 255, 255, 1)), color-stop(100%, rgba(245, 245, 245, 1))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top, rgba(245, 245, 245, 1) 0%, rgba(255, 255, 255, 1) 19%, rgba(255, 255, 255, 1) 77%, rgba(245, 245, 245, 1) 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top, rgba(245, 245, 245, 1) 0%, rgba(255, 255, 255, 1) 19%, rgba(255, 255, 255, 1) 77%, rgba(245, 245, 245, 1) 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top, rgba(245, 245, 245, 1) 0%, rgba(255, 255, 255, 1) 19%, rgba(255, 255, 255, 1) 77%, rgba(245, 245, 245, 1) 100%); /* IE10+ */
        background: linear-gradient(to bottom, rgba(245, 245, 245, 1) 0%, rgba(255, 255, 255, 1) 19%, rgba(255, 255, 255, 1) 77%, rgba(245, 245, 245, 1) 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f5f5f5', endColorstr='#f5f5f5', GradientType=0); /* IE6-8 */
        color: #000;
        overflow: hidden;
        -webkit-box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.15);
        box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.15);

        form {
            padding: 0 26px;

            & > button {
                width: 100%;
                font-size: 16px;
            }

            .el-input__inner {
                color: #666666;
                background-color: rgb(232, 240, 254);
                border-color: #DCDFE6;
            }

            // .el-button--primary { background-color: #103254;border-color: #094d94; }
            // .el-button--primary:focus, .el-button--primary:hover {background-color: #1a446e;}
            .el-input__prefix, .el-input__suffix {
                color: #000;
            }
        }
    }

    .loginTitle {
        text-transform: uppercase;
        font-family: "Open Sans", Arial, sans-serif;
        color: #000;
        font-size: 33px;
        line-height: 66px;
        margin-bottom: 10px;
        text-align: center;
        padding-top: 34px;
        position: relative;
        font-weight: lighter;
        height: 84px;

        b {
            color: #000;
        }

        img {
            width: 170px;
        }

        p {
            position: absolute;
            font-size: 12px;
            color: #92c427;
            left: 50%;
            top: 4px;
            margin-left: 94px;
        }
    }

    #canvas {
        width: 100%;
    }

    .copyright {
        position: absolute;
        bottom: 10px;
        text-align: center;
        width: 100%;
        font-size: 12px;
        color: #515151;
    }
</style>
